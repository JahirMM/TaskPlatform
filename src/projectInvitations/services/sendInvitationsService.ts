import { UserInterface } from "@/common/interfaces/userInterface";
import { supabase } from "@/common/utils/supabase";
import { toast } from "sonner";

export const sendInvitationsService = async (
  users: UserInterface[],
  senderUserId: string,
  projectId: string
) => {
  for (const user of users) {
    const [isMember, isOwner] = await Promise.all([
      isUserMember(user.id, projectId),
      isUserOwner(user.id, projectId),
    ]);

    if (!isMember && !isOwner) {
      const request = {
        sender_user_id: senderUserId,
        recipient_user_id: user.id,
        project_id: projectId,
      };

      const { error } = await supabase
        .from("project_invitations")
        .insert([request]);

      if (error) {
        const nameToShow =
          user.name && user.name !== "No Name" ? user.name : user.user_name;
        toast.error(`Error al enviar la invitación a ${nameToShow}`);
      }
    }
  }
  toast.success("Invitaciones enviadas");
};

const isUserMember = async (userId: string, projectId: string) => {
  const { data, error } = await supabase
    .from("project_members")
    .select("user_id")
    .eq("project_id", projectId)
    .eq("user_id", userId)
    .maybeSingle();

  if (error) {
    console.error("Error al verificar si es miembro:", error.message);
    return false;
  }

  return data !== null;
};

const isUserOwner = async (userId: string, projectId: string) => {
  const { data, error } = await supabase
    .from("projects")
    .select("id")
    .eq("id", projectId)
    .eq("owner_id", userId)
    .maybeSingle();

  if (error) {
    console.error("Error al verificar si es dueño:", error.message);
    return false;
  }

  return data !== null;
};
