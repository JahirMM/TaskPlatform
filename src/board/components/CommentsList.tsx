import { useGetCommentsWithUser } from "@/board/hook/useGetCommentsWithUsers";

import CommentsListSkeleton from "@/board/skeletons/CommentsListSkeleton";
import { useDeleteComment } from "@/board/hook/useDeleteComments";
import { useGetUser } from "@/common/hooks/useGetUser";

import { formatDate } from "@/common/utils/formatDate";

interface CommentsListProps {
  taskId: string;
}

export default function CommentsList({ taskId }: CommentsListProps) {
  const {
    data: commentsData,
    isLoading,
    isError,
  } = useGetCommentsWithUser(taskId);

  const { data: user } = useGetUser();

  const mutationDeleteComment = useDeleteComment();

  if (isError) {
    return <div>Error al mostrar los comentarios</div>;
  }

  const deleteComment = (commentId: string) => {
    mutationDeleteComment.mutate({ commentId, taskId });
  };

  return isLoading ? (
    <CommentsListSkeleton />
  ) : commentsData && commentsData.length > 0 ? (
    commentsData.map((comment) => (
      <article
        className="p-4 rounded-lg bg-bg-secondary"
        aria-labelledby={`comment-${comment.id}-author`}
        key={comment.id}
      >
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              {comment.user.avatar_url ? (
                <img
                  src={comment.user.avatar_url}
                  alt={comment.user.name || "Foto de perfil del usuario"}
                  className="w-8 h-8 rounded-full"
                />
              ) : (
                <div className="flex items-center justify-center w-8 h-8 text-sm font-medium text-white rounded-full bg-action"></div>
              )}
              <p className="text-sm font-medium text-white">
                {comment.user.name}
              </p>
            </div>
            <span className="text-xs text-gray-400">
              {formatDate(comment.created_at)}
            </span>
          </div>
          <p className="text-sm text-gray-300">{comment.content}</p>
        </div>
        {user?.id === comment.user_id && (
          <div
            onClick={() => deleteComment(comment.id)}
            className="mt-5 text-[10px] text-action cursor-pointer"
          >
            Eliminar comentario
          </div>
        )}
      </article>
    ))
  ) : (
    <div className="text-xs text-center text-white">
      No hay comentarios creados
    </div>
  );
}
