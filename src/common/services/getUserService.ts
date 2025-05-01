import { UserInterface } from "@/common/interfaces/userInterface";
import { supabase } from "@/common/utils/supabase";
import getSession from "@/common/utils/getSession";

export const getUserService = async (): Promise<UserInterface> => {
  const session = await getSession();

  if (!session || !session.user.id) {
    throw new Error("No authenticated user");
  }

  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", session.user.id)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};
