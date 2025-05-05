import CreateProjectButton from "@/projects/components/CreateProjectButton";
import { usePathname } from "next/navigation";
import { useState } from "react";

interface CreateProjectFormProps {
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
  userId: string;
}

function CreateProjectForm({ setShowForm, userId }: CreateProjectFormProps) {
  const pathname = usePathname();

  const [descriptionValue, setDescriptionValue] = useState("");
  const [nameValue, setNameValue] = useState("");

  const handleRefName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= 70) {
      setNameValue(value);
    }
  };

  const handleRefDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= 400) {
      setDescriptionValue(value);
    }
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
            value={nameValue}
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
            value={descriptionValue}
            placeholder="descripción del proyecto"
            onChange={handleRefDescription}
            className="px-3 py-2 text-sm text-white border rounded-lg resize-none h-52 border-action focus:border-action-hover focus:outline focus:outline-action-hover"
            required
          ></textarea>
        </div>

        <CreateProjectButton
          setShowForm={setShowForm}
          projectDescription={descriptionValue}
          projectName={nameValue}
          pathname={pathname}
          userId={userId}
        />
      </form>
    </section>
  );
}

export default CreateProjectForm;
