function CreateProjectButton() {
  return (
    <button
      type="button"
      className="w-full bg-action h-44 rounded-xl flex items-center justify-center p-3 cursor-pointer hover:bg-action-hover sm:w-80 xl:max-w-[368px]"
      aria-label="Crear un proyecto nuevo"
    >
      <span className="text-sm font-bold text-gray-200">Crear un proyecto</span>
    </button>
  );
}

export default CreateProjectButton;
