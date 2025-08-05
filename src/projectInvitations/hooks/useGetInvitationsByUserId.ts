import { getInvitationsByUserIdService } from "@/projectInvitations/services/getInvitationsByUserIdService";
import { useQuery } from "@tanstack/react-query";

export const useGetInvitationsByUserId = (userId: string) => {
  return useQuery({
    enabled: !!userId,
    queryKey: ["getInvitations", userId],
    queryFn: () => getInvitationsByUserIdService(userId),
    staleTime: 1000 * 60 * 5,
    placeholderData: (prevData) => prevData,
  });
};
