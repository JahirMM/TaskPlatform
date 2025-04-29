import { RecentlyViewedProjectInterface } from "@/projects/interfaces/recentlyViewedProjectInterface";
import { getRecentlyViewedProjects } from "@/projects/services/getRecentlyViewedProjects";

import { useState, useEffect } from "react";

export const useRecentlyViewedProjects = () => {
  const [projects, setProjects] = useState<RecentlyViewedProjectInterface[]>(
    []
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = async () => {
    try {
      const data = await getRecentlyViewedProjects();
      setProjects(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  return { projects, loading, error };
};
