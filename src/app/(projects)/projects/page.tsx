"use client";

import RecentlyViewedProjects from "@/projects/components/RecentlyViewedProjects";
import ProjectList from "@/projects/components/ProjectList";
import { useAuth } from "@/auth/context/AuthContext";
import { redirect } from "next/navigation";

function Page() {
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

  if (!user) {
    redirect("/");
  }

  return (
    <div className="px-10 mx-auto lg:container lg:px-16 xl:px-40">
      <RecentlyViewedProjects user_id={user.id} />
      <ProjectList user_id={user.id} />
    </div>
  );
}

export default Page;
