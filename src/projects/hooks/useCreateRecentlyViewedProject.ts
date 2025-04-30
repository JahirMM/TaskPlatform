import { createRecentlyViewedProjectService } from "@/projects/services/createRecentlyViewedProject";
import { useState } from "react";

export const useCreateRecentlyViewedProject = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createRecentlyViewedProject = async (
    project_id: string,
    user_id: string
  ): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      await createRecentlyViewedProjectService(project_id, user_id);
    } catch (err: any) {
      setError(err.message || "Error inesperado");
    } finally {
      setLoading(false);
    }
  };

  return { createRecentlyViewedProject, loading, error };
};
