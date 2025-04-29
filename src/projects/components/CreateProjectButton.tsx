import { createProject } from "@/projects/services/createProject";
import { useState } from "react";
import { toast } from "sonner";

interface CreateProjectButtonProps {
  projectName: string;
  projectDescription: string;
  fetchProjects: () => Promise<void>;
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
}

function CreateProjectButton({
  projectName,
  projectDescription,
  fetchProjects,
  setShowForm,
}: CreateProjectButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const addProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!projectName || !projectDescription) {
      toast.error("Por favor llenar todos los campos");
      return;
    }

    await createProject({ name: projectName, description: projectDescription });
    await fetchProjects();

    setShowForm(false);
    setIsLoading(false);
  };

  return (
    <button
      type="button"
      onClick={addProject}
      className="px-3 py-2 text-sm font-semibold text-white uppercase rounded-lg cursor-pointer bg-action hover:bg-action-hover"
    >
      {isLoading ? "Creando..." : "Crear"}
    </button>
  );
}

export default CreateProjectButton;
