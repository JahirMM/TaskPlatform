import { ProjectInterface } from "@/projects/interfaces/projectInterface";

import InvitationForm from "@/projectInvitations/components/InvitationForm";
import Modal from "@/common/components/Modal";

import { useState } from "react";

interface KanbanHeaderProps {
  project: ProjectInterface;
}

function KanbanHeader({ project }: KanbanHeaderProps) {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <section className="flex flex-col justify-between gap-4 px-10 my-10 sm:flex-row">
        <h2 className="text-xl font-semibold text-white">{project.name}</h2>

        <div className="">
          <button
            type="button"
            onClick={() => setShowForm((showForm) => !showForm)}
            className="text-sm cursor-pointer text-white bg-action/90 hover:bg-action-hover focus:ring-4 focus:ring-action font-medium rounded-lg px-5 py-2.5 me-2 mb-2 focus:outline-none"
          >
            Compartir
          </button>
        </div>
      </section>
      {showForm && (
        <Modal title="Compartir proyecto" onClose={() => setShowForm((showForm) => !showForm)}>
          <InvitationForm projectId={project.id}/>
        </Modal>
      )}
    </>
  );
}

export default KanbanHeader;
