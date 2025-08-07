"use client";

import KanbanHeader from "@/board/components/KanbanHeader";
import KanbanBoard from "@/board/components/KanbanBoard";

import { useGetProject } from "@/projects/hooks/useGetProject";
import { useProjectId } from "@/board/hook/useGetProjectIs";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

function Page() {
  const projectId = useProjectId();
  const { data: project, isLoading, isError } = useGetProject(projectId!);

  const router = useRouter();

  useEffect(() => {
    if (isError) {
      // TODO: poner la ruta de error
      router.push("/");
    } else if (!isLoading && !project) {
      router.push("/not_found");
    }
  }, [isError, isLoading, project, router]);

  if (isError) {
    return <div>Redirigiendo...</div>;
  }

  if (!isLoading && !project) {
    return <div>Redirigiendo...</div>;
  }

  if (!projectId) {
    return <div>ProjectId no encontrado</div>;
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-40">
        <div className="w-10 h-10 border-4 border-gray-300 rounded-full animate-spin border-t-action"></div>
      </div>
    );
  }

  return (
    <>
      <KanbanHeader project={project!} />
      <KanbanBoard projectId={projectId} />
    </>
  );
}

export default Page;
