import { ProjectInterface } from "@/projects/interfaces/projectInterface";
import { getUser } from "@/common/services/getUser";
import { supabase } from "@/common/utils/supabase";

export const getProjects = async (): Promise<ProjectInterface[]> => {
  const user = await getUser();

  const [ownedRes, invitedRes] = await Promise.all([
    supabase
      .from("projects")
      .select("*")
      .eq("owner_id", user.id)
      .order("created_at", { ascending: false }),

    supabase
      .from("project_members")
      .select("project:projects(*)")
      .eq("user_id", user.id),
  ]);

  if (ownedRes.error) throw new Error(ownedRes.error.message);
  if (invitedRes.error) throw new Error(invitedRes.error.message);

  const ownedProjects = ownedRes.data ?? [];
  const invitedProjects = invitedRes.data?.map((inv) => inv.project) ?? [];

  return [...ownedProjects, ...invitedProjects].sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
};
