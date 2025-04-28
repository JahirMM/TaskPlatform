import { getUser } from "@/common/services/getUser";
import { supabase } from "@/utils/supabase";

interface ProjectRequestInterface {
  name: string;
  description: string;
}

export const createProject = async (request: ProjectRequestInterface) => {
  const user = await getUser();

  if (!user || !user.id) {
    throw new Error("Usuario no autenticado");
  }

  const projectRequest = {
    ...request,
    owner_id: user.id,
  };

  const { data, error } = await supabase
    .from("projects")
    .insert([projectRequest]);

  if (error) {
    throw new Error(`Error al crear proyecto: ${error.message}`);
  }

  return data;
};
