"use client";

import { supabase } from "@/utils/supabase";

function SignInAuthButton() {
  const handleSignIn = async () => {
    await supabase.auth.signInWithOAuth({ provider: "github" });
  };

  return (
    <button
      onClick={handleSignIn}
      className="border border-gray-600 p-3 cursor-pointer"
    >
      Sign In
    </button>
  );
}

export default SignInAuthButton;
