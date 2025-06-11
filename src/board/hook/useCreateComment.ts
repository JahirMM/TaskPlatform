import { CreateCommentRequestInterface } from "@/board/interfaces/createCommentRequestInterface";

import { createCommentService } from "@/board/service/createCommentService";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCreateComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (request: CreateCommentRequestInterface) =>
      createCommentService(request),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["getCommentsWithUsers", variables.task_id],
      });
    },
    onError: (error) => {
      toast.error(
        error instanceof Error
          ? `Error al crear el comentario`
          : "Error desconocido"
      );
    },
  });
};
