import { supabase } from "@/common/utils/supabase";

interface ProjectRequestInterface {
  name: string;
  description: string;
  owner_id: string;
}

export const createProjectService = async (
  request: ProjectRequestInterface
) => {
  const { data, error } = await supabase.from("projects").insert([request]);

  if (error) {
    throw new Error("Error al crear proyecto");
  }

  return data;
};
