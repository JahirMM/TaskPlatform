import { supabase } from "./supabase";

const getSession = async () => {
  return await supabase.auth
    .getSession()
    .then(({ data: { session } }) => session)
    .catch((error) => {
      console.error("Error obteniendo la sesión:", error);
      return null;
    });
};

export default getSession;
