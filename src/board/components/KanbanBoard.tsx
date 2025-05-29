import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";

import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";

import { CreateTaskRequestInterface } from "@/board/interfaces/CreateTaskRequestInterface";
import { ColumnInterface } from "@/board/interfaces/columnInterface";
import { TaskInterface } from "@/board/interfaces/taskInterface";

import ColumnContainer from "@/board/components/ColumnContainer";
import AddColumnButton from "@/board/components/AddColumnButton";

import { reorderTasksSafelyService } from "@/board/service/reorderTasksSafelyService";

import { useReorderColumns } from "@/board/hook/useReorderColumns";
import { useGetTasksByProjectId } from "@/board/hook/useGetTasks";
import { useUpdateTaskColumn } from "@/board/hook/useUpdateTask";
import { useGetColumns } from "@/board/hook/useGetColumns";
import { useCreateTask } from "@/board/hook/useCreateTask";
import { useGetUser } from "@/common/hooks/useGetUser";

import PlusIcon from "@/icons/PlusIcon";

function KanbanBoard({ projectId }: { projectId: string }) {
  const { data: columnsData, isError, isLoading } = useGetColumns(projectId);
  const { data: tasksData } = useGetTasksByProjectId(projectId);
  const { data: userData } = useGetUser();

  const mutationUpdateTasks = useUpdateTaskColumn();
  const mutationCreateTask = useCreateTask();

  const reorderColumns = useReorderColumns();

  const [columns, setColumns] = useState<ColumnInterface[]>([]);
  const [activeColumn, setActiveColumn] = useState<ColumnInterface | null>(
    null
  );
  const [activeTask, setActiveTask] = useState<TaskInterface | null>(null);
  const [tasks, setTasks] = useState<TaskInterface[]>([]);
  const [addColumn, setAddColumn] = useState(false);
  const [isClient, setIsClient] = useState(false);

  const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);

  useEffect(() => {
    setColumns(columnsData || []);
  }, [columnsData]);

  useEffect(() => {
    const fetchAllTasks = async () => {
      if (!columnsData) return;

      setTasks(tasksData || []);
    };

    fetchAllTasks();
  }, [tasksData]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const onDragStart = (event: DragStartEvent) => {
    const type = event.active.data.current?.type;

    if (type === "Column") {
      setActiveColumn(event.active.data.current?.column);
      return;
    }

    if (type === "Task") {
      setActiveTask(event.active.data.current?.task);
      return;
    }
  };

  const onDragEnd = async (event: DragEndEvent) => {
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
  };

  const onDragOver = async (event: DragOverEvent) => {
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
  };

  const createTask = useCallback(
    async (columnId: string) => {
      const maxPosition = Math.max(
        ...tasks
          .filter((ta) => ta.column_id === columnId)
          .map((t) => t.position),
        0
      );

      if (!userData) return;

      const request: CreateTaskRequestInterface = {
        column_id: columnId,
        user_id: userData.id,
        title: "tarea P -> " + (maxPosition + 1),
        position: maxPosition + 1,
      };

      const newTask: TaskInterface[] = await mutationCreateTask.mutateAsync(
        request
      );

      setTasks([...tasks, newTask[0]]);
    },
    [tasks, mutationCreateTask, setTasks]
  );

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3,
      },
    })
  );

  if (!projectId) {
    return <div>Proyecto no encontrado</div>;
  }

  if (isError) {
    return <div>Error al obtener las columnas</div>;
  }

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="m-auto flex items-center h-[calc(100vh-64px)] w-full overflow-x-auto overflow-y-hidden px-[40px]">
      <DndContext
        sensors={sensors}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}
      >
        <div className="flex gap-4 m-auto">
          <div className="flex gap-4">
            <SortableContext items={columnsId}>
              {columns.map((column) => (
                <ColumnContainer
                  key={column.id}
                  column={column}
                  createTask={createTask}
                  tasks={tasks.filter((t) => t.column_id === column.id)}
                />
              ))}
            </SortableContext>
          </div>
          {addColumn && (
            <AddColumnButton
              projectId={projectId}
              columns={columns}
              setColumns={setColumns}
              setAddColumn={setAddColumn}
            />
          )}
          {!addColumn && (
            <button
              type="button"
              onClick={() => setAddColumn(true)}
              className="flex gap-2 items-center justify-center h-[40px] w-[200px] min-w-[200px] p-2 cursor-pointer rounded-lg bg-action hover:bg-action-hover"
            >
              <PlusIcon className="text-black size-4" />
              <span className="text-sm font-medium">Agregar Columna</span>
            </button>
          )}
        </div>
        {isClient &&
          createPortal(
            <DragOverlay>
              {activeColumn && (
                <ColumnContainer
                  column={activeColumn}
                  createTask={createTask}
                  tasks={tasks.filter(
                    (task) => task.column_id === activeColumn.id
                  )}
                />
              )}
              {activeTask && (
                <div className="text-white text-sm bg-bg-primary p-2.5 h-[100px] min-h-[100px] flex text-left rounded-xl ring-2 ring-gray-700">
                  {activeTask.title}
                </div>
              )}
            </DragOverlay>,
            document.body
          )}
      </DndContext>
    </div>
  );
}

export default KanbanBoard;
