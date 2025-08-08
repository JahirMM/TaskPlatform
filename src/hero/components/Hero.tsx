"use client";

import SignInAuthButton from "@/auth/components/SignInAuthButton";
import { useAuth } from "@/auth/context/AuthContext";

import Link from "next/link";

function Hero() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div
        className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] bg-gradient-to-br from-dark-blue to-dark-purple p-4"
        aria-busy="true"
        aria-live="polite"
      >
        <div className="w-20 h-20 mx-auto mb-6 border-4 border-gray-300 rounded-full animate-spin border-t-action"></div>
      </div>
    );
  }

  return (
    <section className="h-[calc(100vh-65px)] flex flex-col justify-center items-center px-10 mx-auto lg:container lg:px-32 xl:px-40">
      <h1 className="flex flex-col items-center justify-center text-4xl text-center text-white sm:text-5xl sm:leading-none lg:text-7xl">
        <span className="block">Gestiona sin esfuerzo</span>
        <span className="block text-action">Colabora fácilmente</span>
      </h1>
      <p className="pt-2 my-5 text-sm text-center text-white sm:text-base lg:text-lg">
        TaskPlatfrom es la manera más eficiente de organizar tus tareas.
        <br className="hidden md:block" />
        Crea espacios de trabajo, tableros y tareas en segundos. Invita a tu
        equipo y colabora sin complicaciones.
      </p>
      <div className="mt-5">
        {user ? (
          <Link
            type="button"
            href="/projects"
            className="inline-flex items-center px-5 py-2 mb-2 text-sm font-medium text-center text-white rounded-lg bg-action hover:bg-action-hover focus:ring-4 focus:outline-none focus:ring-action-hover me-2"
          >
            Mis tableros
          </Link>
        ) : (
          <SignInAuthButton />
        )}
      </div>
    </section>
  );
}

export default Hero;
