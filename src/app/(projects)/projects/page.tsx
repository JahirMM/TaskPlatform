import ClockIcon from "@/icons/ClockIcon";

function page() {
  return (
    <section className="px-10 mx-auto lg:container lg:px-16 xl:px-40">
      <div className="mt-8 mb-24 sm:mt-16 ">
        <div className="flex items-center gap-4 mb-8">
          <ClockIcon className="text-white size-5" />
          <h3 className="text-lg font-semibold text-white sm:text-xl">
            Visto recientemente
          </h3>
        </div>
        <div className="grid grid-cols-1 gap-8 place-items-center md:grid-cols-2 xl:grid-cols-3">
          <div className="w-full bg-surface h-44 rounded-xl flex flex-col justify-between p-3 cursor-pointer hover:bg-surface-hover sm:w-80 xl:max-w-[368px]">
            <span className="text-sm font-bold text-gray-200">
              Titulo del poryecto
            </span>
            <span className="text-xs text-[#A1A1AA]">30/04/2025</span>
          </div>
          <div className="w-full bg-surface h-44 rounded-xl flex flex-col justify-between p-3 cursor-pointer hover:bg-surface-hover sm:w-80 xl:max-w-[368px]">
            <span className="text-sm font-bold text-gray-200">
              Titulo del poryecto
            </span>
            <span className="text-xs text-[#A1A1AA]">30/04/2025</span>
          </div>
          <div className="w-full bg-surface h-44 rounded-xl flex flex-col justify-between p-3 cursor-pointer hover:bg-surface-hover sm:w-80 xl:max-w-[368px]">
            <span className="text-sm font-bold text-gray-200">
              Titulo del poryecto
            </span>
            <span className="text-xs text-[#A1A1AA]">30/04/2025</span>
          </div>
        </div>
      </div>

      <div>
        <div className="flex flex-col justify-between gap-8 mb-8 sm:flex-row sm:items-center sm:gap-0">
          <h3 className="text-lg font-semibold text-white sm:text-xl">
            Tus espacios de trabajo
          </h3>
          <input
            type="text"
            placeholder="Buscar proyecto"
            className="px-3 py-2 text-sm text-white border border-action rounded-xl focus:border-action-hover focus:outline focus:outline-action-hover sm:w-72 lg:w-96"
          />
        </div>
        <div className="grid grid-cols-1 gap-8 place-items-center md:grid-cols-2 xl:grid-cols-3">
          <div className="w-full bg-action h-44 rounded-xl flex items-center justify-center p-3 cursor-pointer hover:bg-action-hover sm:w-80 xl:max-w-[368px]">
            <span className="text-sm font-bold text-gray-200">
              Crear un proyecto
            </span>
          </div>
          <div className="w-full bg-surface h-44 rounded-xl flex flex-col justify-between p-3 cursor-pointer hover:bg-surface-hover sm:w-80 xl:max-w-[368px]">
            <span className="text-sm font-bold text-gray-200">
              Titulo del poryecto
            </span>
            <span className="text-xs text-[#A1A1AA]">30/04/2025</span>
          </div>
          <div className="w-full bg-surface h-44 rounded-xl flex flex-col justify-between p-3 cursor-pointer hover:bg-surface-hover sm:w-80 xl:max-w-[368px]">
            <span className="text-sm font-bold text-gray-200">
              Titulo del poryecto
            </span>
            <span className="text-xs text-[#A1A1AA]">30/04/2025</span>
          </div>
          <div className="w-full bg-surface h-44 rounded-xl flex flex-col justify-between p-3 cursor-pointer hover:bg-surface-hover sm:w-80 xl:max-w-[368px]">
            <span className="text-sm font-bold text-gray-200">
              Titulo del poryecto
            </span>
            <span className="text-xs text-[#A1A1AA]">30/04/2025</span>
          </div>
          <div className="w-full bg-surface h-44 rounded-xl flex flex-col justify-between p-3 cursor-pointer hover:bg-surface-hover sm:w-80 xl:max-w-[368px]">
            <span className="text-sm font-bold text-gray-200">
              Titulo del poryecto
            </span>
            <span className="text-xs text-[#A1A1AA]">30/04/2025</span>
          </div>
          <div className="w-full bg-surface h-44 rounded-xl flex flex-col justify-between p-3 cursor-pointer hover:bg-surface-hover sm:w-80 xl:max-w-[368px]">
            <span className="text-sm font-bold text-gray-200">
              Titulo del poryecto
            </span>
            <span className="text-xs text-[#A1A1AA]">30/04/2025</span>
          </div>
          <div className="w-full bg-surface h-44 rounded-xl flex flex-col justify-between p-3 cursor-pointer hover:bg-surface-hover sm:w-80 xl:max-w-[368px]">
            <span className="text-sm font-bold text-gray-200">
              Titulo del poryecto
            </span>
            <span className="text-xs text-[#A1A1AA]">30/04/2025</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default page;
