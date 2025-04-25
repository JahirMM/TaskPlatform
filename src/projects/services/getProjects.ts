import { ProjectInterface } from "@/projects/interfaces/projectInterface";
import { supabase } from "@/utils/supabase";

export const getProjects = async (): Promise<ProjectInterface[]> => {
  const { data, error } = await supabase.from("projects").select("*");
  if (error) throw new Error(error.message);
  if (!data) return [];

  return data;
};
