import { ChangeEvent, memo, useState, useEffect } from "react";

import TaskDetailsFormSkeleton from "@/board/skeletons/TaskDetailsFormSkeleton";

import { useUpdateTaskDetails } from "@/board/hook/useUpdateTaskDetails";
import { useGetTask } from "@/board/hook/useGetTask";

import { CommentsSection } from "@/board/components/CommentsSection";
import PriorityButtons from "@/board/components/PriorityButtons";

import { TaskInterface } from "@/board/interfaces/taskInterface";

interface TaskDetailsFormProps {
  taskId: string;
  onTaskUpdated: (updatedTask: TaskInterface) => void;
}

function TaskDetailsForm({ taskId, onTaskUpdated }: TaskDetailsFormProps) {
  const mutationUpdateTask = useUpdateTaskDetails();
  const { data: task, isLoading, isError } = useGetTask(taskId);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleTitleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (title.length <= 100) {
      setTitle(e.target.value);
      return;
    }

    e.target.style.height = "auto";
    e.target.style.height = e.target.scrollHeight + "px";
  };

  const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (description.length <= 700) {
      setDescription(e.target.value);
      return;
    }
  };

  const updateTask = async (select: "DESCRIPTION" | "TITLE") => {
    if (!task || task.length === 0) return;

    const commonInformation = {
      taskId: task[0].id,
      columnId: task[0].column_id,
    };

    let updateData;

    if (select === "TITLE") {
      if (title.trim().length === 0) return;
      updateData = { title };
    } else if (select === "DESCRIPTION") {
      updateData = {
        description: description.trim() === "" ? null : description,
      };
    } else {
      return;
    }

    try {
      const updatedTask = await mutationUpdateTask.mutateAsync({
        ...commonInformation,
        ...updateData,
      });

      if (updatedTask) {
        onTaskUpdated(updatedTask[0]);
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  useEffect(() => {
    if (task && task.length > 0) {
      setTitle(task[0].title);
      setDescription(task[0].description ?? "");
    }
  }, [task]);

  if (isLoading) {
    return <TaskDetailsFormSkeleton />;
  }

  if (isError || !task || task.length === 0) {
    return (
      <div className="p-4 text-center text-red-400">
        Error al cargar los datos de la tarea
      </div>
    );
  }

  return (
    <form className="">
      <section className="flex flex-col items-start gap-7 md:flex-row">
        <textarea
          onBlur={() => updateTask("TITLE")}
          className="w-full min-h-[44px] px-3 py-2 overflow-hidden text-lg text-left text-white border rounded-lg outline-none resize-none border-bg-primary bg-bg-primary focus:border-action focus:ring-1 focus:ring-action"
          placeholder="Ingrese un titulo"
          value={title}
          onChange={(e) => handleTitleChange(e)}
          rows={1}
        />

        <PriorityButtons task={task[0]} onTaskUpdated={onTaskUpdated} />
      </section>
      <section className="mt-5">
        <label htmlFor="" className="block mb-4 text-sm text-white">
          Descripción
        </label>
        <textarea
          name="description"
          onBlur={() => updateTask("DESCRIPTION")}
          onChange={(e) => handleDescriptionChange(e)}
          className="w-full px-3 py-2 text-sm text-left text-white border rounded-lg outline-none resize-none h-52 border-action bg-bg-secondary focus:border-action-hover focus:ring-1 focus:ring-action-hover"
          placeholder="Ingrese una Descripción"
          value={description}
        />
      </section>
      <CommentsSection taskId={taskId} />
    </form>
  );
}

export default memo(TaskDetailsForm);
