import { memo, useCallback, useMemo, useState } from "react";

import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { reorderTasksSafelyService } from "@/board/service/reorderTasksSafelyService";

import { ColumnInterface } from "@/board/interfaces/columnInterface";
import { TaskInterface } from "@/board/interfaces/taskInterface";

import DeleteColumnButton from "@/board/components/DeleteColumnButton";
import AddTaskButton from "@/board/components/AddTaskButton";
import TaskCard from "@/board/components/TaskCard";

import { useUpdateColumn } from "@/board/hook/useUpdateColumn";
import { useDeleteTask } from "@/board/hook/useDeleteTask";

interface ColumnContainerProps {
  column: ColumnInterface;
  createTask: (id: string, title: string) => Promise<void>;
  tasks: TaskInterface[];
  projectId: string;
  onTaskUpdated: (updatedTask: TaskInterface) => void;
}

function ColumnContainer({
  column,
  createTask,
  tasks,
  projectId,
  onTaskUpdated,
}: ColumnContainerProps) {
  const mutationUpdateColumn = useUpdateColumn();

  const mutationDeleteTask = useDeleteTask();

  const [inputValue, setInputValue] = useState(column.name);
  const [editMode, setEditMode] = useState(false);

  const tasksIds = useMemo(() => (tasks ?? []).map((task) => task.id), [tasks]);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: {
      type: "Column",
      column,
    },
    disabled: editMode,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  const updateColumnName = (columnId: string, name: string) => {
    mutationUpdateColumn.mutate({
      columnId: columnId,
      updates: { name: name },
      projectId: projectId,
    });
  };

  const deleteTask = useCallback(
    async (taskId: string, columnId: string, e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      await mutationDeleteTask.mutateAsync({ taskId, projectId });
      const updatedTasks = tasks.filter(
        (t) => t.id !== taskId && t.column_id === columnId
      );
      const orderedIds = updatedTasks.map((t) => t.id);
      reorderTasksSafelyService(orderedIds, columnId);
    },
    [mutationDeleteTask, projectId, tasks]
  );

  const handleBlurOrEnter = () => {
    if (inputValue !== column.name) {
      updateColumnName(column.id, inputValue);
    }
    setEditMode(false);
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="bg-bg-column opacity-40 border-2 border-action w-[350px] h-[500px] max-h-[500px] rounded-md flex flex-col"
      ></div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-bg-column w-[350px] h-[500px] max-h-[500px] rounded-xl flex flex-col"
    >
      <header
        {...attributes}
        {...listeners}
        onClick={() => {
          setEditMode(true);
        }}
        className="bg-bg-primary flex items-center justify-between text-md h-[60px] cursor-grab rounded-lg rounded-b-none p-3 font-bold border-bg-column border-4"
      >
        {!editMode && (
          <h2 className="text-sm text-white line-clamp-1">{column.name}</h2>
        )}
        {editMode && (
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            autoFocus
            onBlur={handleBlurOrEnter}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleBlurOrEnter();
              }
            }}
            className="px-2 text-sm text-white bg-black border rounded outline-none focus:border-rose-500"
          />
        )}
        <DeleteColumnButton columnId={column.id} projectId={projectId} />
      </header>
      <div className="flex flex-col gap-4 p-2 overflow-x-hidden overflow-y-auto grow">
        <SortableContext items={tasksIds}>
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              columnId={column.id}
              deleteTask={deleteTask}
              onTaskUpdated={onTaskUpdated}
            />
          ))}
        </SortableContext>
      </div>
      <AddTaskButton createTask={createTask} columnId={column.id} />
    </div>
  );
}

export default memo(ColumnContainer);
