"use client";

import SignInAuthButton from "@/auth/components/SignInAuthButton";
import SignOutButton from "@/auth/components/SignOutButton";

import { useAuth } from "@/auth/context/AuthContext";

export function AuthButtons() {
    const { user } = useAuth();
  return <div>{user ? <SignOutButton /> : <SignInAuthButton />}</div>;
}
