"use client";

import RecentlyViewedProjects from "@/projects/components/RecentlyViewedProjects";
import ProjectList from "@/projects/components/ProjectList";
import { getUser } from "@/common/services/getUser";
import { useEffect, useState } from "react";

function Page() {
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await getUser();
      setUserId(userData.id);
    };

    fetchUser();
  }, []);

  return (
    <div className="px-10 mx-auto lg:container lg:px-16 xl:px-40">
      <RecentlyViewedProjects user_id={userId} />
      <ProjectList user_id={userId} />
    </div>
  );
}

export default Page;
