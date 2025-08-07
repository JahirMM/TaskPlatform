import { useCallback, useState } from "react";

import TaskDetailsForm from "@/board/components/TaskDetailsForm";
import Modal from "@/common/components/Modal";

import { TaskInterface } from "@/board/interfaces/taskInterface";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import TrashIcon from "@/icons/TrashIcon";

const priorityMap: Record<string, string> = {
  high: "Alto",
  medium: "Medio",
  low: "Baja",
};

type TaskCardProps = {
  task: TaskInterface;
  columnId: string;
  deleteTask: (
    taskId: string,
    columnId: string,
    e: React.MouseEvent<HTMLButtonElement>
  ) => void;
  onTaskUpdated: (updatedTask: TaskInterface) => void;
};

export default function TaskCard({
  task,
  columnId,
  deleteTask,
  onTaskUpdated,
}: TaskCardProps) {
  const [mouseIsOver, setMouseIsOver] = useState(false);
  const [showProductDetailsForm, setShowProductDetailsForm] = useState(false);

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

  const handleCloseModal = useCallback(() => {
    setShowProductDetailsForm(false);
  }, []);

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
    <>
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
        onClick={() => setShowProductDetailsForm(!showProductDetailsForm)}
        className="flex gap-2 text-white bg-bg-primary p-2.5 h-[100px] min-h-[100px] rounded-xl cursor-grab hover:ring-2 hover:ring-inset hover:ring-gray-700 hover:bg-bg-secondary"
      >
        <div className="flex flex-col items-start justify-between flex-1 gap-2 line-clamp-3">
          <p className="text-xs line-clamp-2">{task.title}</p>
          {task.priority && (
            <span
              className={`px-1.5 py-1 text-xs rounded-lg border ${
                task.priority === "high"
                  ? "bg-red-500/10 text-red-400 border-red-400"
                  : task.priority === "medium"
                  ? "bg-yellow-500/10 text-yellow-400 border-yellow-400"
                  : "bg-green-500/10 text-green-400 border-green-400"
              }`}
            >
              {priorityMap[task.priority]}
            </span>
          )}
        </div>
        {mouseIsOver && (
          <div className="flex items-center">
            <button
              type="button"
              onClick={(e) => deleteTask(task.id, columnId, e)}
              className="p-2 text-white rounded-md cursor-pointer bg-surface"
            >
              <TrashIcon className="text-action size-4 hover:text-action-hover" />
            </button>
          </div>
        )}
      </div>
      {showProductDetailsForm && (
        <Modal title="" onClose={handleCloseModal}>
          <TaskDetailsForm taskId={task.id} onTaskUpdated={onTaskUpdated} />
        </Modal>
      )}
    </>
  );
}
