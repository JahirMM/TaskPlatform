import { getTasksByProjectIdService } from "@/board/service/getTasksByProjectIdService";
import { useQuery } from "@tanstack/react-query";

export const useGetTasksByProjectId = (projectId: string) => {
  return useQuery({
    queryKey: ["getTasksByProjectId", projectId],
    queryFn: async () => await getTasksByProjectIdService(projectId),
    staleTime: 1000 * 60 * 5,
    placeholderData: (prevData) => prevData,
  });
};
