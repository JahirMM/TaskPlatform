import { CommentWithUserInterface } from "@/board/interfaces/CommentWithUserInterface";
import { supabase } from "@/common/utils/supabase";

export const getCommentsWithUserService = async (
  taskId: string
): Promise<CommentWithUserInterface[]> => {
  const { data, error } = await supabase
    .from("comments")
    .select(
      `
    id,
    task_id,
    user_id,
    content,
    created_at,
    user:users (
      id,
      name,
      created_at,
      avatar_url,
      user_name
    )
  `
    )
    .eq("task_id", taskId)
    .order("created_at", { ascending: true });

  if (error) {
    throw new Error(`Error al obtener comentarios: ${error.message}`);
  }

  if (data.length === 0) {
    return [];
  }

  return data;
};
