import { supabase } from "@/common/utils/supabase";

interface RequestInterface {
  project_id: string;
  user_id: string;
}

export const addProjectMemberService = async (request: RequestInterface) => {
  const { error } = await supabase.from("project_members").insert([request]);

  if (error) {
    throw new Error(error.message);
  }
};
