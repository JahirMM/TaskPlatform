import { UserInterface } from "@/common/interfaces/userInterface";
import { supabase } from "@/common/utils/supabase";

export const getUserByIdService = async (userId: string): Promise<UserInterface> => {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};
