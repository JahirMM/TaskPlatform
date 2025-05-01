import { createProjectService } from "@/projects/services/createProjectService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface RequestInterfa {
  name: string;
  description: string;
  owner_id: string;
}

export const useCreateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (request: RequestInterfa) =>
      createProjectService(request),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getProjects"] });
    },
    onError: (error) => {
      toast.error(
        error instanceof Error
          ? `Error al crear el proyecto`
          : "Error desconocido"
      );
    },
  });
};
