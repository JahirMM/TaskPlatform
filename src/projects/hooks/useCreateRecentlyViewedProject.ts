import { createRecentlyViewedProjectService } from "@/projects/services/createRecentlyViewedProjectService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCreateRecentlyViewedProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      project_id,
      user_id,
    }: {
      project_id: string;
      user_id: string;
    }) => createRecentlyViewedProjectService(project_id, user_id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getRecentlyViewedProjects"],
      });
    },
    onError: (error) => {
      toast.error(
        error instanceof Error
          ? `Error al agregar proyecto como visto recientemente`
          : "Error desconocido"
      );
    },
  });
};
