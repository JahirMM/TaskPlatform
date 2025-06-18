import { updateProjectService } from "@/projects/services/updateProjectService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useUpdateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      name,
      projectId,
    }: {
      name: string;
      projectId: string;
    }) => updateProjectService(name, projectId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getProjects"] });
      console.log("Proyecto actulizado");
    },
    onError: (error) => {
      toast.error(
        error instanceof Error
          ? `Error al actualizar el nombre del proyecto`
          : "Error desconocido"
      );
    },
  });
};
