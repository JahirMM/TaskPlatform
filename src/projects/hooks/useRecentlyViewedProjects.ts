import { RecentlyViewedProjectInterface } from "@/projects/interfaces/recentlyViewedProjectInterface";
import { getRecentlyViewedProjects } from "@/projects/services/getRecentlyViewedProjects";

import { useState, useEffect, useCallback } from "react";

export const useRecentlyViewedProjects = (autoFetch = true) => {
  const [projects, setProjects] = useState<RecentlyViewedProjectInterface[]>(
    []
  );
  const [loading, setLoading] = useState<boolean>(autoFetch);
  const [error, setError] = useState<string | null>(null);

  const fetchRecentlyViewedProjects = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getRecentlyViewedProjects();
      setProjects(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (autoFetch) {
      fetchRecentlyViewedProjects();
    }
  }, [autoFetch, fetchRecentlyViewedProjects]);

  return { projects, loading, error, fetchRecentlyViewedProjects };
};
