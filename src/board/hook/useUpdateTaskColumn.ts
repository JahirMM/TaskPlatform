import { useMutation } from "@tanstack/react-query";
import { updateTasknService } from "@/board/service/updateTaskService";
import { toast } from "sonner";

export const useUpdateTaskColumn = () => {
  return useMutation({
    mutationFn: async ({
      taskId,
      columnId,
      position
    }: {
      taskId: string;
      columnId: string;
      position: number
    }) => updateTasknService(taskId, { column_id: columnId, position }),
    onError: (error) => {
      toast.error(
        error instanceof Error
          ? `Error al actualizar la columna`
          : "Error desconocido"
      );
    },
  });
};
