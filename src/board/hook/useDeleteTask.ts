import { deleteTaskService } from "@/board/service/deleteTaskService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    // TODO: en el componente se le pasea porjectId pero fn no recive un porjectId entonces porque no pasa un error
    mutationFn: async ({ taskId }: { taskId: string; projectId: string }) =>
      deleteTaskService(taskId),
    onSuccess: (_data, { projectId }) => {
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
