import { UserInterface } from "@/common/interfaces/userInterface";
import { supabase } from "@/common/utils/supabase";

export const getProjectMembersService = async (
  projectId: string
): Promise<{ users: UserInterface[]; ownerId: string | null }> => {
  // obtener dueño del proyecto
  const { data: project, error: projectError } = await supabase
    .from("projects")
    .select("owner_id")
    .eq("id", projectId)
    .single();

  if (projectError || !project) {
    throw new Error("Error al obtener el dueño del proyecto");
  }

  const ownerId = project.owner_id ?? null;

  // obtener miembros del proyecto
  const { data: members, error: membersError } = await supabase
    .from("project_members")
    .select("user_id")
    .eq("project_id", projectId);

  if (membersError) {
    throw new Error("Error al obtener los miembros del proyecto");
  }

  // unimos los IDs (owner + miembros)
  const userIds = [ownerId, ...members.map((m) => m.user_id)].filter(Boolean);

  // obtener todos los usuarios relacionados
  const { data: users, error: usersError } = await supabase
    .from("users")
    .select("*")
    .in("id", userIds);

  if (usersError) {
    throw new Error("Error al traer los usuarios del proyecto");
  }

  return {
    users: users || [],
    ownerId,
  };
};
