import { useState, useEffect } from 'react'
import { useReveal } from '../hooks/useReveal'
import ObraCard from './ObraCard'
import { getExposicionActivaRequest } from '../services/api'

function Eventos() {
  const { ref, isVisible } = useReveal(0)
  const [eventoActual, setEventoActual] = useState(null)
  const [obrasEvento, setObrasEvento] = useState([])
  const [fotosDirectas, setFotosDirectas] = useState([])

  useEffect(() => {
    const fetchExposicion = async () => {
      try {
        const data = await getExposicionActivaRequest()
        if (data && data.exposicion) {
          setEventoActual({
            titulo: data.exposicion.nombre_exposicion,
            descripcion: data.exposicion.descripcion,
            fechaInicio: data.exposicion.fecha_inicio,
            fechaFin: data.exposicion.fecha_fin,
            organizador: data.exposicion.organizador,
            lugarFisico: data.exposicion.lugar_fisico
          })
          
          if (data.obras && data.obras.length > 0) {
            setObrasEvento(data.obras.map(o => ({
              ...o,
              id: o.id_obra,
              categoria: o.tipo_patrimonio || 'N/A',
              imagenUrl: o.multimedia && o.multimedia[0] ? o.multimedia[0].url_archivo : null,
              autor: o.cultor ? `${o.cultor.primer_nombre} ${o.cultor.primer_apellido}` : 'Cultor Anónimo',
              ubicacion: o.ubicacion_actual || 'Ubicación no especificada'
            })))
          } else {
            setObrasEvento([])
          }

          if (data.fotosDirectas && data.fotosDirectas.length > 0) {
            setFotosDirectas(data.fotosDirectas)
          } else {
            setFotosDirectas([])
          }
        }
      } catch (error) {
        console.error("Error fetching exposicion", error)
      }
    }
    fetchExposicion()

    const handleVisibility = () => {
      if (document.visibilityState === 'visible') fetchExposicion()
    }
    document.addEventListener('visibilitychange', handleVisibility)
    return () => document.removeEventListener('visibilitychange', handleVisibility)
  }, [])

  const formatFecha = (fechaString) => {
    if (!fechaString) return ''
    const parts = fechaString.split('T')[0].split('-')
    if (parts.length !== 3) return new Date(fechaString).toLocaleDateString('es-ES')
    const year = parseInt(parts[0], 10)
    const month = parseInt(parts[1], 10) - 1
    const day = parseInt(parts[2], 10)
    const date = new Date(year, month, day)
    const opciones = { year: 'numeric', month: 'long', day: 'numeric' }
    return date.toLocaleDateString('es-ES', opciones)
  }

  return (
    <section
      id="eventos"
      ref={ref}
      className="relative scroll-mt-20 overflow-hidden bg-linen py-16 lg:py-20"
    >
      {/* Fundido desde la sección anterior (Nosotros) */}
      <div className="pointer-events-none absolute top-0 w-full h-[32rem] bg-gradient-to-b from-gallery-cream via-gallery-cream/60 to-gallery-cream/0" />

      <div className={`relative mx-auto max-w-6xl px-6 transition-all duration-1000 ease-out transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
        
        {eventoActual ? (() => {

          return (
            <div className="flex flex-col items-center">
              {/* Encabezado elegante sin caja */}
              <div className="text-center max-w-3xl">
                <span className="font-sans text-sm md:text-base font-semibold uppercase tracking-[0.25em] text-tertiary">
                  Exposición Actual
                </span>
                <h2 className="mt-4 font-serif text-4xl text-cafe-noir lg:text-5xl leading-tight">
                  {eventoActual.titulo}
                </h2>
                <div className="mx-auto mt-6 h-px w-20 bg-primary/40" />
                {eventoActual.descripcion && (
                  <p className="mx-auto mt-6 max-w-xl font-sans leading-relaxed text-primary">
                    {eventoActual.descripcion}
                  </p>
                )}

                {/* Organizador y Lugar */}
                {(eventoActual.organizador || eventoActual.lugarFisico) && (
                  <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-sans text-sm text-cafe-noir/70">
                    {eventoActual.organizador && (
                      <span>
                        <strong className="font-semibold text-cafe-noir">Organiza:</strong> {eventoActual.organizador}
                      </span>
                    )}
                    {eventoActual.lugarFisico && (
                      <span>
                        <strong className="font-semibold text-cafe-noir">Lugar:</strong> {eventoActual.lugarFisico}
                      </span>
                    )}
                  </div>
                )}

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

              {/* Obras y Fotos */}
              <div className="mt-24 w-full">
                {(obrasEvento.length > 0 || fotosDirectas.length > 0) ? (
                  <div className="columns-1 gap-8 sm:columns-2 lg:columns-3">
                    {obrasEvento.map((obra) => (
                      <div key={obra.id} className="mb-8 break-inside-avoid">
                        <ObraCard obra={obra} />
                      </div>
                    ))}
                    {fotosDirectas.map((foto) => (
                      <div key={`foto-${foto.id_foto}`} className="mb-8 break-inside-avoid">
                        <div className="group overflow-hidden rounded-2xl bg-white shadow-lg">
                          <img
                            src={foto.url_archivo}
                            alt="Foto de exposición"
                            className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                            style={{ aspectRatio: '3/4' }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center font-sans text-lg text-primary/70">
                    Aún no hay obras ni fotos asignadas a esta exposición.
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
