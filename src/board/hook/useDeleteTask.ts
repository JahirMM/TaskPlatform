import { deleteTaskService } from "@/board/service/deleteTaskService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      taskId,
      projectId,
    }: {
      taskId: string;
      projectId: string;
    }) => deleteTaskService(taskId),
    onSuccess: (_, { projectId }) => {
      queryClient.invalidateQueries({
        queryKey: ["getTasksByProjectId", projectId],
      });
    },
    onError: (error) => {
      toast.error(
        error instanceof Error
          ? `Error al eliminar la tarea`
          : "Error desconocido"
      );
    },
  });
};
