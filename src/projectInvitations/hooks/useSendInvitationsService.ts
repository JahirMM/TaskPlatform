import { sendInvitationsService } from "@/projectInvitations/services/sendInvitationsService";
import { UserInterface } from "@/common/interfaces/userInterface";

import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useSendInvitations = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      users,
      senderUserId,
      projectId,
    }: {
      users: UserInterface[];
      senderUserId: string;
      projectId: string;
    }) => sendInvitationsService(users, senderUserId, projectId),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["getProjectMembers", variables.projectId],
      });
    },
  });
};
