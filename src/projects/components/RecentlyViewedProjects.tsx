"use client";

import { useRecentlyViewedProjects } from "@/projects/hooks/useRecentlyViewedProjects";
import ProjectItem from "@/projects/components/ProjectItem";
import ClockIcon from "@/icons/ClockIcon";

function RecentlyViewedProjects({ user_id }: { user_id: string }) {
  const { projects, loading, error, fetchRecentlyViewedProjects } =
    useRecentlyViewedProjects(true);

  if (error) return <p>Error: {error}</p>;
  if (projects.length === 0) return null;

  return (
    <section aria-labelledby="recently-viewed" className="mt-8 mb-24 sm:mt-16">
      <header className="flex items-center gap-4 mb-8">
        <ClockIcon className="text-white size-5" />
        <h2
          id="recently-viewed"
          className="text-lg font-semibold text-white sm:text-xl"
        >
          Visto recientemente
        </h2>
      </header>
      <div className="grid grid-cols-1 gap-8 place-items-center md:grid-cols-2 xl:grid-cols-3">
        {loading ? (
          <div>cargando..</div>
        ) : (
          projects.map(({ id, project_id, project }) => (
            <ProjectItem
              key={id}
              id={project_id}
              user_id={user_id}
              owner_id={project.owner_id}
              name={project.name}
              created_at={project.created_at}
              fetchRecentlyViewedProjects={fetchRecentlyViewedProjects}
            />
          ))
        )}
      </div>
    </section>
  );
}

export default RecentlyViewedProjects;
