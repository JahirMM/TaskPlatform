import { supabase } from "@/utils/supabase";

export const deleteProjectService = async (
  project_id: string,
  owner_id: string
): Promise<void> => {
  const { error } = await supabase
    .from("projects")
    .delete()
    .eq("id", project_id)
    .eq("owner_id", owner_id);

  if (error) {
    throw new Error(`Error al eliminar proyecto: ${error.message}`);
  }
};
