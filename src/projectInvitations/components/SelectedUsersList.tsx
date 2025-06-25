import { UserInterface } from "@/common/interfaces/userInterface";
import XmarkIcon from "@/icons/XmarkIcon";

interface SelectedUsersListProps {
  selectedUsers: UserInterface[];
  onRemoveUser: (userId: string) => void;
  onInviteUsers: () => void;
}

function SelectedUsersList({
  selectedUsers,
  onRemoveUser,
  onInviteUsers,
}: SelectedUsersListProps) {
  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm text-white">Usuarios a invitar</p>
        <button
          type="button"
          onClick={onInviteUsers}
          className="px-5 py-2 text-sm font-medium text-white rounded-lg cursor-pointer bg-action hover:bg-action-hover"
          aria-label="Enviar invitaciones"
        >
          Invitar ({selectedUsers.length})
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {selectedUsers.map((user) => (
          <div
            key={user.id}
            className="flex items-center gap-2 px-3 py-2 bg-gray-700 rounded-full"
          >
            <span className="text-xs text-white">
              {user.name || user.user_name}
            </span>
            <button
              type="button"
              onClick={() => onRemoveUser(user.id)}
              className="text-gray-300 hover:text-white group:"
            >
              <XmarkIcon className="cursor-pointer size-4 text-action group-hover:text-action-hover" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SelectedUsersList;
