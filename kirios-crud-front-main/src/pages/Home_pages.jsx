import React from "react";

function Home_pages() {
  return (
    <>
      <section className="bg-white dark:bg-gray-900 min-h-screen flex items-center justify-center">
        <div className="">
          <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 ">
            <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
              Simplificando la Gestión de tus Actividades
            </h1>
            <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-400">
              ¡Crea, organiza y administra eventos sin esfuerzo! Nuestro sistema
              de registro de eventos te permite planificar, promocionar y
              gestionar tus reuniones, conferencias, celebraciones y más.
              ¡Simplifica tu vida y haz que tus eventos destaquen con nuestra
              plataforma intuitiva y poderosa!
            </p>
            <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
              <a
                href="/eventos/registrar"
                className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
              >
                Registra tu primer evento
                <svg
                  className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home_pages;
