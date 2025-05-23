import { reorderColumnsSafelyService } from "@/board/service/reorderColumnsSafelyService";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useReorderColumns = () => {
  const queryClient = useQueryClient();

  const reorder = async (newColumns: { id: string }[]) => {
    try {
      const orderedIds = newColumns.map((col) => col.id);
      await reorderColumnsSafelyService(orderedIds);
      await queryClient.invalidateQueries({ queryKey: ["getColumns"] });
    } catch (error) {
      toast.error("Error al reordenar columnas");
    }
  };

  return reorder;
};
