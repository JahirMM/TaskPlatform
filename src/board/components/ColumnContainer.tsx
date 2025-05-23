import { useMemo, useState } from "react";

import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { ColumnInterface } from "@/board/interfaces/columnInterface";
import { TaskInterface } from "@/board/interfaces/taskInterface";

import AddTaskButton from "@/board/components/AddTaskButton";
import TaskCard from "@/board/components/TaskCard";

import TrashIcon from "@/icons/TrashIcon";
import { useUpdateColumn } from "../hook/useUpdateColumn";

interface ColumnContainerProps {
  projectId: string;
  column: ColumnInterface;
  createTask: (id: string | number) => void;
  tasks: TaskInterface[];
}
function ColumnContainer({
  projectId,
  column,
  createTask,
  tasks,
}: ColumnContainerProps) {
  const mutationUpdateColumn = useUpdateColumn();

  const [inputValue, setInputValue] = useState(column.name);
  const [editMode, setEditMode] = useState(false);

  const tasksIds = useMemo(() => {
    return tasks.map((task) => task.id);
  }, [tasks]);

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
    });
  };

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
          <h2 className="text-sm text-white line-clamp-1">
            {column.name} -- {column.position}
          </h2>
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
        <button
          type="button"
          onClick={() => console.log("HOLA")}
          className="p-2 rounded-md cursor-pointer hover:bg-surface"
        >
          <TrashIcon className="text-action size-4 hover:text-action-hover" />
        </button>
      </header>
      <div className="flex flex-col gap-4 p-2 overflow-x-hidden overflow-y-auto grow">
        <SortableContext items={tasksIds}>
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </SortableContext>
      </div>
      <AddTaskButton createTask={createTask} columnId={column.id} />
    </div>
  );
}

export default ColumnContainer;
