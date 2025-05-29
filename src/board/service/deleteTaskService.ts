import { supabase } from "@/common/utils/supabase";

export const deleteTaskService = async (taskId: string) => {
  const { error } = await supabase.from("tasks").delete().eq("id", taskId);

  if (error) {
    throw new Error("Error al eliminar la tarea");
  }
};
