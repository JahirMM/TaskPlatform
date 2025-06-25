import { sendInvitationsService } from "@/projectInvitations/services/sendInvitationsService";
import { UserInterface } from "@/common/interfaces/userInterface";

import { useMutation } from "@tanstack/react-query";

export const useSendInvitations = () => {
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
  });
};
