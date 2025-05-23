import { deleteColumnService } from "@/board/service/deleteColumnService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useDeleteColumn = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (columnId: string) => deleteColumnService(columnId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getColumns"] });
    },
    onError: (error) => {
      toast.error(
        error instanceof Error
          ? `Error al eliminar la columna`
          : "Error desconocido"
      );
    },
  });
};
