import { useState, useEffect } from 'react'
import { getCultoresPublicosRequest } from '../services/api'
import { socket } from '../services/socket'
import { useReveal } from '../hooks/useReveal'
import { useAuth } from '../context/AuthContext'

const CULTORES_POR_PAGINA = 6

function Directorio({ onSelectCultor, onOpenLogin }) {
  const { ref, isVisible } = useReveal(0)
  const { user } = useAuth()
  const [searchTerm, setSearchTerm] = useState('')
  const [filtroCategoria, setFiltroCategoria] = useState('Todas')
  const [cultores, setCultores] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [paginaActual, setPaginaActual] = useState(1)
  const [pausado, setPausado] = useState(false)

  useEffect(() => {
    let cancelled = false
    getCultoresPublicosRequest()
      .then((data) => { if (!cancelled) setCultores(data) })
      .catch(() => { if (!cancelled) setCultores([]) })
      .finally(() => { if (!cancelled) setIsLoading(false) })
    return () => { cancelled = true }
  }, [])

  useEffect(() => {
    const reFetch = () => {
      getCultoresPublicosRequest()
        .then((data) => setCultores(data))
        .catch(() => setCultores([]))
    }
    socket.on('cultor:updated', reFetch)
    socket.on('admin:update', reFetch)
    return () => {
      socket.off('cultor:updated', reFetch)
      socket.off('admin:update', reFetch)
    }
  }, [])

  const categorias = [
    'Todas',
    ...Array.from(new Set(cultores.map((c) => c.oficio).filter(Boolean))),
  ]

  // Reiniciar paginación al cambiar filtros
  useEffect(() => {
    setPaginaActual(1)
  }, [searchTerm, filtroCategoria])

  const cultoresFiltrados = cultores.filter((cultor) => {
    const term = searchTerm.toLowerCase()
    const coincideTexto =
      cultor.nombre_completo?.toLowerCase().includes(term) ||
      cultor.oficio?.toLowerCase().includes(term) ||
      cultor.municipio?.toLowerCase().includes(term)

    const coincideCategoria =
      filtroCategoria === 'Todas' ||
      cultor.oficio?.toLowerCase().includes(filtroCategoria.toLowerCase())

    return coincideTexto && coincideCategoria
  })

  const totalPaginas = Math.max(1, Math.ceil(cultoresFiltrados.length / CULTORES_POR_PAGINA))
  const cultoresVisibles = cultoresFiltrados.slice(
    (paginaActual - 1) * CULTORES_POR_PAGINA,
    paginaActual * CULTORES_POR_PAGINA
  )

  const irAPagina = (pagina) => {
    setPaginaActual(pagina)
    document.getElementById('directorio')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  // Avance automático tipo carrusel: cada 6s pasa al siguiente grupo de cultores y
  // vuelve al inicio al llegar al final. Se pausa mientras el usuario tiene el mouse
  // encima, y el temporizador se reinicia con cada cambio de página (manual o
  // automático) para que siempre haya el mismo respiro entre transiciones.
  useEffect(() => {
    if (totalPaginas <= 1 || pausado) return
    const intervalo = setInterval(() => {
      setPaginaActual((prev) => (prev >= totalPaginas ? 1 : prev + 1))
    }, 6000)
    return () => clearInterval(intervalo)
  }, [totalPaginas, pausado, paginaActual])

  return (
    <section id="directorio" ref={ref} className="relative scroll-mt-20 bg-linen py-20 lg:py-32 overflow-hidden border-t border-cafe-noir/10">
      <div className={`mx-auto max-w-6xl px-6 transition-all duration-1000 ease-out transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>

        <div className="text-center mb-12">
          <span className="font-sans text-xs uppercase tracking-[0.25em] text-tertiary">
            Red Cultural
          </span>
          <h2 className="mt-4 font-serif text-4xl text-cafe-noir lg:text-5xl">
            Directorio de Cultores
          </h2>
          <div className="mx-auto mt-6 h-px w-20 bg-primary" />
          <p className="mx-auto mt-6 max-w-xl font-sans leading-relaxed text-primary">
            Conoce a los cultores que forman parte del archivo regional.
          </p>
        </div>

        {/* Buscador */}
        <div className="max-w-2xl mx-auto mb-16 relative">
          <div className="relative flex items-center w-full h-14 rounded-full bg-white shadow-sm border border-cafe-noir/10 focus-within:ring-2 focus-within:ring-tertiary/50 focus-within:border-tertiary transition-all">
            <div className="pl-6 pr-4 text-cafe-noir/40">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Buscar por nombre, especialidad o municipio..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full h-full bg-transparent border-none text-cafe-noir placeholder-cafe-noir/40 font-sans focus:outline-none pr-6"
            />
          </div>

          {categorias.length > 1 && (
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              {categorias.map((categoria) => (
                <button
                  key={categoria}
                  type="button"
                  onClick={() => setFiltroCategoria(categoria)}
                  className={`rounded-full px-5 py-2 font-sans text-xs uppercase tracking-[0.15em] transition-all ${
                    filtroCategoria === categoria
                      ? 'bg-cafe-noir text-linen'
                      : 'border border-cafe-noir/20 bg-transparent text-cafe-noir hover:border-cafe-noir/40'
                  }`}
                >
                  {categoria}
                </button>
              ))}
            </div>
          )}
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex flex-col rounded-2xl bg-white shadow-lg overflow-hidden animate-pulse">
                <div className="aspect-[4/3] w-full bg-cafe-noir/5" />
                <div className="p-6 space-y-4">
                  <div className="h-6 bg-cafe-noir/5 rounded w-3/4" />
                  <div className="h-4 bg-cafe-noir/5 rounded w-1/2" />
                  <div className="h-12 bg-cafe-noir/5 rounded w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : cultoresFiltrados.length > 0 ? (
          <>
          <style>{`
            @keyframes directorioFade {
              from { opacity: 0; transform: translateX(16px); }
              to { opacity: 1; transform: translateX(0); }
            }
            .directorio-carrusel-track {
              animation: directorioFade 0.5s ease;
            }
          `}</style>
          <div
            className="flex items-center gap-2 sm:gap-4 lg:gap-6"
            onMouseEnter={() => setPausado(true)}
            onMouseLeave={() => setPausado(false)}
          >
            {totalPaginas > 1 && (
              <button
                type="button"
                onClick={() => irAPagina(Math.max(1, paginaActual - 1))}
                disabled={paginaActual === 1}
                aria-label="Cultores anteriores"
                className="flex h-12 w-12 shrink-0 items-center justify-center self-center rounded-full border border-cafe-noir/10 bg-white text-cafe-noir shadow-xl transition-all hover:bg-tertiary hover:text-white hover:scale-105 disabled:pointer-events-none disabled:opacity-30 lg:h-14 lg:w-14"
              >
                <svg className="h-5 w-5 lg:h-6 lg:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}

          <div key={paginaActual} className="directorio-carrusel-track grid min-w-0 flex-1 grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {cultoresVisibles.map((cultor) => (
              <div key={cultor.id} className="group flex flex-col relative overflow-hidden rounded-2xl bg-white shadow-lg transition-transform hover:-translate-y-1 hover:shadow-xl">
                {cultor.rol && (
                  <span className="absolute top-3 right-3 z-10 inline-flex items-center rounded-full bg-tertiary/90 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest text-white shadow-sm">
                    {cultor.rol}
                  </span>
                )}
                <div className="h-[32rem] w-full bg-gradient-to-b from-cafe-noir/5 to-cafe-noir/10 relative overflow-hidden">
                  {cultor.foto_perfil ? (
                    <img src={cultor.foto_perfil} alt={cultor.nombre_completo} className="h-full w-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-dark-umber/10 text-cafe-noir/30">
                      <svg className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                  )}
                </div>
                  <div className="flex flex-col flex-grow p-6">
                  <h3 className="font-serif text-2xl text-cafe-noir mb-2">{cultor.nombre_completo}</h3>

                  <p className="font-sans text-sm uppercase tracking-widest text-tertiary mb-4">{cultor.oficio || '—'}</p>

                  {cultor.resumen_curricular && (
                    <p className="font-sans text-sm text-cafe-noir/80 mb-6 line-clamp-3 leading-relaxed flex-grow">
                      &ldquo;{cultor.resumen_curricular}&rdquo;
                    </p>
                  )}

                  <div className="mt-auto pt-4 border-t border-cafe-noir/10">
                    <div className="flex items-center justify-between text-cafe-noir/70 font-sans text-xs">
                      {cultor.municipio && (
                        <div className="flex items-center gap-1.5">
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          {cultor.municipio}
                        </div>
                      )}
                    </div>

                    {/* Contacto: visible para cualquier visitante (sin necesidad de iniciar
                        sesión) — solo aparece si el propio cultor activó mostrarlo
                        públicamente (mostrar_contacto_publico); si no, el backend ya
                        manda estos campos en null. */}
                    {(cultor.telefono_contacto || cultor.correo_contacto) && (
                      <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 font-sans text-xs">
                        {cultor.telefono_contacto && (
                          <a
                            href={`tel:${cultor.telefono_contacto}`}
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-1 text-emerald-700 hover:underline"
                          >
                            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                            {cultor.telefono_contacto}
                          </a>
                        )}
                        {cultor.correo_contacto && (
                          <a
                            href={`mailto:${cultor.correo_contacto}`}
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-1 text-emerald-700 hover:underline truncate max-w-full"
                          >
                            <svg className="h-3.5 w-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                            <span className="truncate">{cultor.correo_contacto}</span>
                          </a>
                        )}
                      </div>
                    )}

                    <div className="flex gap-2 mt-2">
                      {user ? (
                        <button
                          onClick={() => onSelectCultor(cultor)}
                          className="flex-1 rounded bg-cafe-noir/5 py-2 font-sans text-xs font-semibold uppercase tracking-wide text-cafe-noir transition-colors hover:bg-cafe-noir hover:text-white"
                        >
                          Ver Perfil Completo
                        </button>
                      ) : (
                        <button
                          onClick={onOpenLogin}
                          className="flex-1 rounded border border-tertiary/30 py-2 font-sans text-xs font-semibold uppercase tracking-wide text-tertiary transition-colors hover:bg-tertiary hover:text-white"
                        >
                          Inicia sesión para ver perfil
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

            {totalPaginas > 1 && (
              <button
                type="button"
                onClick={() => irAPagina(Math.min(totalPaginas, paginaActual + 1))}
                disabled={paginaActual === totalPaginas}
                aria-label="Más cultores"
                className="flex h-12 w-12 shrink-0 items-center justify-center self-center rounded-full border border-cafe-noir/10 bg-white text-cafe-noir shadow-xl transition-all hover:bg-tertiary hover:text-white hover:scale-105 disabled:pointer-events-none disabled:opacity-30 lg:h-14 lg:w-14"
              >
                <svg className="h-5 w-5 lg:h-6 lg:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}
          </div>
          </>
        ) : (
          <div className="text-center py-20 bg-white/50 rounded-3xl border border-cafe-noir/5 max-w-2xl mx-auto">
            <svg className="mx-auto h-12 w-12 text-cafe-noir/20 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <h3 className="font-serif text-xl text-cafe-noir mb-2">No se encontraron resultados</h3>
            <p className="font-sans text-cafe-noir/60">No hay cultores que coincidan con &ldquo;{searchTerm}&rdquo;. Intenta con otros términos.</p>
          </div>
        )}

      </div>
    </section>
  )
}

export default Directorio