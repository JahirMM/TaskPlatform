import { getColumnsService } from "@/board/service/getColumnsService";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/common/utils/supabase";
import { useEffect } from "react";

export const useGetColumns = (projectId?: string) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    let channel: ReturnType<typeof supabase.channel> | undefined;

    if (projectId) {
      channel = supabase
        .channel(`realtime:columns:${projectId}`)
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "columns",
          },
          () => {
            queryClient.invalidateQueries({
              queryKey: ["getColumns", projectId],
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
    queryKey: ["getColumns", projectId],
    queryFn: async () => await getColumnsService(projectId!),
    enabled: !!projectId,
    staleTime: 1000 * 60 * 5,
  });
};
