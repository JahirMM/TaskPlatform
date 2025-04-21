import { User } from "@supabase/supabase-js";
import { supabase } from "@/utils/supabase";

function SignOutButton({
  setUser,
}: {
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}) {
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };
  return (
    <button
      onClick={handleSignOut}
      className="border border-gray-600 p-3 cursor-pointer"
    >
      Sign Out
    </button>
  );
}

export default SignOutButton;
