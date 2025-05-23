import { supabase } from "@/common/utils/supabase";

export const deleteColumnService = async (columnId: string) => {
  const { error } = await supabase.from("columns").delete().eq("id", columnId);

  if (error) {
    throw new Error("Error al eliminar una columna");
  }
};
