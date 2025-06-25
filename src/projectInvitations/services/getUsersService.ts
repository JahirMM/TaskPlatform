import { UserInterface } from "@/common/interfaces/userInterface";
import { supabase } from "@/common/utils/supabase";

export const getUsersService = async (
  text: string,
  projectId: string
): Promise<UserInterface[]> => {
  if (!text.trim()) return [];

  const searchTerm = `%${text}%`;

  // obtener el id del dueño del proyecto
  const { data: projectData, error: projectError } = await supabase
    .from("projects")
    .select("owner_id")
    .eq("id", projectId)
    .single();

  if (projectError || !projectData) {
    throw new Error("Error al obtener el owner del proyecto");
  }

  const ownerId = projectData.owner_id;

  // obtener los IDs del los miembros del poryecto
  const { data: memberData, error: memberError } = await supabase
    .from("project_members")
    .select("user_id")
    .eq("project_id", projectId);

  if (memberError) {
    throw new Error("Error al obtener los miembros del proyecto");
  }

  // agrupamos en una lista a todos los usuarios de los proyectos encontrados hasta ahora
  const excludedIds = [ownerId, ...memberData.map((m) => m.user_id)];

  // obtener usuarios filtrando por nombre/username y excluyendo owner + miembros
  const { data: usersData, error: usersError } = await supabase
    .from("users")
    .select("*")
    .not("id", "in", `(${excludedIds.join(",")})`)
    .or(`name.ilike.${searchTerm},user_name.ilike.${searchTerm}`);

  if (usersError) {
    throw new Error("Error al traer los usuarios");
  }

  return usersData || [];
};
