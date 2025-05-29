import { CreateTaskRequestInterface } from "@/board/interfaces/CreateTaskRequestInterface";
import { createTaskService } from "@/board/service/createTaskService";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCreateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (request: CreateTaskRequestInterface) =>
      createTaskService(request),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getTasksByProjectId"] });
    },
    onError: (error) => {
      toast.error(
        error instanceof Error ? `Error al crear la tarea` : "Error desconocido"
      );
    },
  });
};
