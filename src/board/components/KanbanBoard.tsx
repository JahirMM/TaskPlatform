import { useCallback, useMemo, useState } from "react";
import { createPortal } from "react-dom";

import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";

import ColumnContainer from "@/board/components/ColumnContainer";
import AddColumnButton from "@/board/components/AddColumnButton";
import KanbanOverlay from "@/board/components/KanbanOverlay";

import { CreateTaskRequestInterface } from "@/board/interfaces/CreateTaskRequestInterface";
import { TaskInterface } from "@/board/interfaces/taskInterface";

import { useKanbanBoard } from "@/board/hook/useKanbanBoard";
import { useCreateTask } from "@/board/hook/useCreateTask";
import { useGetUser } from "@/common/hooks/useGetUser";

import PlusIcon from "@/icons/PlusIcon";

function KanbanBoard({ projectId }: { projectId: string }) {
  const {
    columns,
    setColumns,
    tasks,
    setTasks,
    activeColumn,
    activeTask,
    isClient,
    isLoading,
    isError,
    onDragStart,
    onDragOver,
    onDragEnd,
  } = useKanbanBoard(projectId);

  const { data: userData } = useGetUser();
  const mutationCreateTask = useCreateTask();

  const [addColumn, setAddColumn] = useState(false);

  const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3,
      },
    })
  );

  const createTask = useCallback(
    async (columnId: string, title: string) => {
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
        title: title,
        position: maxPosition + 1,
      };

      const newTask: TaskInterface[] = await mutationCreateTask.mutateAsync(
        request
      );

      setTasks([...tasks, newTask[0]]);
    },
    [tasks, mutationCreateTask, setTasks]
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
                  projectId={projectId}
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
              <KanbanOverlay
                activeColumn={activeColumn}
                activeTask={activeTask}
                projectId={projectId}
                tasks={tasks}
                createTask={createTask}
              />
            </DragOverlay>,
            document.body
          )}
      </DndContext>
    </div>
  );
}

export default KanbanBoard;
