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
      // TODO: Poner la ruta 404
      router.push("/");
    }
  }, [isError, isLoading, project, router]);

  if (isError || !project) return <div>Redirigiendo...</div>;

  return projectId ? (
    <>
      {isLoading ? (
        <div>Cargando...</div>
      ) : (
        <>
          <KanbanHeader project={project} />
          <KanbanBoard projectId={projectId} />
        </>
      )}
    </>
  ) : (
    <div>ProjectId no encontrado</div>
  );
}

export default Page;
