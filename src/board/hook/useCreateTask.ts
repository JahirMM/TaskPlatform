import { CreateTaskRequestInterface } from "@/board/interfaces/CreateTaskRequestInterface";
import { createTaskService } from "@/board/service/createTaskService";

import { useMutation, useQueryClient } from "@tanstack/react-query";

type CreateTaskParams = {
  projectId: string;
  request: CreateTaskRequestInterface;
};

export const useCreateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateTaskParams) =>
      createTaskService(data.request),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["getTasksByProjectId", variables.projectId],
      });
    },
  });
};
