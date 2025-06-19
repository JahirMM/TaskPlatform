function NotificationItem() {
  return (
    <li className="px-4 py-3 transition-colors hover:bg-white/5">
      <p className="text-sm font-medium text-white">
        <span className="font-semibold text-action">Carlos R.</span> te ha
        invitado a un proyecto
      </p>
      <p className="mt-1 text-xs text-gray-400">
        Proyecto:{" "}
        <span className="font-medium text-gray-300">Landing Page App</span>
      </p>
      <time className="block mt-1 text-xs text-gray-500">
        17 de junio, 2025
      </time>
      <div className="flex justify-end gap-2 mt-3">
        <button
          type="button"
          className="px-2 py-1 text-xs text-white transition border rounded-md cursor-pointer border-action hover:bg-action/30"
        >
          Aceptar
        </button>
        <button
          type="button"
          className="px-2 py-1 text-xs text-red-400 transition border border-red-500 rounded-md cursor-pointer hover:bg-red-500/10"
        >
          Rechazar
        </button>
      </div>
    </li>
  );
}

export default NotificationItem;
