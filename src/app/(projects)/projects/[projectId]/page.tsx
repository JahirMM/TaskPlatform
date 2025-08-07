"use client";

import ProjectContent from "@/board/components/ProjectContent";
import { useAuth } from "@/auth/context/AuthContext";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

function Page() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/");
    }
  }, [user, loading, router]);

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

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] bg-gradient-to-br from-dark-blue to-dark-purple p-4">
        <div className="max-w-md text-center">
          <div className="w-20 h-20 mx-auto mb-6 border-4 border-gray-300 rounded-full animate-spin border-t-action"></div>
          <h2 className="mb-2 text-2xl font-bold text-white">Redirigiendo</h2>
          <p className="text-gray-300">
            Estamos llevándote a la página adecuada...
          </p>
        </div>
      </div>
    );
  }

  return <ProjectContent />;
}

export default Page;
