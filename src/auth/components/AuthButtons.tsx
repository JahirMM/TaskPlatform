"use client";

import SignInAuthButton from "@/auth/components/SignInAuthButton";
import SignOutButton from "@/auth/components/SignOutButton";

import { useAuth } from "@/auth/context/AuthContext";

export function AuthButtons() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div
        className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] bg-gradient-to-br from-dark-blue to-dark-purple p-4"
        aria-busy="true"
        aria-live="polite"
      >
        <div className="w-20 h-20 mx-auto mb-6 border-4 border-gray-300 rounded-full animate-spin border-t-action"></div>
      </div>
    );
  }

  return <div>{user ? <SignOutButton /> : <SignInAuthButton />}</div>;
}
