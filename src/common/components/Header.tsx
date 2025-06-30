"use client";

import { useState } from "react";

import CreateProjectForm from "@/projects/components/CreateProjectForm";
import Notifications from "@/common/components/Notifications";
import { AuthButtons } from "@/auth/components/AuthButtons";
import useAuthListener from "@/auth/hook/useAuthListener";

import XmarkIcon from "@/icons/XmarkIcon";
import MenuIcon from "@/icons/MenuIcon";
import PlusIcon from "@/icons/PlusIcon";
import BellIcon from "@/icons/BellIcon";

import Modal from "@/common/components/Modal";

import { usePathname } from "next/navigation";
import Link from "next/link";

function Header() {
  const pathname = usePathname();

  const [showMenu, setShowMenu] = useState(false);
  const [showForm, setShowform] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const user = useAuthListener();

  const handleCloseForm = () => {
    setShowform((showForm) => !showForm);
  };

  const handleNotifications = () => {
    if (showMenu) {
      setShowMenu(false);
    }
    setShowNotifications((showNotifications) => !showNotifications);
  };

  const handleMenu = () => {
    if (showMenu) {
      setShowMenu(false);
    }
    setShowform(!showForm);
  };

  return (
    <>
      <header className="flex items-center w-full h-16 border-b border-bg-secondary">
        <div className="flex items-center justify-between w-full px-10 mx-auto text-sm lg:container lg:px-16 xl:px-40">
          <Link
            href="/"
            className="text-2xl font-bold text-action hover:text-action-hover"
            onClick={() => showMenu && setShowMenu(false)}
          >
            TaskPlatform
          </Link>
          <nav
            className={`
            absolute bg-bg-secondary/50 backdrop-blur-md transition-transform duration-300 w-full left-0 px-10 py-3 flex flex-col gap-5 
            md:block
            md:w-auto
            md:p-0
            md:relative md:left-auto md:translate-y-0
            md:bg-bg-primary md:backdrop-blur-none
            ${
              showMenu
                ? user
                  ? "translate-y-28"
                  : "translate-y-14"
                : "-translate-y-full"
            }
          `}
            aria-label="Main navigation"
          >
            {user && (
              <ul className="flex flex-col gap-5 md:items-center md:gap-8 md:flex-row">
                <li>
                  <Link
                    href="/projects"
                    onClick={() => setShowMenu(false)}
                    className={`text-xs font-semibold hover:text-action-hover md:text-sm ${
                      "/projects" === pathname ? "text-action" : "text-white"
                    }`}
                  >
                    Mis proyectos
                  </Link>
                </li>
                <li
                  className="text-xs font-semibold text-white cursor-pointer hover:text-action-hover md:text-sm md:hidden"
                  onClick={handleNotifications}
                >
                  Notificaciones
                </li>
                <li>
                  <button
                    type="button"
                    className="flex items-center justify-center cursor-pointer group"
                    aria-label="Crear tablero"
                    onClick={handleMenu}
                  >
                    <span className="mr-2 text-xs font-semibold text-white group-hover:text-action md:text-sm">
                      Crear proyecto
                    </span>
                    <PlusIcon className="text-white size-3 group-hover:text-action" />
                  </button>
                </li>
              </ul>
            )}
            <div
              className="md:hidden"
              role="complementary"
              aria-label="Botones de autenticación"
            >
              <AuthButtons />
            </div>
          </nav>
          <div className="hidden md:flex md:gap-3 md:items-center">
            {user && (
              <BellIcon
                className="cursor-pointer text-action size-5"
                onClick={() =>
                  setShowNotifications(
                    (showNotifications) => !showNotifications
                  )
                }
              />
            )}
            <div
              className="hidden md:block"
              role="complementary"
              aria-label="Botones de autenticación"
            >
              <AuthButtons />
            </div>
          </div>
          <button
            type="button"
            onClick={() => setShowMenu(!showMenu)}
            className="relative z-40 md:hidden"
            aria-label={showMenu ? "Abrir menú" : "Cerrar menú"}
          >
            {showMenu ? (
              <XmarkIcon className="cursor-pointer size-6 text-action hover:text-action-hover" />
            ) : (
              <MenuIcon className="cursor-pointer size-6 text-action hover:text-action-hover" />
            )}
          </button>
        </div>
      </header>
      {user && (
        <Notifications
          showNotifications={showNotifications}
          setShowNotifications={setShowNotifications}
          userId={user.id}
        />
      )}
      {showForm && user && (
        <Modal title="Crear proyecto" onClose={handleCloseForm}>
          <CreateProjectForm setShowForm={setShowform} userId={user.id} />
        </Modal>
      )}
    </>
  );
}

export default Header;
