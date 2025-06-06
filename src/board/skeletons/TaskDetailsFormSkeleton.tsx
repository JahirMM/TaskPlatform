function TaskDetailsFormSkeleton() {
  return (
    <form className="">
      <section className="flex flex-col items-start gap-7 md:flex-row">
        <div className="w-full min-h-[44px] px-3 py-2 overflow-hidden text-lg text-left border rounded-lg border-bg-primary bg-bg-primary animate-pulse">
          &nbsp;
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-300">Prioridad</label>
          <div className="flex gap-2 md:flex-col">
            {["Alto", "Medio", "Baja"].map((item) => (
              <div
                key={item}
                className="px-3 py-1 text-sm text-transparent border border-gray-500 rounded-lg"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="mt-5">
        <label className="block mb-4 text-sm text-white">Descripción</label>
        <div className="w-full px-3 py-2 border rounded-lg h-52 border-action bg-bg-secondary animate-pulse">
          &nbsp;
        </div>
      </section>
    </form>
  );
}

export default TaskDetailsFormSkeleton;
