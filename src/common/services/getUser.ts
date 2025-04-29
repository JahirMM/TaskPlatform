import { UserInterface } from "@/common/interfaces/userInterface";
import { supabase } from "@/common/utils/supabase";
import getSession from "@/common/utils/getSession";

export const getUser = async (): Promise<UserInterface> => {
  const session = await getSession();

  if (!session || !session.user.id) {
    throw new Error("No se encontró un ID de usuario válido.");
  }

  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", session.user.id);
  if (error) throw new Error(error.message);
  if (!data) throw new Error("No se encontró un usuario");

  return data[0];
};
