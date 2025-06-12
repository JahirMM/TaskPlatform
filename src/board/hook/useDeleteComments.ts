import { deleteCommentService } from "@/board/service/deleteCommentService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

type DeleteCommentParams = {
  commentId: string;
  taskId: string;
};

export const useDeleteComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ commentId }: DeleteCommentParams) => {
      return deleteCommentService(commentId);
    },

    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["getCommentsWithUsers", variables.taskId],
      });
    },

    onError: (error) => {
      toast.error(
        error instanceof Error
          ? `Error al eliminar el comentario`
          : "Error desconocido"
      );
    },
  });
};
