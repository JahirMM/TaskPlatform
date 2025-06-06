import { useState } from "react";

import FormCreateTask from "@/board/components/FormCreateTask";
import Modal from "@/common/components/Modal";

import PlusIcon from "@/icons/PlusIcon";

interface AddTaskButtonProps {
  createTask: (id: string, title: string) => Promise<void>;
  columnId: string;
}

export default function AddTaskButton({
  createTask,
  columnId,
}: AddTaskButtonProps) {
  const [showCreateTaskForm, setShowCreateTaskForm] = useState(false);

  const handleCloseForm = () => {
    setShowCreateTaskForm((showCreateTaskForm) => !showCreateTaskForm);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setShowCreateTaskForm(!showCreateTaskForm)}
        className="flex items-center gap-3 p-3 transition-colors duration-500 border-4 rounded-lg cursor-pointer border-bg-column hover:bg-surface group"
      >
        <PlusIcon className="font-bold text-action size-3 group-hover:text-action-hover" />
        <span className="text-sm font-bold text-action group-hover:text-action-hover">
          crear tarea
        </span>
      </button>
      {showCreateTaskForm && (
        <Modal title="Crear Tarea" onClose={handleCloseForm}>
          <FormCreateTask createTask={createTask} columnId={columnId} setShowCreateTaskForm={setShowCreateTaskForm}/>
        </Modal>
      )}
    </>
  );
}
