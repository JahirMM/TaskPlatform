import OpenCreateProjectModalButton from "@/projects/components/OpenCreateProjectModalButton";
import CreateProjectForm from "@/projects/components/CreateProjectForm";
import FilterProjects from "@/projects/components/FilterProjects";
import ProjectItem from "@/projects/components/ProjectItem";
import Modal from "@/common/components/Modal";

import { useGetProjects } from "@/projects/hooks/useGetProjects";

import { useState } from "react";

function ProjectList({ user_id }: { user_id: string }) {
  const { data: projects, isError, isLoading } = useGetProjects(user_id);
  const [showForm, setShowform] = useState(false);

  const [filterType, setFilterType] = useState<"all" | "owned" | "invited">("all");
  const [searchTerm, setSearchTerm] = useState("");

  const handleCloseForm = () => {
    setShowform((showForm) => !showForm);
  };

  const filteredProjects = projects?.filter((project) => {
    const matchesSearch = project.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const isOwned = project.owner_id === user_id;
    const isInvited = project.owner_id !== user_id;

    const matchesType =
      filterType === "all" ||
      (filterType === "owned" && isOwned) ||
      (filterType === "invited" && isInvited);

    return matchesSearch && matchesType;
  });

  return (
    <>
      <section aria-labelledby="workspaces" className="mt-20">
        <header className="flex flex-col justify-between gap-4 mb-8 sm:flex-row sm:items-center sm:gap-10">
          <h2
            id="workspaces"
            className="text-lg font-semibold text-white whitespace-nowrap md:text-xl"
          >
            Tus espacios de trabajo
          </h2>
          <FilterProjects
            filterType={filterType}
            searchTerm={searchTerm}
            setFilterType={setFilterType}
            setSearchTerm={setSearchTerm}
          />
        </header>

        {isError ? (
          <p className="text-red-500">Error al obtener los proyectos</p>
        ) : isLoading ? (
          <p className="text-white">Cargando...</p>
        ) : filteredProjects && filteredProjects.length === 0 ? (
          <p className="text-white">No se encontraron proyectos</p>
        ) : (
          <div className="grid grid-cols-1 gap-8 place-items-center md:grid-cols-2 xl:grid-cols-3">
            <OpenCreateProjectModalButton setShowForm={handleCloseForm} />
            {filteredProjects?.map(({ id, owner_id, name, created_at }) => (
              <ProjectItem
                key={id}
                id={id}
                user_id={user_id}
                owner_id={owner_id}
                name={name}
                created_at={created_at}
              />
            ))}
          </div>
        )}
      </section>

      {showForm && (
        <Modal title="Crear proyecto" onClose={handleCloseForm}>
          <CreateProjectForm setShowForm={setShowform} userId={user_id} />
        </Modal>
      )}
    </>
  );
}

export default ProjectList;
