import { getRecentlyViewedProjectsService } from "@/projects/services/getRecentlyViewedProjectsService";
import { useToastOnError } from "@/common/hooks/useToastOnError";
import { useQuery } from "@tanstack/react-query";

export const useGetRecentlyViewedProjects = (userId: string | undefined) => {
  const { data, error, isError, isLoading } = useQuery({
    queryKey: ["getRecentlyViewedProjects", userId],
    queryFn: async () => await getRecentlyViewedProjectsService(userId!),
    enabled: !!userId,
    staleTime: 1000 * 60 * 5,
  });

  useToastOnError(isError, error);

  return { data, error, isError, isLoading };
};
