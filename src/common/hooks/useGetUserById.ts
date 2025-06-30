import { getUserByIdService } from "@/common/services/getUserByIdService";
import { useQuery } from "@tanstack/react-query";

export const useGetUserById = (userId: string) => {
  return useQuery({
    queryKey: ["getUsetById", userId],
    queryFn: async () => await getUserByIdService(userId),
    staleTime: 1000 * 60 * 5,
    placeholderData: (prevData) => prevData,
  });
};
