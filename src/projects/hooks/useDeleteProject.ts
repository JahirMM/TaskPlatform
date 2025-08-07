import { deleteProjectService } from "@/projects/services/deleteProjectService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useDeleteProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      projectId,
      userId,
    }: {
      projectId: string;
      userId: string;
    }) => deleteProjectService(projectId, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getRecentlyViewedProjects"] });
      queryClient.invalidateQueries({ queryKey: ["getProjects"] });
    },
    onError: (error) => {
      toast.error(
        error instanceof Error
          ? `Error al eliminar el proyecto`
          : "Error desconocido"
      );
    },
  });
};
