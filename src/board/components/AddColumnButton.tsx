interface AddColumnButtonProps {
  createColumn: () => void;
}

function AddColumnButton({ createColumn }: AddColumnButtonProps) {
  return (
    <button
      type="button"
      onClick={() => createColumn()}
      className="h-[60px] w-[200px] min-w-[200px] p-3 text-sm font-medium uppercase cursor-pointer rounded-lg bg-action hover:bg-action-hover"
    >
      Agregar Columna
    </button>
  );
}

export default AddColumnButton;
