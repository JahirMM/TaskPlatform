"use client";

import OpenCreateProjectModalButton from "@/projects/components/OpenCreateProjectModalButton";
import CreateProjectForm from "@/projects/components/CreateProjectForm";
import ProjectItem from "@/projects/components/ProjectItem";

import Modal from "@/auth/components/Modal";

import { useGetProjects } from "@/projects/hooks/useGetProjects";
import { useState } from "react";

function ProjectList() {
  const { projects, error, loading, fetchProjects } = useGetProjects();

  const [showForm, setShowform] = useState(false);

  if (error) return <p>Error: {error}</p>;

  const handleCloseForm = () => {
    setShowform((showForm) => !showForm);
  };

  return (
    <>
      <section aria-labelledby="workspaces" className="mt-20">
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
          <OpenCreateProjectModalButton setShowForm={handleCloseForm} />
          {loading ? (
            <div>cargando</div>
          ) : (
            projects.map(({ id, name, created_at }) => (
              <ProjectItem
                key={id}
                id={id}
                name={name}
                created_at={created_at}
                fetchProjects={fetchProjects}
              />
            ))
          )}
        </div>
      </section>
      {showForm && (
        <Modal title="Crear proyecto" onClose={handleCloseForm}>
          <CreateProjectForm
            setShowForm={setShowform}
            fetchProjects={fetchProjects}
          />
        </Modal>
      )}
    </>
  );
}

export default ProjectList;
