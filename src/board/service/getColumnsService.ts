import { ColumnInterface } from "@/board/interfaces/columnInterface";
import { supabase } from "@/common/utils/supabase";

export const getColumnsService = async (
  projectId: string
): Promise<ColumnInterface[]> => {
  const { data, error } = await supabase
    .from("columns")
    .select("*")
    .eq("project_id", projectId)
    .order("position", { ascending: true });

  if (error) throw new Error(error.message);
  if (!data) return [];

  return data;
};
