import { getColumnsService } from "@/board/service/getColumnsService";
import { useQuery } from "@tanstack/react-query";

export const useGetColumns = (projectId?: string) => {
  return useQuery({
    queryKey: ["getColumns", projectId],
    queryFn: async () => await getColumnsService(projectId!),
    enabled: !!projectId,
    staleTime: 1000 * 60 * 5,
  });
};
