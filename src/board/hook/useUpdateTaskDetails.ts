import { updateTasknService } from "@/board/service/updateTaskService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useUpdateTaskDetails = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      taskId,
      columnId,
      title,
      description,
    }: {
      taskId: string;
      columnId: string;
      title?: string;
      description?: string;
    }) =>
      updateTasknService(taskId, { column_id: columnId, title, description }),

    onSuccess: (updatedTask, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["getTask", variables.taskId],
        exact: true,
      });
      return updatedTask;
    },

    onError: (error) => {
      toast.error(
        error instanceof Error
          ? "Error al actualizar la tarea"
          : "Error desconocido"
      );
    },
  });
};
