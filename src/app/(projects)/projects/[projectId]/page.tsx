"use client";

import KanbanBoard from "@/board/components/KanbanBoard";
import { useProjectId } from "@/board/hook/useGetProjectIs";

function Page() {
  const projectId = useProjectId();

  return projectId ? (
    <KanbanBoard projectId={projectId} />
  ) : (
    <div>ProjectId no encontrado</div>
  );
}

export default Page;
