import { CreateCommentRequestInterface } from "@/board/interfaces/createCommentRequestInterface";
import { useCreateComment } from "@/board/hook/useCreateComment";
import getSession from "@/common/utils/getSession";
import { ChangeEvent, useRef } from "react";
import { toast } from "sonner";

interface FormCreateCommentProps {
  taskId: string;
}

function FormCreateComment({ taskId }: FormCreateCommentProps) {
  const createMutationComment = useCreateComment();

  const commentRef = useRef<HTMLTextAreaElement>(null);

  const handleCommentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length > 250) {
      e.target.value = e.target.value.slice(0, 250);
      return;
    }
    e.target.style.height = "auto";
    e.target.style.height = e.target.scrollHeight + "px";
  };

  const createComment = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); 
    if (!commentRef.current?.value) return;

    const session = await getSession();

    if (!session || !session.user.id) {
      return toast.error("Usuario no autenticado");
    }

    const request: CreateCommentRequestInterface = {
      user_id: session.user.id,
      task_id: taskId,
      content: commentRef.current.value,
    };

    createMutationComment.mutate(request);
    
    commentRef.current.value = "";
};

  return (
    <div className="mt-6">
      <textarea
        ref={commentRef}
        name="comment"
        defaultValue={commentRef.current?.value || ""}
        className="w-full px-3 py-2 overflow-hidden text-sm text-white border rounded-lg outline-none resize-none border-bg-primary bg-bg-primary focus:border-action focus:ring-1 focus:ring-action"
        placeholder="Añadir un comentario..."
        onChange={handleCommentChange}
        rows={3}
      />
      <button
        onClick={createComment}
        className="px-4 py-2 mt-2 text-sm font-medium text-white transition-colors rounded-lg bg-action hover:bg-action-hover"
      >
        Enviar comentario
      </button>
    </div>
  );
}

export default FormCreateComment;
