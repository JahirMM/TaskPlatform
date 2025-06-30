import { declineInvitationkService } from "@/projectInvitations/services/declineInvitacionById";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useDeclineInvitation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      invitationId,
    }: {
      invitationId: string;
      userId: string;
    }) => declineInvitationkService(invitationId),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["getInvitations", variables.userId],
      });
    },
    onError: (error) => {
      toast.error(
        error instanceof Error
          ? `Error al rechazar la invitación`
          : "Error desconocido"
      );
    },
  });
};
