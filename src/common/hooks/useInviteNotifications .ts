import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/common/utils/supabase";
import { useEffect } from "react";
import { toast } from "sonner";

export const useInviteNotifications = (userId?: string) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!userId) return;

    const channel = supabase.channel(`notifications:${userId}`);

    channel
      .on("broadcast", { event: "new-invite" }, () => {
        queryClient.invalidateQueries({
          queryKey: ["getInvitations", userId],
        });

        toast.success("Nueva invitación recibida");
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId, queryClient]);
};
