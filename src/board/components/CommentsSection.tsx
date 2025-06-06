export function CommentsSection() {
  return (
    <section className="mt-8">
      <h3 className="mb-4 text-sm font-medium text-white">Comentarios</h3>
      <div className="space-y-4">
        {/* Ejemplo de comentario */}
        <div className="p-4 rounded-lg bg-bg-secondary">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-8 h-8 text-sm font-medium text-white rounded-full bg-action">
                JM
              </div>
              <p className="text-sm font-medium text-white">Pedro Cuadrado (EJEMPLO)</p>
            </div>
            <span className="text-xs text-gray-400">05/06/2025</span>
          </div>
          <p className="text-sm text-gray-300">Texto del comentario (EJEMPLO)</p>
        </div>

        {/* Nuevo comentario */}
        <div className="mt-6">
          <textarea
            className="w-full px-3 py-2 text-sm text-white border rounded-lg outline-none resize-none border-bg-primary bg-bg-primary focus:border-action focus:ring-1 focus:ring-action"
            placeholder="Añadir un comentario..."
            rows={3}
          />
          <button className="px-4 py-2 mt-2 text-sm font-medium text-white transition-colors rounded-lg bg-action hover:bg-action-hover">
            Enviar comentario
          </button>
        </div>
      </div>
    </section>
  );
}
