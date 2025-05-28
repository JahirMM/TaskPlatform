import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateColumnService } from "@/board/service/updateColumnService";
import { ColumnInterface } from "@/board/interfaces/columnInterface";
import { toast } from "sonner";

export const useUpdateColumn = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      columnId,
      updates,
    }: {
      columnId: string;
      updates: Partial<ColumnInterface>;
    }) => updateColumnService(columnId, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getColumns"] });
    },
    onError: (error) => {
      toast.error(
        error instanceof Error
          ? `Error al actualizar la columna`
          : "Error desconocido"
      );
    },
  });
};
