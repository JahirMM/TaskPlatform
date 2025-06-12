import { supabase } from "@/common/utils/supabase";

export const deleteCommentService = async (commentId: string) => {
  const { error } = await supabase
    .from("comments")
    .delete()
    .eq("id", commentId);

  if (error) {
    throw new Error("Error al eliminar el comentario");
  }
};
