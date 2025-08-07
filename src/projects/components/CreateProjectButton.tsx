'use client'

import { useCreateProject } from "@/projects/hooks/useCreateProject";
import { redirect } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface CreateProjectButtonProps {
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
  projectDescription: string;
  projectName: string;
  pathname: string;
  userId: string;
}

function CreateProjectButton({
  setShowForm,
  projectDescription,
  projectName,
  pathname,
  userId,
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
    if (pathname !== "projects") {
      redirect("/projects");
    }
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
