"use client";

import { AuthButtons } from "@/auth/components/AuthButtons";
import useAuthListener from "@/auth/hook/useAuthListener";

import PlusIcon from "@/icons/PlusIcon";

import Link from "next/link";

function Header() {
  const user = useAuthListener();

  return (
    <header className="flex items-center justify-between w-full h-16 p-0 px-10 mx-auto text-sm bg-bg-primary lg:container lg:px-16 xl:px-40">
      <div className="flex items-center gap-16">
        <Link href={"/"} className="text-2xl font-bold text-action hover:text-action-hover">
          TaskPlatfrom
        </Link>
        {user && (
          <nav className="">
            <ul className="flex gap-8">
              <li>
                <Link href={""} className="text-sm font-semibold text-white hover:text-action-hover">
                  Tableros
                </Link>
              </li>
              <li>
                <button type="button" className="flex items-center cursor-pointer group">
                  <span className="mr-2 text-sm font-semibold text-white group-hover:text-action">Crear tablero</span>
                  <PlusIcon className="text-white size-3 group-hover:text-action" />
                </button>
              </li>
            </ul>
          </nav>
        )}
      </div>
      <AuthButtons />
    </header>
  );
}

export default Header;
