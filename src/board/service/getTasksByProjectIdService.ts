import { TaskInterface } from "@/board//interfaces/taskInterface";
import { supabase } from "@/common/utils/supabase";

export const getTasksByProjectIdService = async (
  projectId: string
): Promise<TaskInterface[]> => {
  const { data, error } = await supabase
    .from("tasks")
    .select("*, columns!inner(project_id)")
    .eq("columns.project_id", projectId)
    .order("position", { ascending: true });

  if (error) throw new Error(error.message);
  if (!data) return [];

  return data;
};
