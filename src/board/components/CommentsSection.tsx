import CommentsList from "@/board/components/CommentsList";

interface CommentsSectionProps {
  taskId: string;
}

export function CommentsSection({ taskId }: CommentsSectionProps) {
  return (
    <section className="mt-8">
      <h3 className="mb-4 text-sm font-medium text-white">Comentarios</h3>
      <div className="space-y-4">
        <CommentsList taskId={taskId} />
        {/* Nuevo comentario */}
        <div className="mt-6">
          <textarea
            className="w-full px-3 py-2 text-sm text-white border rounded-lg outline-none resize-none border-bg-primary bg-bg-primary focus:border-action focus:ring-1 focus:ring-action"
            placeholder="Añadir un comentario..."
            rows={3}
          />
          <button className="px-4 py-2 mt-2 text-sm font-medium text-white transition-colors rounded-lg bg-action hover:bg-action-hover">
            Enviar comentario
          </button>
        </div>
      </div>
    </section>
  );
}
