import { ProjectInterface } from "@/projects/interfaces/projectInterface";
import { supabase } from "@/common/utils/supabase";

export const getProjectService = async (
  projectId: string
): Promise<ProjectInterface | null> => {
  const { data, error } = await supabase
    .from("projects")
    .select("*", { head: false })
    .eq("id", projectId)
    .single();

  if (error && error.code !== "PGRST116") {
    throw new Error(error.message);
  }

  return data ?? null;
};
