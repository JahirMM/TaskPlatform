import { UserInterface } from "@/common/interfaces/userInterface";
import useAuthListener from "@/auth/hook/useAuthListener";
import { supabase } from "@/utils/supabase";

export const getUser = async (): Promise<UserInterface> => {
  const user = useAuthListener();
  if (!user?.id) {
    throw new Error("No se encontró un ID de usuario válido.");
  }

  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", user?.id);
  if (error) throw new Error(error.message);
  if (!data)  throw new Error("No se encontró un usuario");;

  return data[0];
};
