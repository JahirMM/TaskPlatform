import { supabase } from "@/utils/supabase";

function SignOutButton() {
  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };
  return (
    <button
      type="button"
      className="px-5 py-2 text-sm font-medium text-center text-white border rounded-lg hover:text-white border-action hover:bg-action focus:ring-4 focus:outline-none focus:ring-action-hover"
      onClick={handleSignOut}
    >
      Cerrar sesión
    </button>
  );
}

export default SignOutButton;
