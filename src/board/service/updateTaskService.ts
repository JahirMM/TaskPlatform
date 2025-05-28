import { TaskInterface } from "@/board/interfaces/taskInterface";
import { supabase } from "@/common/utils/supabase";

export const updateTasknService = async (
  taskId: string,
  updates: Partial<TaskInterface>
) => {
  const { error } = await supabase
    .from("tasks")
    .update(updates)
    .eq("id", taskId);

  if (error) {
    console.error("Error actualizando la tarea:", error);
  }
};
