import { supabase } from "./supabase";

const getSession = () => {
  return supabase.auth
    .getSession()
    .then(({ data: { session } }) => session)
    .catch((error) => {
      console.error("Error obteniendo la sesión:", error);
      return null;
    });
};

export default getSession;
