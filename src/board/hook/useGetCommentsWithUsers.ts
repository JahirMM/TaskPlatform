import { getCommentsWithUserService } from "@/board/service/getCommentsWithUserService";
import { useQuery } from "@tanstack/react-query";

export const useGetCommentsWithUser = (taskId: string) => {
  return useQuery({
    queryKey: ["getCommentsWithUsers", taskId],
    queryFn: async () => await getCommentsWithUserService(taskId),
    placeholderData: (prevData) => prevData,
    staleTime: 1000 * 60 * 5,
  });
};
