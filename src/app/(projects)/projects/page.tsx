import RecentlyViewedProjects from "@/projects/components/RecentlyViewedProjects";
import ProjectList from "@/projects/components/ProjectList";

function Page() {
  return (
    <div className="px-10 mx-auto lg:container lg:px-16 xl:px-40">
      <RecentlyViewedProjects />
      <ProjectList />
    </div>
  );
}

export default Page;
