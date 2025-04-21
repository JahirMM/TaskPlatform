"use client";

import { useEffect, useState } from "react";

import SignInAuthButton from "@/auth/components/SignInAuthButton";
import SignOutButton from "@/auth/components/SignOutButton";

import { User } from "@supabase/supabase-js";

import { supabase } from "@/utils/supabase";
import getSession from "@/utils/getSession";

export function AuthButtons() {
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

  return (
    <div>
      {user ? <SignOutButton setUser={setUser} /> : <SignInAuthButton />}
    </div>
  );
}
