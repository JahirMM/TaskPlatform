import FormCreateComment from "@/board/components/FormCreateComment";
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
        <FormCreateComment taskId={taskId} />
      </div>
    </section>
  );
}
