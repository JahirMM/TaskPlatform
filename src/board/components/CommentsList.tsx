import { useGetCommentsWithUsers } from "@/board//hook/useGetCommentsWithUsers";

interface CommentsListProps {
  taskId: string;
}

export default function CommentsList({ taskId }: CommentsListProps) {
  const {
    data: commentsData,
    isLoading,
    isError,
  } = useGetCommentsWithUsers(taskId);

  if (isError || !commentsData) {
    return <div>Error al mostrar los comentarios</div>;
  }

  return isLoading ? (
    <div>Cargando...</div>
  ) : commentsData.length > 0 ? (
    commentsData.map((comment) => (
      <article
        className="p-4 rounded-lg bg-bg-secondary"
        aria-labelledby={`comment-${comment.id}-author`}
        key={comment.id}
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            {comment.user.avatar_url ? (
              <div className="flex items-center justify-center w-8 h-8 text-sm font-medium text-white rounded-full">
                <img src={comment.user.avatar_url} alt="" className="w-full" />
              </div>
            ) : (
              <div className="flex items-center justify-center w-8 h-8 text-sm font-medium text-white rounded-full bg-action"></div>
            )}
            <p className="text-sm font-medium text-white">
              {comment.user.name}
            </p>
          </div>
          <span className="text-xs text-gray-400">{comment.content}</span>
        </div>
        <p className="text-sm text-gray-300">{comment.content}</p>
      </article>
    ))
  ) : (
    <div className="text-white text-xs text-center">
      No hay comentarios creados
    </div>
  );
}
