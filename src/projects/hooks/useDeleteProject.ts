// import { deleteProjectService } from "@/projects/services/deleteProjectService";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { toast } from "sonner";

// export const useDeleteProject = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: ({
//       projectId,
//       userId,
//     }: {
//       projectId: string;
//       userId: string;
//     }) => deleteProjectService(projectId, userId),
//     onSuccess: () => {
//       queryClient.invalidateQueries({
//         queryKey: ["getRecentlyViewedProjects"],
//       });
//       queryClient.invalidateQueries({ queryKey: ["getProjects"] });
//     },
//     onError: (error) => {
//       if (error instanceof Error) {
//         toast.error(`Error al eliminar el proyecto`);
//       } else {
//         toast.error("Error desconocido al eliminar el proyecto");
//       }
//       toast.error("Error en la mutación al borrar el proyecto");
//     },
//   });
// };

import { deleteProjectService } from "@/projects/services/deleteProjectService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useDeleteProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      projectId,
      userId,
    }: {
      projectId: string;
      userId: string;
    }) => deleteProjectService(projectId, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getRecentlyViewedProjects"] });
      queryClient.invalidateQueries({ queryKey: ["getProjects"] });
    },
    onError: (error) => {
      toast.error(
        error instanceof Error
          ? `Error al eliminar el proyecto`
          : "Error desconocido"
      );
    },
  });
};
