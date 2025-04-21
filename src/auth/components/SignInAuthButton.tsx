import { supabase } from "@/utils/supabase";

function SignInAuthButton() {
  const handleSignIn = async () => {
    await supabase.auth.signInWithOAuth({ provider: "github" });
  };

  return (
    <button
      onClick={handleSignIn}
      type="button"
      className="inline-flex items-center px-5 py-2 mb-2 text-sm font-medium text-center text-white rounded-lg bg-action hover:bg-action-hover focus:ring-4 focus:outline-none focus:ring-action-hover me-2"
    >
      Comenzar
    </button>
  );
}

export default SignInAuthButton;
