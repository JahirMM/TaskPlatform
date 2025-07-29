import { useDeleteColumn } from "@/board/hook/useDeleteColumn";
import TrashIcon from "@/icons/TrashIcon";
import { MouseEvent } from "react";

interface DeleteColumnButtonProps {
  columnId: string;
  projectId: string;
}

function DeleteColumnButton({ columnId, projectId }: DeleteColumnButtonProps) {
  const mutationDeleteColumn = useDeleteColumn();

  const deleteColumn = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    mutationDeleteColumn.mutate({ columnId, projectId });
  };

  return (
    <button
      type="button"
      onClick={(e) => deleteColumn(e)}
      className="p-2 rounded-md cursor-pointer hover:bg-surface"
    >
      <TrashIcon className="text-action size-4 hover:text-action-hover" />
    </button>
  );
}

export default DeleteColumnButton;
