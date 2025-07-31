import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getTaskService } from "@/board/service/getTaskService";
import { supabase } from "@/common/utils/supabase";
import { useEffect } from "react";

export const useGetTask = (taskId: string) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    let channel: ReturnType<typeof supabase.channel> | undefined;

    if (taskId) {
      channel = supabase
        .channel(`realtime:task:${taskId}`)
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "tasks",
          },
          () => {
            queryClient.invalidateQueries({
              queryKey: ["getTask", taskId],
            });
          }
        )
        .subscribe();
    }

    return () => {
      if (channel) {
        supabase.removeChannel(channel);
      }
    };
  }, [taskId, queryClient]);

  return useQuery({
    queryKey: ["getTask", taskId],
    queryFn: async () => await getTaskService(taskId),
    staleTime: 1000 * 60 * 5,
    placeholderData: (prevData) => prevData,
  });
};
