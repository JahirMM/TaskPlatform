import { UserInterface } from "@/common/interfaces/userInterface";
import { supabase } from "@/common/utils/supabase";

export const getUsersService = async (
  text: string
): Promise<UserInterface[]> => {
  if (!text.trim()) return [];

  const searchTerm = `%${text}%`;

  const { data, error } = await supabase
    .from("users")
    .select("*")
    .or(`name.ilike.${searchTerm},user_name.ilike.${searchTerm}`);

  if (error) {
    throw new Error("Error al traer los usuarios");
  }

  return data || [];
};
