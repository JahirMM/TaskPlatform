"use client";

import CreateProjectButton from "@/projects/components/CreateProjectButton";
import ProjectItem from "@/projects/components/ProjectItem";

import { useGetProjects } from "@/projects/hooks/useGetProjects";

function ProjectList() {
  const { projects, error, loading } = useGetProjects();

  if (error) return <p>Error: {error}</p>;

  return (
    <section aria-labelledby="workspaces">
      <header className="flex flex-col justify-between gap-8 mb-8 sm:flex-row sm:items-center sm:gap-0">
        <h2
          id="workspaces"
          className="text-lg font-semibold text-white sm:text-xl"
        >
          Tus espacios de trabajo
        </h2>
        <input
          type="search"
          placeholder="Buscar proyecto"
          className="px-3 py-2 text-sm text-white border border-action rounded-xl focus:border-action-hover focus:outline focus:outline-action-hover sm:w-72 lg:w-96"
          aria-label="Buscar proyecto"
        />
      </header>
      <div className="grid grid-cols-1 gap-8 place-items-center md:grid-cols-2 xl:grid-cols-3">
        <CreateProjectButton />
        {loading ? (
          <div>cargando</div>
        ) : (
          projects.map(({ id, name, created_at }) => (
            <ProjectItem
              key={id}
              id={id}
              name={name}
              created_at={created_at}
            />
          ))
        )}
      </div>
    </section>
  );
}

export default ProjectList;
