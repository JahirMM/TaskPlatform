// src/utils/supabase/server.ts
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export const createServerSupabaseClient = async () => {
  const cookieStore = await cookies();

  const cookieAdapter = {
    get: (name: string) => cookieStore.get(name),
    // Devuelve todas las cookies.
    getAll: () => cookieStore.getAll(),
    set: (name: string, value: string, options?: { [key: string]: any }) =>
      cookieStore.set(name, value, options),
    setAll: (
      cookiesArray: Array<{
        name: string;
        value: string;
        options?: { [key: string]: any };
      }>
    ) => {
      cookiesArray.forEach((cookie) => {
        cookieStore.set(cookie.name, cookie.value, cookie.options);
      });
    },
    remove: (name: string) => {
      cookieStore.set(name, "", { maxAge: -1 });
    },
  };

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: cookieAdapter,
    }
  );
};
