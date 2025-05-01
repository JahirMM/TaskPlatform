import { ProjectInterface } from "@/projects/interfaces/projectInterface";
import { supabase } from "@/common/utils/supabase";

export const getProjectsService = async (userId: string): Promise<ProjectInterface[]> => {
  const [ownedRes, invitedRes] = await Promise.all([
    supabase
      .from("projects")
      .select("*")
      .eq("owner_id", userId)
      .order("created_at", { ascending: false }),

    supabase
      .from("project_members")
      .select("project:projects(*)")
      .eq("user_id", userId),
  ]);

  if (ownedRes.error) throw new Error("Error al obtener los proyectos");
  if (invitedRes.error) throw new Error("Error al obtener los proyectos invitados");

  const ownedProjects = ownedRes.data ?? [];
  const invitedProjects = invitedRes.data?.map((inv) => inv.project) ?? [];

  return [...ownedProjects, ...invitedProjects].sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
};
