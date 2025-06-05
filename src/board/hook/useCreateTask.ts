import { CreateTaskRequestInterface } from "@/board/interfaces/CreateTaskRequestInterface";
import { createTaskService } from "@/board/service/createTaskService";

import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (request: CreateTaskRequestInterface) =>
      createTaskService(request),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getTasksByProjectId"] });
    },
  });
};
