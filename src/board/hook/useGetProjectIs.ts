import { useParams } from "next/navigation";

export function useProjectId(): string | undefined {
  const params = useParams();

  if (!params?.projectId) return undefined;

  return Array.isArray(params.projectId) ? params.projectId[0] : params.projectId;
}
