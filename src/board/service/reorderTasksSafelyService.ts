import { supabase } from "@/common/utils/supabase";

export async function reorderTasksSafelyService(
  newOrder: string[],
  newColumnId: string
) {
  console.log("NEW ORDER");
  console.log(newOrder);
  console.log("-----------");
  console.log("COLUMN ID");
  console.log(newColumnId);

  const { error } = await supabase.rpc("reorder_tasks", {
    new_order: newOrder,
    new_column_id: newColumnId,
  });

  if (error) {
    console.error("Error al reordenar tareas:", error.message);
    throw error;
  }
}
