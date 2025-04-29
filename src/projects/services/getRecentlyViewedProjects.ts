import { RecentlyViewedProjectInterface } from "@/projects/interfaces/recentlyViewedProjectInterface";
import { getUser } from "@/common/services/getUser";
import { supabase } from "@/common/utils/supabase";

export const getRecentlyViewedProjects = async (): Promise<
  RecentlyViewedProjectInterface[]
> => {
  const user = await getUser();

  const { data, error } = await supabase
    .from("recently_viewed_projects")
    .select(
      "id, project_id, last_viewed_at, projects(name, description, created_at)"
    )
    .eq("user_id", user.id)
    .order("last_viewed_at", { ascending: false });

  if (error) throw new Error(error.message);
  if (!data) return [];

  return data.map((item) => ({
    id: item.id,
    project_id: item.project_id,
    last_viewed_at: item.last_viewed_at,
    project: {
      name: item.projects.name,
      description: item.projects.description,
      created_at: item.projects.created_at,
    },
  }));
};
