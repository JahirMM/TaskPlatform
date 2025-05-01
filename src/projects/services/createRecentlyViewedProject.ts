import { supabase } from "@/common/utils/supabase";
import { toast } from "sonner";

export const createRecentlyViewedProjectService = async (
  projectId: string,
  user_id: string
) => {
  const { data, error } = await supabase.rpc("upsert_recently_viewed_project", {
    p_user_id: user_id,
    p_project_id: projectId,
  });

  if (error) {
    toast.error("Error al insertar o actualizar el proyecto como visto recientemente");
    console.error(error);
    return;
  }

  return data;
};
