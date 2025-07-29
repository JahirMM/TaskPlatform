import { deleteColumnService } from "@/board/service/deleteColumnService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

type DeleteColumnParams = {
  columnId: string;
  projectId: string;
}

export const useDeleteColumn = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({columnId}: DeleteColumnParams) => {return deleteColumnService(columnId)},
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["getColumns", variables.projectId] });

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
