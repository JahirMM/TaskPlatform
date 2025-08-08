"use client";

import Link from "next/link";

function NotFound() {
  return (
    <main className="h-[calc(100vh-64px)] flex flex-col items-center justify-center bg-gradient-to-br from-dark-blue to-dark-purple p-4">
      <div className="max-w-2xl text-center">
        <div className="mb-8 animate-float">
          <img
            src="/404Page/404Image.webp"
            alt="Página no encontrada"
            className="w-64 mx-auto md:w-80"
          />
        </div>

        <div className="animate-fade-in">
          <h1 className="mb-4 text-5xl font-bold text-white md:text-6xl">
            ¡Ups!
          </h1>
          <p className="mb-8 text-xl text-white md:text-2xl">
            Parece que te has perdido en el espacio digital...
          </p>

          <Link
            href="/"
            className="inline-block px-8 py-3 font-semibold text-white transition-all duration-300 rounded-full shadow-lg text-bse bg-action hover:bg-action-hover hover:scale-105 focus:outline-none focus:ring-2 focus:ring-action-hover"
          >
            Regresar
          </Link>
        </div>
      </div>
    </main>
  );
}

export default NotFound;
