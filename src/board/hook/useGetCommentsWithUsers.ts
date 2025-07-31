import { getCommentsWithUserService } from "@/board/service/getCommentsWithUserService";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/common/utils/supabase";
import { useEffect } from "react";

export const useGetCommentsWithUser = (taskId: string) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    let channel: ReturnType<typeof supabase.channel> | undefined;

    if (taskId) {
      channel = supabase
        .channel(`realtime:comment:${taskId}`)
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "comments",
          },
          () => {
            queryClient.invalidateQueries({
              queryKey: ["getCommentsWithUsers", taskId],
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
    queryKey: ["getCommentsWithUsers", taskId],
    queryFn: async () => await getCommentsWithUserService(taskId),
    placeholderData: (prevData) => prevData,
    staleTime: 1000 * 60 * 5,
  });
};
