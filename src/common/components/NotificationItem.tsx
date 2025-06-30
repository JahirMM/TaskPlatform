import { InvitationInterface } from "@/projectInvitations/interfaces/invitationInterface";

import { useGetUserById } from "@/common/hooks/useGetUserById";
import { useGetProject } from "@/projects/hooks/useGetProject";

import { formatDate } from "@/common/utils/formatDate";

interface NotificationItemProps {
  invitation: InvitationInterface;
}

function NotificationItem({ invitation }: NotificationItemProps) {
  const {
    data: projectData,
    isLoading: projectLoading,
    isError: projectIsError,
  } = useGetProject(invitation.project_id);

  const {
    data: userData,
    isLoading: userLoading,
    isError: userIsError,
  } = useGetUserById(invitation.sender_user_id);

  if (projectLoading || userLoading) {
    return (
      <li className="px-4 py-3 text-sm text-gray-400">
        Cargando invitación...
      </li>
    );
  }

  if (projectIsError || userIsError || !projectData || !userData) {
    return (
      <li className="px-4 py-3 text-sm text-red-400">
        Error al cargar la invitación.
      </li>
    );
  }

  return (
    <li className="px-4 py-3 transition-colors hover:bg-white/5">
      <p className="text-sm font-medium text-white">
        <span className="font-semibold text-action">
          {userData.name === "No Name"
            ? userData.user_name
            : userData.name || "Usuario"}
        </span>{" "}
        te ha invitado unirte a su proyecto
      </p>
      <p className="mt-1 text-xs text-gray-400">
        Proyecto:{" "}
        <span className="font-medium text-gray-300">
          {projectData.name || "Proyecto"}
        </span>
      </p>
      <time className="block mt-1 text-xs text-gray-500">
        {formatDate(invitation.created_at)}
      </time>
      <div className="flex justify-end gap-2 mt-3">
        <button
          type="button"
          className="px-2 py-1 text-xs text-white transition border rounded-md cursor-pointer border-action hover:bg-action/30"
        >
          Aceptar
        </button>
        <button
          type="button"
          className="px-2 py-1 text-xs text-red-400 transition border border-red-500 rounded-md cursor-pointer hover:bg-red-500/10"
        >
          Rechazar
        </button>
      </div>
    </li>
  );
}

export default NotificationItem;
