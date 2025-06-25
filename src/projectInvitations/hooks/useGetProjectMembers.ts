import { getProjectMembersService } from "@/projectInvitations/services/getProjectMembersService";
import { useQuery } from "@tanstack/react-query";

export const useGetProjectMembers = (projectId: string) => {
  return useQuery({
    queryKey: ["getProjectMembers", projectId],
    queryFn: async () => await getProjectMembersService(projectId),
    staleTime: 1000 * 60 * 5,
    placeholderData: (prevData) => prevData,
  });
};
