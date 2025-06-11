import { getCommentsService } from "@/board/service/getCommentsService";
import { useQuery } from "@tanstack/react-query";

export const useGetComments = (taskId: string) => {
  return useQuery({
    queryKey: ["getComments", taskId],
    queryFn: async () => await getCommentsService(taskId),
    placeholderData: (prevData) => prevData,
    staleTime: 1000 * 60 * 5,
  });
};
