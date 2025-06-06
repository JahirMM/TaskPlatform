import { TaskInterface } from "@/board/interfaces/taskInterface";
import { supabase } from "@/common/utils/supabase";

export const getTaskService = async (
  taskId: string
): Promise<TaskInterface[]> => {
  const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .eq("id", taskId);

  if (error) throw new Error(error.message);
  if (!data) return [];

  return data;
};
