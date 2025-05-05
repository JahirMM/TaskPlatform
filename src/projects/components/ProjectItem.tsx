import { useCreateRecentlyViewedProject } from "@/projects/hooks/useCreateRecentlyViewedProject";
import { useDeleteProject } from "@/projects/hooks/useDeleteProject";

import { formatDate } from "@/common/utils/formatDate";

import TrashIcon from "@/icons/TrashIcon";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface ProjectItemProps {
  id: string;
  user_id: string;
  owner_id: string;
  name: string;
  created_at: string;
}

function ProjectItem({
  id,
  user_id,
  owner_id,
  name,
  created_at,
}: ProjectItemProps) {
  const router = useRouter();

  const mutationCreateRecentlyViewedProject = useCreateRecentlyViewedProject();
  const mutationDeleteProject = useDeleteProject();

  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsLoading(true);
    await mutationDeleteProject.mutateAsync({ projectId: id, userId: user_id });
    setIsLoading(false);
  };

  const handleProjectItem = async () => {
    await mutationCreateRecentlyViewedProject.mutateAsync({
      project_id: id,
      user_id: user_id,
    });

    router.push(`/projects/${id}`);
  };

  return (
    <article
      className="overflow-hidden w-full bg-surface h-44 rounded-xl flex flex-col justify-between p-3 cursor-pointer group hover:bg-surface-hover sm:w-80 xl:max-w-[368px]"
      onClick={handleProjectItem}
    >
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-sm font-bold text-gray-200 line-clamp-2">{name}</h3>

        {owner_id === user_id &&
          (isLoading ? (
            <div className="border-2 border-t-2 border-gray-200 rounded-full max-w-5 max-h-5 min-w-5 min-h-5 animate-spin border-t-action"></div>
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
