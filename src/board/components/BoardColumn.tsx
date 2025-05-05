import AddTaskButton from "@/board/components/AddTaskButton";
import TaskCard from "@/board/components/TaskCard";

type BoardColumnProps = {
  title: string;
  tasks: string[];
};

export default function BoardColumn({ title, tasks }: BoardColumnProps) {
  return (
    <article className="bg-surface min-w-60 max-w-60 rounded-xl flex flex-col max-h-[552px]">
      <header className="p-3">
        <h2 className="text-base text-gray-300">{title}</h2>
      </header>
      <ul className="flex flex-col gap-2 px-3 overflow-y-auto max-h-[500px] scrollbar-custom">
        {tasks.map((task, index) => (
          <TaskCard key={index} content={task} />
        ))}
      </ul>
      <footer className="p-3">
        <AddTaskButton />
      </footer>
    </article>
  );
}
