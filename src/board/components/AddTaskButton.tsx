import PlusIcon from "@/icons/PlusIcon";
import { useState } from "react";

interface AddTaskButtonProps {
  createTask: (id: string) => Promise<void>;
  columnId: string;
}

export default function AddTaskButton({
  createTask,
  columnId,
}: AddTaskButtonProps) {
  const [isLoadingCreateTask, setIsLoadingCreateTask] = useState(false);

  const handleClick = async () => {
    if (isLoadingCreateTask) return;

    setIsLoadingCreateTask(true);
    try {
      await createTask(columnId);
    } catch (error) {
      console.error("Error al crear tarea:", error);
    } finally {
      setIsLoadingCreateTask(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`flex items-center gap-3 p-3 transition-colors duration-500 border-4 rounded-lg cursor-pointer border-bg-column hover:bg-surface group ${
        isLoadingCreateTask ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      <PlusIcon className="font-bold text-action size-3 group-hover:text-action-hover" />
      <span className="text-sm font-bold text-action group-hover:text-action-hover">
        crear tarea
      </span>
    </button>
  );
}
