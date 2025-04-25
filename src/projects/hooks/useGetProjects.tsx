import { ProjectInterface } from "@/projects/interfaces/projectInterface";
import { getProjects } from "@/projects/services/getProjects";

import { useState, useEffect } from "react";

export const useGetProjects = () => {
  const [projects, setProjects] = useState<ProjectInterface[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getProjects();
        setProjects(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return { projects, loading, error };
};
