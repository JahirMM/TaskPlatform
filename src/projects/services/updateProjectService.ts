import { supabase } from "@/common/utils/supabase";

export const updateProjectService = async (name: string, projectId: string) => {
  const { error } = await supabase
    .from("projects")
    .update({ name })
    .eq("id", projectId);

  if (error) {
    throw new Error("Error al actualizar el nombre del proyecto");
  }
};
