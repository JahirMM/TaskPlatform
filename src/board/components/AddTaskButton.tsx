import PlusIcon from "@/icons/PlusIcon";

interface AddTaskButtonProps {
  createTask: (id: string) => void;
  columnId: string;
}

export default function AddTaskButton({
  createTask,
  columnId,
}: AddTaskButtonProps) {
  return (
    <button
      type="button"
      onClick={() => createTask(columnId)}
      className="flex items-center gap-3 p-3 transition-colors duration-500 border-4 rounded-lg cursor-pointer border-bg-column hover:bg-surface group"
    >
      <PlusIcon className="font-bold text-action size-3 group-hover:text-action-hover" />
      <span className="text-sm font-bold text-action group-hover:text-action-hover">
        crear tarea
      </span>
    </button>
  );
}
