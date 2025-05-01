import { getUserService } from "@/common/services/getUserService";
import { useToastOnError } from "@/common/hooks/useToastOnError";
import { useQuery } from "@tanstack/react-query";

export const useGetUser = () => {
  const { data, error, isError, isLoading } = useQuery({
    queryKey: ["getUser"],
    queryFn: getUserService,
    staleTime: 1000 * 60 * 5,
    retry: false,
  });

  useToastOnError(isError, error);

  return { data, error, isError, isLoading };
};
