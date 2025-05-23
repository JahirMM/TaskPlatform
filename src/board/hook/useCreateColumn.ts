import { CreateColumnRequestInterface } from "@/board/interfaces/createColumnRequestInterface";
import { createColumnService } from "@/board/service/createColumnService";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCreateColumn = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (request: CreateColumnRequestInterface) =>
      createColumnService(request),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getColumns"] });
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
