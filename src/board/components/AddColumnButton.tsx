import { CreateColumnRequestInterface } from "@/board/interfaces/createColumnRequestInterface";
import { ColumnInterface } from "@/board/interfaces/columnInterface";

import { useCreateColumn } from "@/board/hook/useCreateColumn";
import XmarkIcon from "@/icons/XmarkIcon";
import { useRef } from "react";

interface AddColumnButtonProps {
  projectId: string;
  columns: ColumnInterface[];
  setColumns: React.Dispatch<React.SetStateAction<ColumnInterface[]>>;
  setAddColumn: React.Dispatch<React.SetStateAction<boolean>>;
}

function AddColumnButton({
  projectId,
  columns,
  setColumns,
  setAddColumn,
}: AddColumnButtonProps) {
  const mutationCreateColumn = useCreateColumn();

  const inputRef = useRef<HTMLInputElement>(null);

  const createColumn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const name = inputRef.current?.value.trim();
    if (!name || !projectId) return;

    const maxPosition = Math.max(...columns.map((col) => col.position), 0);
    const request: CreateColumnRequestInterface = {
      name,
      position: maxPosition + 1,
      project_id: projectId,
    };

    const data: ColumnInterface[] = await mutationCreateColumn.mutateAsync({
      request: request,
      projectId: projectId,
    });
    setColumns([...columns, data[0]]);

    if (inputRef.current) {
      inputRef.current.value = "";
    }

    setAddColumn(false);
  };

  return (
    <form
      onSubmit={createColumn}
      className="w-[250px] h-[150px] bg-bg-column rounded-xl flex flex-col justify-between p-4"
    >
      <input
        type="text"
        ref={inputRef}
        className="bg-surface border border-action text-white text-xs rounded-lg focus:ring-action focus:border-action block w-full p-2.5"
        placeholder="Introduce el nombre de la columna"
        required
      />
      <div className="flex items-center gap-3">
        <button
          type="submit"
          className="cursor-pointer focus:outline-none bg-action font-medium rounded-lg text-sm px-5 py-2.5 hover:bg-action-hover"
        >
          Agregar
        </button>
        <button
          type="button"
          onClick={() => setAddColumn(false)}
          className="p-2 rounded-md cursor-pointer hover:bg-surface"
        >
          <XmarkIcon className="text-white size-5" />
        </button>
      </div>
    </form>
  );
}

export default AddColumnButton;
