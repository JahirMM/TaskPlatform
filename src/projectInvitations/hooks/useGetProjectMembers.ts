import { getProjectMembersService } from "@/projectInvitations/services/getProjectMembersService";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/common/utils/supabase";
import { useEffect } from "react";

export const useGetProjectMembers = (projectId: string) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    let channel: ReturnType<typeof supabase.channel> | undefined;

    if (projectId) {
      channel = supabase
        .channel(`realtime:projectMembers:${projectId}`)
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "project_members",
          },
          () => {
            queryClient.invalidateQueries({
              queryKey: ["getProjectMembers", projectId],
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
    queryKey: ["getProjectMembers", projectId],
    queryFn: async () => await getProjectMembersService(projectId),
    staleTime: 1000 * 60 * 5,
    placeholderData: (prevData) => prevData,
  });
};
