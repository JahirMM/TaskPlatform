import { TaskInterface } from "@/board/interfaces/taskInterface";
import { supabase } from "@/common/utils/supabase";

export const updateTasknService = async (
  taskId: string,
  updates: Partial<TaskInterface>
) => {
  const { data, error } = await supabase
    .from("tasks")
    .update(updates)
    .eq("id", taskId)
    .select();

  if (error) {
    console.error("Error actualizando la tarea:", error);
  }

  return data;
};
