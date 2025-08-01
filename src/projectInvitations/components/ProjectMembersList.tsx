import { useGetProjectMembers } from "@/projectInvitations/hooks/useGetProjectMembers";

interface ProjectMembersListProps {
  projectId: string;
}

function ProjectMembersList({ projectId }: ProjectMembersListProps) {
  const { data, isLoading, isError } = useGetProjectMembers(projectId);

  if (isError) {
    return (
      <div className="mt-8" aria-live="polite">
        <p className="text-sm text-red-500">
          Error al obtener los usuarios del proyecto.
        </p>
      </div>
    );
  }
  if (isLoading) {
    return (
      <div className="flex justify-center mt-8" aria-busy="true" aria-live="polite">
        <div className="w-10 h-10 border-4 border-gray-300 rounded-full animate-spin border-t-action"></div>
      </div>
    );
  }

  if (!data || !data.users || data.users.length === 0) {
    return (
      <div className="mt-8" aria-live="polite">
        <p>No hay miembros en el proyecto</p>
      </div>
    );
  }

  return (
    <section className="mt-8" aria-labelledby="project-members-heading">
      <h2 id="project-members-heading" className="mb-4 text-sm text-white">
        Miembros del proyecto
      </h2>
      <ul className="flex flex-col gap-4">
        {data.users.map((user) => (
          <li key={user.id} className="flex items-center gap-2">
            {user.avatar_url ? (
              <img
                src={user.avatar_url}
                alt={`Avatar de ${user.name || user.user_name}`}
                className="rounded-full size-12"
              />
            ) : (
              <div
                className="bg-gray-600 rounded-full size-12"
                role="img"
                aria-label={`Avatar por defecto de ${
                  user.name || user.user_name
                }`}
              />
            )}
            <div>
              <p className="text-sm text-white">
                {user.name}{" "}
                {data.ownerId === user.id && (
                  <span
                    className="text-sm text-white"
                    aria-label="Administrador del proyecto"
                  >
                    (Administrador)
                  </span>
                )}
              </p>
              <p className="text-xs text-gray-400">{user.user_name}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default ProjectMembersList;
