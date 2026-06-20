import { useReveal } from '../hooks/useReveal'
import { eventosProgramados, obrasIniciales } from '../data/mockData'
import ObraCard from './ObraCard'

function Eventos() {
  const { ref, isVisible } = useReveal(0.1)
  const eventoActual = eventosProgramados.find((e) => e.activa)

  const formatFecha = (fechaString) => {
    const opciones = { year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(fechaString).toLocaleDateString('es-ES', opciones)
  }

  return (
    <section
      id="eventos"
      ref={ref}
      className="relative scroll-mt-20 overflow-hidden bg-linen py-24 lg:py-32"
    >
      {/* Fundido desde la sección anterior (Galería) */}
      <div className="pointer-events-none absolute top-0 w-full h-[32rem] bg-gradient-to-b from-gallery-cream via-gallery-cream/60 to-gallery-cream/0" />

      <div className={`relative mx-auto max-w-6xl px-6 transition-all duration-1000 ease-out transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
        
        {eventoActual ? (() => {
          const obrasEvento = obrasIniciales.filter(obra => eventoActual.obrasIds.includes(obra.id))

          return (
            <div className="flex flex-col items-center">
              {/* Encabezado elegante sin caja */}
              <div className="text-center max-w-3xl">

                
                <h2 className="mt-4 font-serif text-5xl lg:text-6xl text-cafe-noir leading-tight">
                  {eventoActual.titulo}
                </h2>
                
                <div className="mx-auto mt-8 h-px w-20 bg-primary/40" />

                <p className="mt-8 font-sans text-lg text-cafe-noir/80 leading-relaxed">
                  {eventoActual.descripcion}
                </p>

                {/* Bloque de Fechas Limpio */}
                <div className="mt-12 inline-flex flex-col sm:flex-row items-center gap-6 sm:gap-8 rounded-full border border-cafe-noir/10 bg-white/40 px-8 py-3.5 shadow-sm backdrop-blur-sm">
                  <div className="flex items-center gap-3">
                    <span className="h-2 w-2 rounded-full bg-green-500/80 animate-pulse" />
                    <span className="font-sans text-xs uppercase tracking-[0.15em] text-cafe-noir">
                      <strong className="font-semibold">Apertura:</strong> <span className="text-primary/90">{formatFecha(eventoActual.fechaInicio)}</span>
                    </span>
                  </div>
                  <span className="hidden sm:inline h-4 w-px bg-cafe-noir/20" />
                  <div className="flex items-center gap-3">
                    <span className="h-2 w-2 rounded-full bg-tertiary/60" />
                    <span className="font-sans text-xs uppercase tracking-[0.15em] text-cafe-noir">
                      <strong className="font-semibold">Cierre:</strong> <span className="text-primary/90">{formatFecha(eventoActual.fechaFin)}</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Obras */}
              <div className="mt-24 w-full">
                {obrasEvento.length > 0 ? (
                  <div className="columns-1 gap-8 sm:columns-2 lg:columns-3">
                    {obrasEvento.map((obra) => (
                      <div key={obra.id} className="mb-8 break-inside-avoid">
                        <ObraCard obra={obra} />
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center font-sans text-lg text-primary/70">
                    Aún no hay obras asignadas a esta exposición.
                  </p>
                )}
              </div>
            </div>
          )
        })() : (
          <div className="text-center">
            <span className="font-sans text-xs uppercase tracking-[0.25em] text-tertiary">
              Exposiciones
            </span>
            <p className="mt-8 font-serif text-2xl text-cafe-noir/60">
              No hay exposiciones activas en este momento.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}

export default Eventos
