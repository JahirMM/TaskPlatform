"use client";

import { useState } from "react";

import { AuthButtons } from "@/auth/components/AuthButtons";
import useAuthListener from "@/auth/hook/useAuthListener";

import XmarkIcon from "@/icons/XmarkIcon";
import MenuIcon from "@/icons/MenuIcon";
import PlusIcon from "@/icons/PlusIcon";

import Link from "next/link";

function Header() {
  const [showMenu, setShowMenu] = useState(false);
  const user = useAuthListener();

  return (
    <header className="w-full border-b border-bg-secondary">
      <div className="flex items-center justify-between w-full h-16 px-10 mx-auto text-sm lg:container lg:px-16 xl:px-40">
        <Link
          href="/"
          className="text-2xl font-bold text-action hover:text-action-hover"
        >
          TaskPlatform
        </Link>

        <nav
          className={`
            absolute backdrop-blur-md bg-bg-secondary/40 transition-transform duration-300 w-full left-0 px-10 py-3 flex flex-col gap-5 
            sm:block
            sm:w-auto
            sm:p-0
            sm:relative sm:left-auto sm:translate-y-0
            sm:bg-none sm:backdrop-blur-none
            ${showMenu ? "-translate-y-full" : "translate-y-24"}
          `}
          aria-label="Main navigation"
        >
          {user && (
            <ul className="flex flex-col gap-5 sm:items-center sm:gap-8 sm:flex-row">
              <li>
                <Link
                  href="/projects"
                  className="text-xs font-semibold text-white hover:text-action-hover md:text-sm"
                >
                  Mis proyectos
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  className="flex justify-center cursor-pointer group"
                  aria-label="Crear tablero"
                >
                  <span className="mr-2 text-xs font-semibold text-white group-hover:text-action md:text-sm">
                    Crear proyecto
                  </span>
                  <PlusIcon className="text-white size-3 group-hover:text-action" />
                </button>
              </li>
            </ul>
          )}

          <div className="sm:hidden" role="complementary" aria-label="Botones de autenticación">
            <AuthButtons />
          </div>
        </nav>

        <div className="hidden sm:block" role="complementary" aria-label="Botones de autenticación">
          <AuthButtons />
        </div>

        <button
          type="button"
          onClick={() => setShowMenu(!showMenu)}
          className="relative z-50 sm:hidden"
          aria-label={showMenu ? "Abrir menú" : "Cerrar menú"}
        >
          {showMenu ? (
            <MenuIcon className="cursor-pointer size-6 text-action hover:text-action-hover" />
          ) : (
            <XmarkIcon className="cursor-pointer size-6 text-action hover:text-action-hover" />
          )}
        </button>
      </div>
    </header>
  );
}

export default Header;
