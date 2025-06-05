import { supabase } from "@/common/utils/supabase";

export async function reorderTasksSafelyService(
  newOrder: string[],
  newColumnId: string
) {
  const { error } = await supabase.rpc("reorder_tasks", {
    new_order: newOrder,
    new_column_id: newColumnId,
  });

  if (error) {
    console.error("Error al reordenar tareas:", error.message);
    throw error;
  }
}
