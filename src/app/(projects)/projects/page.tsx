"use client";

import RecentlyViewedProjects from "@/projects/components/RecentlyViewedProjects";
import ProjectList from "@/projects/components/ProjectList";
import { useAuth } from "@/auth/context/AuthContext";
import { redirect } from "next/navigation";

function Page() {
  const { user } = useAuth();

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
