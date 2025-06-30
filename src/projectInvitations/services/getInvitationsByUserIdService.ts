import { InvitationInterface } from "@/projectInvitations/interfaces/invitationInterface";
import { supabase } from "@/common/utils/supabase";

export const getInvitationsByUserIdService = async (
  userId: string
): Promise<InvitationInterface[]> => {
  const { data, error } = await supabase
    .from("project_invitations")
    .select("*")
    .eq("recipient_user_id", userId);

  if (error) {
    throw new Error(error.message);
  }

  return data;
};
