import { getTasksByProjectIdService } from "@/board/service/getTasksByProjectIdService";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/common/utils/supabase";
import { useEffect } from "react";

export const useGetTasksByProjectId = (projectId: string) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    let channel: ReturnType<typeof supabase.channel> | undefined;

    if (projectId) {
      channel = supabase
        .channel(`realtime:tasks:${projectId}`)
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "tasks",
          },
          () => {
            queryClient.invalidateQueries({
              queryKey: ["getTasksByProjectId", projectId],
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
  }, [projectId, queryClient]);

  return useQuery({
    queryKey: ["getTasksByProjectId", projectId],
    queryFn: async () => await getTasksByProjectIdService(projectId),
    staleTime: 1000 * 60 * 5,
    placeholderData: (prevData) => prevData,
  });
};