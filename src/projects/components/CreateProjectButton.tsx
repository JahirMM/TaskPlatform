import { useCreateProject } from "@/projects/hooks/useCreateProject";
import { useState } from "react";
import { toast } from "sonner";

interface CreateProjectButtonProps {
  projectName: string;
  projectDescription: string;
  userId: string;
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
}

function CreateProjectButton({
  projectName,
  projectDescription,
  userId,
  setShowForm,
}: CreateProjectButtonProps) {
  const mutationCreateProject = useCreateProject();
  const [isLoading, setIsLoading] = useState(false);

  const addProject = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!projectName || !projectDescription) {
      toast.error("Por favor llenar todos los campos");
      return;
    }

    await mutationCreateProject.mutateAsync({
      name: projectName,
      description: projectDescription,
      owner_id: userId,
    });
    setIsLoading(false);
    setShowForm(false);
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
