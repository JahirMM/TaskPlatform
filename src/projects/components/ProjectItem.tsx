import { useCreateRecentlyViewedProject } from "@/projects/hooks/useCreateRecentlyViewedProject";
import { useDeleteProject } from "@/projects/hooks/useDeleteProject";

import { formatDate } from "@/common/utils/formatDate";

import TrashIcon from "@/icons/TrashIcon";
import { toast } from "sonner";

interface ProjectItemProps {
  id: string;
  user_id: string;
  owner_id: string;
  name: string;
  created_at: string;
  fetchProjects: () => Promise<void>;
}

function ProjectItem({
  id,
  user_id,
  owner_id,
  name,
  created_at,
  fetchProjects,
}: ProjectItemProps) {
  const { deleteProject, loading, error } = useDeleteProject();
  const { createRecentlyViewedProject } = useCreateRecentlyViewedProject();

  const handleDelete = async (event: React.MouseEvent) => {
    event.stopPropagation();

    if (error) {
      toast.error("Error al eliminar el porject");
    }

    await deleteProject(id);
    await fetchProjects();
  };

  const handleProjectItem = async () => {
    await createRecentlyViewedProject(id, user_id);
  };

  return (
    <article
      className="overflow-hidden w-full bg-surface h-44 rounded-xl flex flex-col justify-between p-3 cursor-pointer group hover:bg-surface-hover sm:w-80 xl:max-w-[368px]"
      onClick={handleProjectItem}
    >
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-sm font-bold text-gray-200 line-clamp-2">{name}</h3>

        {owner_id === user_id &&
          (loading ? (
            <div className="max-w-5 max-h-5 min-w-5 min-h-5 border-2 border-t-2 border-gray-200 rounded-full animate-spin border-t-action"></div>
          ) : (
            <button
              type="button"
              onClick={(event) => handleDelete(event)}
              className="p-2 transition-transform translate-x-10 rounded-md cursor-pointer group-hover:translate-0 hover:bg-action-hover/20"
            >
              <TrashIcon className="size-4 text-action" />
            </button>
          ))}
      </div>
      <time className="text-xs text-[#A1A1AA]" dateTime="2025-04-30">
        {formatDate(created_at)}
      </time>
    </article>
  );
}

export default ProjectItem;
