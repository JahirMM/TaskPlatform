import CreateProjectButton from "@/projects/components/CreateProjectButton";
import { useRef } from "react";

interface CreateProjectFormProps {
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
  fetchProjects: () => Promise<void>;
}

function CreateProjectForm({
  setShowForm,
  fetchProjects,
}: CreateProjectFormProps) {
  const refName = useRef<string>("");
  const refDescription = useRef<string>("");

  const handleRefName = (e: React.ChangeEvent<HTMLInputElement>) => {
    refName.current = e.target.value;
  };

  const handleRefDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();
    refDescription.current = e.target.value;
  };

  return (
    <section aria-labelledby="create-project-heading" className="w-full">
      <h2 id="create-project-heading" className="sr-only">
        Crear nuevo proyecto
      </h2>
      <form className="flex flex-col gap-10">
        <div className="flex flex-col gap-3">
          <label htmlFor="project-name" className="text-sm text-white">
            Nombre del proyecto
          </label>
          <input
            id="project-name"
            name="projectName"
            type="text"
            placeholder="nombre del proyecto"
            onChange={handleRefName}
            className="px-3 py-2 text-sm text-white border rounded-lg border-action focus:border-action-hover focus:outline focus:outline-action-hover"
            required
          />
        </div>

        <div className="flex flex-col gap-3">
          <label htmlFor="project-description" className="text-sm text-white">
            Descripción del proyecto
          </label>
          <textarea
            id="project-description"
            name="projectDescription"
            placeholder="descripción del proyecto"
            onChange={handleRefDescription}
            className="px-3 py-2 text-sm text-white border rounded-lg resize-none h-52 border-action focus:border-action-hover focus:outline focus:outline-action-hover"
            required
          ></textarea>
        </div>

        <CreateProjectButton
          projectNameRef={refName}
          projectDescriptionRef={refDescription}
          fetchProjects={fetchProjects}
          setShowForm={setShowForm}
        />
      </form>
    </section>
  );
}

export default CreateProjectForm;
