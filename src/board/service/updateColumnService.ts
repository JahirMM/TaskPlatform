import { ColumnInterface } from "@/board/interfaces/columnInterface";
import { supabase } from "@/common/utils/supabase";

export const updateColumnService = async (
  columnId: string,
  updates: Partial<ColumnInterface>
) => {
  const { error } = await supabase
    .from("columns")
    .update(updates)
    .eq("id", columnId);

  if (error) {
    console.error("Error actualizando columna:", error);
  }
};
