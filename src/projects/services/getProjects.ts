import { ProjectInterface } from "@/projects/interfaces/projectInterface";
import { getUser } from "@/common/services/getUser";
import { supabase } from "@/utils/supabase";

export const getProjects = async (): Promise<ProjectInterface[]> => {
  const user = await getUser();

  const { data: ownedProjects, error: ownedError } = await supabase
    .from("projects")
    .select("*")
    .eq("owner_id", user.id);

  if (ownedError) throw new Error(ownedError.message);

  const { data: invitedProjects, error: invitedError } = await supabase
    .from("project_members")
    .select(
      `
      project:projects(*)
    `
    )
    .eq("user_id", user.id);

  if (invitedError) throw new Error(invitedError.message);

  const projectsFromInvitations =
    invitedProjects?.map((inv) => inv.project) || [];

  const allProjects = [...(ownedProjects || []), ...projectsFromInvitations];

  return allProjects;
};
