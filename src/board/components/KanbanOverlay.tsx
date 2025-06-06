import { ColumnInterface } from "@/board/interfaces/columnInterface";
import { TaskInterface } from "@/board/interfaces/taskInterface";

import ColumnContainer from "@/board/components/ColumnContainer";

interface KanbanOverlayProps {
  activeColumn: ColumnInterface | null;
  activeTask: TaskInterface | null;
  tasks: TaskInterface[];
  projectId: string;
  createTask: (id: string, title: string) => Promise<void>;
  onTaskUpdated: (updatedTask: TaskInterface) => void;
}

export default function KanbanOverlay({
  activeColumn,
  activeTask,
  tasks,
  projectId,
  createTask,
  onTaskUpdated,
}: KanbanOverlayProps) {
  if (activeColumn)
    return (
      <ColumnContainer
        column={activeColumn}
        tasks={tasks.filter((t) => t.column_id === activeColumn.id)}
        createTask={createTask}
        projectId={projectId}
        onTaskUpdated={onTaskUpdated}
      />
    );

  if (activeTask)
    return (
      <div className="text-white text-sm bg-bg-primary p-2.5 h-[100px] min-h-[100px] flex text-left rounded-xl ring-2 ring-gray-700">
        {activeTask.title}
      </div>
    );

  return null;
}
