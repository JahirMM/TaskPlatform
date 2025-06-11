import { commentInterface } from "@/board/interfaces/commentInterface";
import { supabase } from "@/common/utils/supabase";

export const getCommentsService = async (
  taskId: string
): Promise<commentInterface[]> => {
  const { data, error } = await supabase
    .from("comments")
    .select("*")
    .eq("task_id", taskId);

  if (error) throw new Error(error.message);
  if (!data) return [];

  return data;
};
