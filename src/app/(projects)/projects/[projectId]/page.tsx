import BoardColumn from "@/board/components/BoardColumn";

function page() {
  const columns = [
    {
      title: "To Do",
      tasks: ["Tarea 1", "Tarea 2", "Tarea 3", "Tarea 1", "Tarea 2", "Tarea 3", "Tarea 1", "Tarea 2", "Tarea 3", "Tarea 1", "Tarea 2", "Tarea 3", "Tarea 1", "Tarea 2", "Tarea 3", "Tarea 1", "Tarea 2", "Tarea 3", "Tarea 1", "Tarea 2", "Tarea 3", "Tarea 1", "Tarea 2", "Tarea 3", "Tarea 1", "Tarea 2", "Tarea 3"],
    },
    {
      title: "In Progress",
      tasks: ["Tarea 4", "Tarea 5"],
    },
    {
      title: "To Do",
      tasks: ["Tarea 1"],
    },
    {
      title: "In Progress",
      tasks: ["Tarea 4", "Tarea 5", "Tarea 6"],
    },
    {
      title: "To Do",
      tasks: ["Tarea 1", "Tarea 2", "Tarea 3"],
    },
    {
      title: "In Progress",
      tasks: ["Tarea 4"],
    },
    {
      title: "To Do",
      tasks: ["Tarea 1", "Tarea 2", "Tarea 3"],
    },
    {
      title: "In Progress",
      tasks: ["Tarea 4", "Tarea 5", "Tarea 6"],
    },
    {
      title: "To Do",
      tasks: ["Tarea 1", "Tarea 2", "Tarea 3"],
    },
    {
      title: "In Progress",
      tasks: ["Tarea 4", "Tarea 5", "Tarea 6"],
    },
    {
      title: "To Do",
      tasks: ["Tarea 1", "Tarea 2", "Tarea 3"],
    },
    {
      title: "In Progress",
      tasks: ["Tarea 4"],
    },
  ];
  return (
    <div className="px-5 h-[calc(100vh-64px)] overflow-y-auto sm:px-16">
      <section className="pt-4 pb-10">
        <h1 className="text-xl font-bold text-white">Nombre del proyecto</h1>
      </section>

      <section
        className="flex gap-4 overflow-x-auto h-[570px] items-start scrollbar-custom"
        aria-label="Tableros del proyecto"
      >
        {columns.map((column, index) => (
          <BoardColumn key={index} title={column.title} tasks={column.tasks} />
        ))}
      </section>
    </div>
  );
}

export default page;
