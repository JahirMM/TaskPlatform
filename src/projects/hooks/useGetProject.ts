import { useQuery } from "@tanstack/react-query";
import { getProjectService } from "@/projects/services/getProjectService";

export const useGetProject = (projectId: string) => {
  return useQuery({
    queryKey: ["getProject", projectId],
    queryFn: () => getProjectService(projectId),
    staleTime: 1000 * 60 * 5,
    enabled: !!projectId,
    retry: false,
  });
};
