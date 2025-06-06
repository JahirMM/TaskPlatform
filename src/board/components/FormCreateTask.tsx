import { useRef, useState } from "react";

interface FormCreateTaskProps {
  createTask: (id: string, title: string) => Promise<void>;
  columnId: string;
  setShowCreateTaskForm: React.Dispatch<React.SetStateAction<boolean>>;
}

function FormCreateTask({
  createTask,
  columnId,
  setShowCreateTaskForm,
}: FormCreateTaskProps) {
  const titleRef = useRef<HTMLInputElement>(null);
  const [isLoadingCreateTask, setIsLoadingCreateTask] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmedTitle = titleRef.current?.value.trim() ?? "";

    if (isLoadingCreateTask || trimmedTitle.length === 0) return;

    setIsLoadingCreateTask(true);
    try {
      await createTask(columnId, trimmedTitle);
      if (titleRef.current) titleRef.current.value = "";
    } catch (error) {
      console.error("Error al crear tarea:", error);
    } finally {
      setIsLoadingCreateTask(false);
      setShowCreateTaskForm(false);
    }
  };

  return (
    <form
      className="flex flex-col"
      onSubmit={handleSubmit}
      role="form"
      aria-label="Formulario para crear una nueva tarea"
    >
      <label htmlFor="taskTitle" className="mb-1 text-sm text-white">
        Título
      </label>
      <input
        id="taskTitle"
        name="title"
        type="text"
        ref={titleRef}
        autoComplete="off"
        placeholder="Introduce un título"
        maxLength={100}
        className="px-3 py-2 text-sm text-white border rounded-lg border-action focus:outline-none"
        aria-label="Título de la tarea"
        aria-describedby="taskTitleDescription"
      />

      <button
        type="submit"
        title="Crear tarea"
        className="cursor-pointer mt-10 text-white bg-action font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none hover:bg-action-hover focus:ring-4 focus:ring-action/80 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoadingCreateTask ? "Creando..." : "Crear"}
      </button>
    </form>
  );
}

export default FormCreateTask;
