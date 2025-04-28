import { ProjectInterface } from "@/projects/interfaces/projectInterface";
import { getUser } from "@/common/services/getUser";
import { supabase } from "@/utils/supabase";

export const getProjects = async (): Promise<ProjectInterface[]> => {
  const user = await getUser();
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("owner_id", user.id)
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  if (!data) return [];

  return data;
};
