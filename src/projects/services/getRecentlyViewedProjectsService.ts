import { RecentlyViewedProjectInterface } from "@/projects/interfaces/recentlyViewedProjectInterface";
import { supabase } from "@/common/utils/supabase";

export const getRecentlyViewedProjectsService = async (
  userId: string
): Promise<RecentlyViewedProjectInterface[]> => {
  const { data, error } = await supabase
    .from("recently_viewed_projects")
    .select(
      "id, project_id, last_viewed_at, projects(owner_id, name, description, created_at)"
    )
    .eq("user_id", userId)
    .order("last_viewed_at", { ascending: false });

  if (error) throw new Error(error.message);
  if (!data) return [];

  return data.map((item) => ({
    id: item.id,
    project_id: item.project_id,
    last_viewed_at: item.last_viewed_at,
    project: {
      owner_id: item.projects.owner_id,
      name: item.projects.name,
      description: item.projects.description,
      created_at: item.projects.created_at,
    },
  }));
};
