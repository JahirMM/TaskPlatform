"use client";

import { useGetProject } from "@/projects/hooks/useGetProject";
import { useProjectId } from "@/board/hook/useGetProjectIs";

import KanbanHeader from "@/board/components/KanbanHeader";
import KanbanBoard from "@/board/components/KanbanBoard";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

function ProjectContent() {
  const projectId = useProjectId();
  const { data: project, isLoading, isError } = useGetProject(projectId!);

  const router = useRouter();

  useEffect(() => {
    if (isError) {
      router.push("/error");
    } else if (!isLoading && !project) {
      router.push("/not_found");
    }
  }, [isError, isLoading, project, router]);

  if (isError || (!isLoading && !project)) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] bg-gradient-to-br from-dark-blue to-dark-purple p-4">
        <div className="max-w-md text-center">
          <div className="w-20 h-20 mx-auto mb-6 border-4 border-gray-300 rounded-full animate-spin border-t-action"></div>
          <h2 className="mb-2 text-2xl font-bold text-white">Redirigiendo</h2>
          <p className="text-gray-300">
            Estamos llevándote a la página adecuada...
          </p>
        </div>
      </div>
    );
  }

  if (!projectId) {
    router.push("/not_found");
    return;
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

export default ProjectContent;
