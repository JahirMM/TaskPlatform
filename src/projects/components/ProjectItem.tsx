interface ProjectItemProps {
  id: string;
  name: string;
  created_at: string;
}

function ProjectItem({ id, name, created_at }: ProjectItemProps) {
  return (
    <article className="w-full bg-surface h-44 rounded-xl flex flex-col justify-between p-3 cursor-pointer hover:bg-surface-hover sm:w-80 xl:max-w-[368px]">
      <h3 className="text-sm font-bold text-gray-200">{name}</h3>
      <time className="text-xs text-[#A1A1AA]" dateTime="2025-04-30">
        {created_at}
      </time>
    </article>
  );
}

export default ProjectItem;
