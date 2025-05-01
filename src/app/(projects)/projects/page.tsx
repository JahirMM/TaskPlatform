"use client";

import RecentlyViewedProjects from "@/projects/components/RecentlyViewedProjects";
import ProjectList from "@/projects/components/ProjectList";
import { useGetUser } from "@/common/hooks/useGetUser";
import { redirect } from "next/navigation";

function Page() {
  const { data, isError, error } = useGetUser();

  if (
    isError &&
    error instanceof Error &&
    error.message === "No authenticated user"
  ) {
    redirect("/");
  }

  if (!data) return null;

  return (
    <div className="px-10 mx-auto lg:container lg:px-16 xl:px-40">
      <RecentlyViewedProjects user_id={data.id} />
      <ProjectList user_id={data.id} />
    </div>
  );
}

export default Page;
