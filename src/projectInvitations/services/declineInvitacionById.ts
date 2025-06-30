import { supabase } from "@/common/utils/supabase";

export const declineInvitationkService = async (invitationId: string) => {
  const { error } = await supabase
    .from("project_invitations")
    .delete()
    .eq("id", invitationId);

  if (error) {
    throw new Error("Error al eliminar la invitación");
  }
};
