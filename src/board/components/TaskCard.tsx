import { useCallback, useState } from "react";

import TaskDetailsForm from "@/board/components/TaskDetailsForm";
import Modal from "@/common/components/Modal";

import { TaskInterface } from "@/board/interfaces/taskInterface";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import TrashIcon from "@/icons/TrashIcon";

type TaskCardProps = {
  task: TaskInterface;
  columnId: string;
  deleteTask: (taskId: string, columnId: string, e: React.MouseEvent<HTMLButtonElement>) => void;
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
        <div className="flex-1 text-xs line-clamp-3">{task.title}</div>
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
