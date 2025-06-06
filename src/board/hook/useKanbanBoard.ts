import { DragEndEvent, DragOverEvent, DragStartEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { useCallback, useEffect, useState } from "react";

import { ColumnInterface } from "@/board/interfaces/columnInterface";
import { TaskInterface } from "@/board/interfaces/taskInterface";

import { reorderTasksSafelyService } from "@/board/service/reorderTasksSafelyService";

import { useReorderColumns } from "@/board/hook/useReorderColumns";
import { useGetTasksByProjectId } from "@/board/hook/useGetTasks";
import { useUpdateTaskColumn } from "@/board/hook/useUpdateTaskColumn";
import { useGetColumns } from "@/board/hook/useGetColumns";

export function useKanbanBoard(projectId: string) {
  const { data: columnsData, isError, isLoading } = useGetColumns(projectId);
  const { data: tasksData } = useGetTasksByProjectId(projectId);
  const mutationUpdateTasks = useUpdateTaskColumn();

  const reorderColumns = useReorderColumns();

  const [columns, setColumns] = useState<ColumnInterface[]>([]);
  const [tasks, setTasks] = useState<TaskInterface[]>([]);
  const [activeColumn, setActiveColumn] = useState<ColumnInterface | null>(
    null
  );
  const [activeTask, setActiveTask] = useState<TaskInterface | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => setColumns(columnsData || []), [columnsData]);
  useEffect(() => setTasks(tasksData || []), [tasksData]);
  useEffect(() => setIsClient(true), []);

  const onDragStart = useCallback((event: DragStartEvent) => {
    const type = event.active.data.current?.type;

    if (type === "Column") {
      setActiveColumn(event.active.data.current?.column);
      return;
    }

    if (type === "Task") {
      setActiveTask(event.active.data.current?.task);
      return;
    }
  }, []);

  const onDragEnd = useCallback(
    async (event: DragEndEvent) => {
      setActiveColumn(null);
      setActiveTask(null);
      const { active, over } = event;

      if (!over) return;

      const activeId = active.id;
      const overId = over.id;

      if (activeId === overId) return;

      setColumns((prevColumns) => {
        const activeIndex = prevColumns.findIndex((col) => col.id === activeId);
        const overIndex = prevColumns.findIndex((col) => col.id === overId);

        const newColumns = arrayMove(prevColumns, activeIndex, overIndex);

        reorderColumns(newColumns);

        return newColumns;
      });
    },
    [reorderColumns, setActiveColumn, setActiveTask]
  );

  const onDragOver = useCallback(
    async (event: DragOverEvent) => {
      const { active, over } = event;

      if (!active || !over) return;

      const activeId = active.id;
      const overId = over.id;

      if (activeId === overId) return;

      const isActiveATask = active.data.current?.type === "Task";
      const isOverATask = over.data.current?.type === "Task";
      const isOverAColumn = over.data.current?.type === "Column";

      if (!isActiveATask) return;

      const activeTask = tasks.find((t) => t.id === activeId);
      if (!activeTask) return;

      // 🔷 Caso 1: Mover sobre otra tarea
      if (isOverATask) {
        const overTask = tasks.find((t) => t.id === overId);
        if (!overTask) return;

        // Solo si se mueve de posición o de columna
        if (
          activeTask.column_id !== overTask.column_id ||
          tasks.findIndex((t) => t.id === activeId) !==
            tasks.findIndex((t) => t.id === overId)
        ) {
          const newTasks = [...tasks];

          // Filtrar tareas en la columna destino
          const tasksInColumn = newTasks.filter(
            (t) => t.column_id === overTask.column_id
          );

          const activeIndex = newTasks.findIndex((t) => t.id === activeId);
          const overIndexInAll = newTasks.findIndex((t) => t.id === overId);

          // Eliminamos tarea de su posición actual
          newTasks.splice(activeIndex, 1);

          // Creamos versión actualizada con nueva columna si es necesario
          const updatedTask = {
            ...activeTask,
            column_id: overTask.column_id,
          };

          // Recalculamos posición de inserción
          const overIndex = tasksInColumn.findIndex((t) => t.id === overId);
          const destinationIndex =
            activeTask.column_id === overTask.column_id &&
            activeIndex < overIndexInAll
              ? overIndex + 1
              : overIndex;

          // Insertamos la tarea en su nueva posición
          const newTasksInColumn = [
            ...tasksInColumn.filter((t) => t.id !== activeId),
          ];
          newTasksInColumn.splice(destinationIndex, 0, updatedTask);

          // Reconstruimos la lista total de tareas
          const newAllTasks = newTasks.filter(
            (t) => t.column_id !== overTask.column_id
          );
          const finalTasks = [...newAllTasks, ...newTasksInColumn];

          setTasks(finalTasks);

          try {
            await mutationUpdateTasks.mutateAsync({
              taskId: String(activeId),
              columnId: overTask.column_id,
              position: 999,
            });
          } catch (error) {
            console.error("Error actualizando tarea en onDragOver:", error);
          } finally {
            const orderedIds = finalTasks
              .filter((t) => t.column_id === overTask.column_id)
              .map((t) => t.id);

            reorderTasksSafelyService(orderedIds, overTask.column_id);
          }
        }
      }

      // 🔷 Caso 2: Mover sobre una columna vacía
      if (isOverAColumn) {
        const newColumnId = String(overId);

        if (activeTask.column_id !== newColumnId) {
          const updatedTask = { ...activeTask, column_id: newColumnId };
          const newTasks = tasks
            .filter((t) => t.id !== activeId)
            .concat(updatedTask);

          setTasks(newTasks);

          try {
            await mutationUpdateTasks.mutateAsync({
              taskId: String(activeId),
              columnId: newColumnId,
              position: 999,
            });
          } catch (error) {
            console.error("Error al mover tarea a columna vacía:", error);
          } finally {
            const tasksInColumn = newTasks
              .filter((t) => t.column_id === newColumnId)
              .map((t) => t.id);

            reorderTasksSafelyService(tasksInColumn, newColumnId);
          }
        }
      }
    },
    [tasks, setTasks, mutationUpdateTasks]
  );

  return {
    columns,
    setColumns,
    tasks,
    setTasks,
    activeColumn,
    activeTask,
    isClient,
    isError,
    isLoading,
    onDragStart,
    onDragEnd,
    onDragOver,
  };
}
