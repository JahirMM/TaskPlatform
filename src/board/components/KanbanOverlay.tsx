import ColumnContainer from "@/board/components/ColumnContainer";
import { ColumnInterface } from "@/board/interfaces/columnInterface";
import { TaskInterface } from "@/board/interfaces/taskInterface";

interface KanbanOverlayProps {
  activeColumn: ColumnInterface | null;
  activeTask: TaskInterface | null;
  tasks: TaskInterface[];
  projectId: string;
  createTask: (id: string) => Promise<void>;
}

export default function KanbanOverlay({
  activeColumn,
  activeTask,
  tasks,
  projectId,
  createTask,
}: KanbanOverlayProps) {
  if (activeColumn)
    return (
      <ColumnContainer
        column={activeColumn}
        tasks={tasks.filter((t) => t.column_id === activeColumn.id)}
        createTask={createTask}
        projectId={projectId}
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
