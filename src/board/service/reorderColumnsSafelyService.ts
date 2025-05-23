import { supabase } from "@/common/utils/supabase";

export async function reorderColumnsSafelyService(newOrder: string[]) {
  const { error } = await supabase.rpc("reorder_columns", {
    new_order: newOrder,
  });

  if (error) {
    console.error("Error al reordenar columnas:", error.message);
    throw error;
  }
}
