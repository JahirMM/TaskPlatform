import { getInvitationsByUserIdService } from "@/projectInvitations/services/getInvitationsByUserIdService";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/common/utils/supabase";
import { useEffect } from "react";

export const useGetInvitationsByUserId = (userId: string) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    let channel: ReturnType<typeof supabase.channel> | undefined;

    if (userId) {
      channel = supabase
        .channel(`realtime:projectInvitations:${userId}`)
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "project_invitations",
            filter: `receiver_id=eq.${userId}`,
          },
          () => {
            queryClient.invalidateQueries({
              queryKey: ["getInvitations", userId],
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
  }, [userId, queryClient]);
  return useQuery({
    enabled: !!userId,
    queryKey: ["getInvitations", userId],
    queryFn: () => getInvitationsByUserIdService(userId),
    staleTime: 1000 * 60 * 5,
    placeholderData: (prevData) => prevData,
  });
};
