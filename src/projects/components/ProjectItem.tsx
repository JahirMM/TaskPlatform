function ProjectItem() {
  return (
    <article className="w-full bg-surface h-44 rounded-xl flex flex-col justify-between p-3 cursor-pointer hover:bg-surface-hover sm:w-80 xl:max-w-[368px]">
      <h3 className="text-sm font-bold text-gray-200">Título del proyecto</h3>
      <time className="text-xs text-[#A1A1AA]" dateTime="2025-04-30">
        30/04/2025
      </time>
    </article>
  );
}

export default ProjectItem;
