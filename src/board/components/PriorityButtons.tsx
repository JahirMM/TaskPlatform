import { useState } from "react";

import { useUpdateTaskDetails } from "@/board/hook/useUpdateTaskDetails";
import { TaskInterface } from "@/board/interfaces/taskInterface";

const priorityMap = {
  Alto: "high",
  Medio: "medium",
  Baja: "low",
} as const;

interface PriorityButtonsProps {
  task: TaskInterface;
  onTaskUpdated: (updatedTask: TaskInterface) => void;
}

function PriorityButtons({ task, onTaskUpdated }: PriorityButtonsProps) {
  const mutationUpdateTask = useUpdateTaskDetails();

  const [priority, setPriority] = useState<"Alto" | "Medio" | "Baja" | null>(
    () => {
      switch (task.priority) {
        case "high":
          return "Alto";
        case "medium":
          return "Medio";
        case "low":
          return "Baja";
        default:
          return null;
      }
    }
  );

  const handlePriorityChange = async (
    newPriority: "Alto" | "Medio" | "Baja"
  ) => {
    setPriority(newPriority);

    if (!task) return;

    try {
      const englishPriority = priorityMap[newPriority];
      const updatedTask = await mutationUpdateTask.mutateAsync({
        taskId: task.id,
        columnId: task.column_id,
        priority: englishPriority,
      });

      if (updatedTask) {
        onTaskUpdated(updatedTask[0]);
      }
    } catch {
      if (task.priority) {
        switch (task.priority) {
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
  return (
    <div className="flex flex-col gap-2" role="group" aria-label="Seleccionar prioridad">
      <label className="text-sm font-medium text-gray-300">Prioridad</label>
      <div className="flex gap-2 md:flex-col">
        {(["Alto", "Medio", "Baja"] as const).map((item) => (
          <button
            key={item}
            type="button"
            aria-label={`Establecer prioridad ${item}`}
            title={`Prioridad ${item}`}
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
  );
}

export default PriorityButtons;
