import { ChangeEvent, useState, useRef, useEffect, memo } from "react";

import TaskDetailsFormSkeleton from "@/board/skeletons/TaskDetailsFormSkeleton";

import { useUpdateTaskDetails } from "@/board/hook/useUpdateTaskDetails";
import { useGetTask } from "@/board/hook/useGetTask";

import { CommentsSection } from "@/board/components/CommentsSection";

import { TaskInterface } from "@/board/interfaces/taskInterface";

interface TaskDetailsFormProps {
  taskId: string;
  onTaskUpdated: (updatedTask: TaskInterface) => void;
}

const priorityMap = {
  Alto: "high",
  Medio: "medium",
  Baja: "low",
} as const;

function TaskDetailsForm({ taskId, onTaskUpdated }: TaskDetailsFormProps) {
  const mutationUpdateTask = useUpdateTaskDetails();
  const { data: task, isLoading, isError } = useGetTask(taskId);

  const [priority, setPriority] = useState<"Alto" | "Medio" | "Baja" | null>(
    null
  );
  const titleRef = useRef<HTMLTextAreaElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);

  const handleTitleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length > 100) {
      e.target.value = e.target.value.slice(0, 100);
      return;
    }

    e.target.style.height = "auto";
    e.target.style.height = e.target.scrollHeight + "px";
  };

  const updateTask = async (select: "DESCRIPTION" | "TITLE") => {
    if (!task || task.length === 0) return;

    try {
      const commonInformation = {
        taskId: task[0].id,
        columnId: task[0].column_id,
      };

      let updateData;

      if (select === "TITLE") {
        if (!titleRef.current || titleRef.current.value.length <= 0) {
          if (titleRef.current) {
            titleRef.current.value = task[0].title;
          }
          return;
        } else {
          updateData = { title: titleRef.current.value };
        }
      } else if (select === "DESCRIPTION") {
        updateData = { description: descriptionRef.current ? descriptionRef.current.value : null };
      } else {
        return;
      }

      const updatedTask = await mutationUpdateTask.mutateAsync({
        ...commonInformation,
        ...updateData,
      });

      if (select === "TITLE") {
        if (updatedTask) {
          onTaskUpdated(updatedTask[0]);
        }
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handlePriorityChange = async (
    newPriority: "Alto" | "Medio" | "Baja"
  ) => {
    setPriority(newPriority);

    if (!task || task.length === 0) return;

    try {
      const englishPriority = priorityMap[newPriority];
      const updatedTask = await mutationUpdateTask.mutateAsync({
        taskId: task[0].id,
        columnId: task[0].column_id,
        priority: englishPriority,
      });

      if (updatedTask) {
        onTaskUpdated(updatedTask[0]);
      }
    } catch {
      if (task[0].priority) {
        switch (task[0].priority) {
          case "high":
            setPriority("Alto");
            break;
          case "medium":
            setPriority("Medio");
            break;
          case "low":
            setPriority("Baja");
            break;
        }
      }
    }
  };

  useEffect(() => {
    if (task && task.length > 0) {
      switch (task[0].priority) {
        case "high":
          setPriority("Alto");
          break;
        case "medium":
          setPriority("Medio");
          break;
        case "low":
          setPriority("Baja");
          break;
        default:
          setPriority(null);
      }
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
          ref={titleRef}
          className="w-full min-h-[44px] px-3 py-2 overflow-hidden text-lg text-left text-white border rounded-lg outline-none resize-none border-bg-primary bg-bg-primary focus:border-action focus:ring-1 focus:ring-action"
          placeholder="Ingrese un titulo"
          defaultValue={task[0].title}
          onChange={handleTitleChange}
          rows={1}
        />

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-300">Prioridad</label>
          <div className="flex gap-2 md:flex-col">
            {(["Alto", "Medio", "Baja"] as const).map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => handlePriorityChange(item)}
                className={`px-3 py-1 text-sm rounded-lg cursor-pointer transition-all border
          ${
            priority === item
              ? item === "Alto"
                ? "bg-red-500/10 text-red-400 border-red-400"
                : item === "Medio"
                ? "bg-yellow-500/10 text-yellow-400 border-yellow-400"
                : "bg-green-500/10 text-green-400 border-green-400"
              : "text-gray-300 border-gray-500 hover:border-action hover:text-action"
          }
        `}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </section>
      <section className="mt-5">
        <label htmlFor="" className="block mb-4 text-sm text-white">
          Descripción
        </label>
        <textarea
          ref={descriptionRef}
          name="description"
          onBlur={() => updateTask("DESCRIPTION")}
          className="w-full px-3 py-2 text-sm text-left text-white border rounded-lg outline-none resize-none h-52 border-action bg-bg-secondary focus:border-action-hover focus:ring-1 focus:ring-action-hover"
          placeholder="Ingrese una Descripción"
          defaultValue={task[0].description || ""}
        />
      </section>
      <CommentsSection />
    </form>
  );
}

export default memo(TaskDetailsForm);
