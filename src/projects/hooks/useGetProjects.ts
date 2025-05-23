import { getProjectsService } from "@/projects/services/getProjectsService";
import { useToastOnError } from "@/common/hooks/useToastOnError";
import { useQuery } from "@tanstack/react-query";

export const useGetProjects = (userId: string | undefined) => {
  const { data, error, isError, isLoading } = useQuery({
    queryKey: ["getProjects", userId],
    queryFn: async () => await getProjectsService(userId!),
    enabled: !!userId,
    staleTime: 1000 * 60 * 5,
  });

  useToastOnError(isError, error);

  return { data, error, isError, isLoading };
};
