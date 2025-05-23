import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ColumnInterface } from "../interfaces/columnInterface";
import { updateColumnService } from "../service/updateColumnService";
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
