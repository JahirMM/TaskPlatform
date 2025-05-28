import { useState } from "react";

import { TaskInterface } from "@/board/interfaces/taskInterface";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import TrashIcon from "@/icons/TrashIcon";

type TaskCardProps = {
  task: TaskInterface;
};

export default function TaskCard({ task }: TaskCardProps) {
  const [mouseIsOver, setMouseIsOver] = useState(false);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      type: "Task",
      task,
    },
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="bg-bg-primary opacity-30 border-2 border-action p-2.5 h-[100px] min-h-[100px] rounded-xl"
      ></div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onMouseEnter={() => {
        setMouseIsOver(true);
      }}
      onMouseLeave={() => {
        setMouseIsOver(false);
      }}
      className="flex gap-2 text-white bg-bg-primary p-2.5 h-[100px] min-h-[100px] rounded-xl cursor-grab hover:ring-2 hover:ring-inset hover:ring-gray-700 hover:bg-bg-secondary"
    >
      <div className="flex-1 text-xs line-clamp-3">{task.title}</div>
      {mouseIsOver && (
        <div className="flex items-center">
          <button
            type="button"
            onClick={() => console.log("Tarea borrada")}
            className="p-2 text-white rounded-md cursor-pointer bg-surface"
          >
            <TrashIcon className="text-action size-4 hover:text-action-hover" />
          </button>
        </div>
      )}
    </div>
  );
}
