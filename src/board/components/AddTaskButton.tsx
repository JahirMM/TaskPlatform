import PlusIcon from "@/icons/PlusIcon";

export default function AddTaskButton() {
  return (
    <button
      type="button"
      className="flex items-center gap-2 px-3 py-2 transition-colors duration-300 rounded-lg hover:bg-action hover:font-semibold"
    >
      <PlusIcon className="text-gray-300 size-3" />
      <span className="text-sm text-gray-300">Añadir tarea</span>
    </button>
  );
}
