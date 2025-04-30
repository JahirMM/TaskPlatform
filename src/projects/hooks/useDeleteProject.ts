import { deleteProjectService } from "@/projects/services/deleteProject";
import { getUser } from "@/common/services/getUser";
import { useState } from "react";

export const useDeleteProject = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteProject = async (project_id: string): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      const user = await getUser();

      if (!user || !user.id) {
        throw new Error("Usuario no autenticado");
      }

      await deleteProjectService(project_id, user.id);
    } catch (err: any) {
      setError(err.message || "Error inesperado");
    } finally {
      setLoading(false);
    }
  };

  return { deleteProject, loading, error };
};
