import { useParams } from "next/navigation";

export function useProjectId(): string | undefined {
  const params = useParams();

  const projectId = Array.isArray(params.projectId)
    ? params.projectId[0]
    : params.projectId;

  return projectId;
}
