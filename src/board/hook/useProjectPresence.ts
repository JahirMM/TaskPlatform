import { supabase } from "@/common/utils/supabase";
import { useEffect, useState } from "react";

interface PresenceUser {
  userId: string;
  name: string;
  status: string;
  avatarUrl: string;
}

export function useProjectPresence(
  projectId: string,
  userId: string,
  userName: string,
  avatarUrl: string
) {
  const [onlineUsers, setOnlineUsers] = useState<PresenceUser[]>([]);

  useEffect(() => {
    if (!projectId || !userId || !userName || !avatarUrl) return;

    const channel = supabase.channel(`presence:project:${projectId}`, {
      config: {
        presence: {
          key: userId,
        },
      },
    });

    channel.on("presence", { event: "sync" }, () => {
      const state = channel.presenceState() as Record<string, PresenceUser[]>;
      const users: PresenceUser[] = Object.values(state)
        .flat()
        .filter((u) => u.userId && u.userId !== userId)
        .map((u) => ({
          userId: u.userId,
          name: u.name,
          status: u.status,
          avatarUrl: u.avatarUrl,
        }));
      setOnlineUsers(users);
    });

    channel.subscribe(async (status) => {
      if (status === "SUBSCRIBED") {
        await channel.track({
          userId,
          name: userName,
          status: "online",
          avatarUrl,
        });
      }
    });

    return () => {
      if (channel && supabase) {
        supabase.removeChannel(channel);
      }
    };
  }, [projectId, userId, userName, avatarUrl]);

  return onlineUsers;
}
