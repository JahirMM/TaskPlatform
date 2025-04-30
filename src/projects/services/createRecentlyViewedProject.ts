import { supabase } from "@/common/utils/supabase";
import { toast } from "sonner";

export const createRecentlyViewedProjectService = async (
  projectId: string,
  user_id: string
) => {
  const { data, error } = await supabase
    .from("recently_viewed_projects")
    .insert([{ user_id: user_id, project_id: projectId }]);

  if (error) {
    toast.error("Error al insertar el proyecto como visto recientemente");
    return;
  }

  return data;
};
