import { getUsersService } from "@/projectInvitations/services/getUsersService";
import { UserInterface } from "@/common/interfaces/userInterface";
import { useEffect, useRef, useState } from "react";

interface UserSearchInputProps {
  onAddUser: (user: UserInterface) => void;
  projectId: string;
}

function UserSearchInput({ onAddUser, projectId }: UserSearchInputProps) {
  const textRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [userList, setUserList] = useState<UserInterface[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = () => {
    const currentTextRef = textRef.current;

    if (!currentTextRef || !currentTextRef.value.trim()) {
      setUserList([]);
      return;
    }

    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(async () => {
      setIsLoading(true);
      try {
        const users = await getUsersService(currentTextRef.value, projectId);
        setUserList(users);
      } catch {
        setUserList([]);
      } finally {
        setIsLoading(false);
      }
    }, 500);
  };

  const handleSelectedUser = (user: UserInterface) => {
    onAddUser(user);
    setUserList([]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      setUserList([]);
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    const input = textRef.current;
    const results = resultsRef.current;
    if (
      input &&
      results &&
      !input.contains(event.target as Node) &&
      !results.contains(event.target as Node)
    ) {
      setUserList([]);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <form
      aria-label="Formulario de invitación"
      className="flex flex-col gap-4 md:items-center md:flex-row md:gap-2"
    >
      <div className="relative flex-1">
        <input
          ref={textRef}
          type="text"
          id="filterUser-input"
          name="add-user-input"
          onKeyDown={handleKeyDown}
          onChange={handleChange}
          className="w-full px-3 py-2 text-sm text-white border rounded-lg border-action focus:border-action-hover focus:ring-action-hover focus:ring-1 focus:outline-none"
          placeholder="Correo electrónico o nombre"
        />
        {isLoading ? (
          <div className="fixed text-white text-sm flex items-center z-[1000] mt-1 p-3 h-16 w-[calc(95%-3rem)] overflow-y-auto bg-bg-secondary rounded-lg shadow-lg border border-gray-700 sm:w-[calc(50%-3rem)]">
            Cargando...
          </div>
        ) : (
          userList.length > 0 && (
            <div
              ref={resultsRef}
              className="fixed flex flex-col gap-2 z-[1000] mt-1 p-3 max-h-[300px] w-[calc(95%-3rem)] overflow-y-auto bg-bg-secondary rounded-lg shadow-lg border border-gray-700 sm:w-[calc(50%-3rem)]"
            >
              {userList.map((user) => (
                <div
                  key={user.id}
                  onClick={() => handleSelectedUser(user)}
                  className="p-3 rounded-md cursor-pointer hover:bg-surface-hover"
                >
                  <div className="flex items-center gap-4">
                    {user.avatar_url ? (
                      <img
                        src={user.avatar_url}
                        alt={user.name || "Foto de perfil"}
                        className="rounded-full size-12"
                      />
                    ) : (
                      <div className="bg-gray-600 rounded-full size-12"></div>
                    )}
                    <div>
                      <p className="text-sm text-white">{user.name}</p>
                      <p className="text-xs text-gray-400">{user.user_name}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )
        )}
      </div>
    </form>
  );
}

export default UserSearchInput;
