import { addProjectMemberService } from "@/projectInvitations/services/addProjectMemberService";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useAddProjectMember = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      project_id,
      user_id,
    }: {
      project_id: string;
      user_id: string;
    }) => addProjectMemberService({ project_id, user_id }),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["getProjects", variables.user_id],
      });
      toast.success("Te has unido al proyecto con éxito");
    },
  });
};
