import { useState, useRef, useEffect } from "react";

import ConnectedMembersSkeleton from "@/board/skeletons/ConnectedMembersSkeleton";
import { useProjectPresence } from "@/board/hook/useProjectPresence";
import { useGetUser } from "@/common/hooks/useGetUser";

import UserIcon from "@/icons/UserIcon";
import UsersIcon from "@/icons/UsersIcon";

function ConnectedMembers({ projectId }: { projectId: string }) {
  const { data, isError, isLoading } = useGetUser();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  const onlineUsers = useProjectPresence(
    projectId,
    data?.id || "",
    data?.user_name || "",
    data?.avatar_url || ""
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const checkScreenSize = () => setIsMobile(window.innerWidth < 640);
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  if (isLoading) return <ConnectedMembersSkeleton />;
  if (isError || !data) return null;

  const firstFiveUsers = onlineUsers.slice(0, 5);

  const showUsersIcon = isMobile
    ? onlineUsers.length > 0
    : onlineUsers.length > 5;

  const dropdownUsers = isMobile ? onlineUsers : onlineUsers.slice(5);

  return (
    <div className="relative flex items-center space-x-[-10px]">
      {!isMobile && (
        <ul className="items-center hidden sm:flex">
          {firstFiveUsers.map((user) =>
            user.avatarUrl ? (
              <img
                key={user.userId}
                src={user.avatarUrl}
                alt="Imagen de perfil del usuario"
                className="p-0.5 w-10 h-10 border-2 bg-bg-secondary border-white rounded-full"
              />
            ) : (
              <UserIcon
                key={user.userId}
                className="p-0.5 text-white border-2 rounded-full size-10 border-white bg-bg-secondary"
              />
            )
          )}
        </ul>
      )}

      {showUsersIcon && (
        <div ref={dropdownRef} className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="focus:outline-none"
          >
            <UsersIcon className="p-1 text-white border-2 border-white rounded-full cursor-pointer size-10 bg-action" />
          </button>

          {isDropdownOpen && (
            <div
              className={`
                absolute z-10 w-48 mt-2 border rounded-lg shadow-lg bg-bg-secondary border-white/25
                ${isMobile ? "left-0" : "right-0"}
              `}
            >
              <div className="p-2">
                <h3 className="px-2 py-1 text-sm font-semibold text-white">
                  Usuarios conectados
                </h3>
                <ul>
                  {dropdownUsers.map((user) => (
                    <li
                      key={user.userId}
                      className="flex items-center px-2 py-1 text-sm text-white hover:bg-white/10"
                    >
                      {user.avatarUrl ? (
                        <img
                          src={user.avatarUrl}
                          alt={user.name}
                          className="w-5 h-5 mr-2 rounded-full"
                        />
                      ) : (
                        <UserIcon className="w-4 h-4 mr-2" />
                      )}
                      <span>{user.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ConnectedMembers;
