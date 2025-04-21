"use client";

import { useEffect, useState } from "react";

import { User } from "@supabase/supabase-js";

import { supabase } from "@/utils/supabase";
import getSession from "@/utils/getSession";

export default function useAuthListener() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    getSession().then((session) => {
      setUser(session?.user ?? null);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  return user;
}
