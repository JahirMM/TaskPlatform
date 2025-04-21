"use client";

import SignInAuthButton from "@/auth/components/SignInAuthButton";
import SignOutButton from "@/auth/components/SignOutButton";

import useAuthListener from "../hook/useAuthListener";

export function AuthButtons() {
  const user = useAuthListener();
  return <div>{user ? <SignOutButton /> : <SignInAuthButton />}</div>;
}
