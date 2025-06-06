import { getTaskService } from "@/board/service/getTaskService";
import { useQuery } from "@tanstack/react-query";

export const useGetTask = (taskId: string) => {
  return useQuery({
    queryKey: ["getTask", taskId],
    queryFn: async () => await getTaskService(taskId),
    staleTime: 1000 * 60 * 5,
    placeholderData: (prevData) => prevData,
  });
};
