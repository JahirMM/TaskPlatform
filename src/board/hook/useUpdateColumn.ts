import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateColumnService } from "@/board/service/updateColumnService";
import { ColumnInterface } from "@/board/interfaces/columnInterface";
import { toast } from "sonner";

type UpdateColumnParams = {
  columnId: string;
  updates: Partial<ColumnInterface>
  projectId: string;
}

export const useUpdateColumn = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UpdateColumnParams) => updateColumnService(data.columnId, data.updates),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["getColumns", variables.projectId] });
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
