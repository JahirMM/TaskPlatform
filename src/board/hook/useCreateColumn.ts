import { CreateColumnRequestInterface } from "@/board/interfaces/createColumnRequestInterface";
import { createColumnService } from "@/board/service/createColumnService";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

type CreateColumnParams = {
  request: CreateColumnRequestInterface,
  projectId: string,
}

export const useCreateColumn = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateColumnParams) =>
      createColumnService(data.request),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["getColumns", variables.projectId] });
    },
    onError: (error) => {
      toast.error(
        error instanceof Error
          ? `Error al crear la columna`
          : "Error desconocido"
      );
    },
  });
};
