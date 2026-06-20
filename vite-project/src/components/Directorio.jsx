import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { cultoresIniciales } from '../data/mockData'
import { useReveal } from '../hooks/useReveal'

function Directorio({ onSelectCultor }) {
  const { user } = useAuth()
  const { ref, isVisible } = useReveal(0)
  const [searchTerm, setSearchTerm] = useState('')

  // Filtrar cultores en base a la búsqueda
  const cultoresFiltrados = cultoresIniciales.filter((cultor) => {
    const term = searchTerm.toLowerCase()
    return (
      cultor.nombres.toLowerCase().includes(term) ||
      cultor.apellidos.toLowerCase().includes(term) ||
      cultor.oficio.toLowerCase().includes(term) ||
      cultor.municipio.toLowerCase().includes(term)
    )
  })

  // Solo mostrar si el usuario está logueado
  if (!user) return null

  return (
    <section id="directorio" ref={ref} className="relative scroll-mt-20 bg-linen py-20 lg:py-32 overflow-hidden border-t border-cafe-noir/10">
      <div className={`mx-auto max-w-6xl px-6 transition-all duration-1000 ease-out transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
        
        <div className="text-center mb-12">
          <span className="font-sans text-xs uppercase tracking-[0.25em] text-tertiary">
            Herramienta Exclusiva
          </span>
          <h2 className="mt-4 font-serif text-4xl text-cafe-noir lg:text-5xl">
            Directorio de Cultores
          </h2>
          <div className="mx-auto mt-6 h-px w-20 bg-primary" />
          <p className="mx-auto mt-6 max-w-xl font-sans leading-relaxed text-primary">
            Conecta y conoce a otros cultores aprobados dentro de la red del archivo regional.
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
        </div>

        {cultoresFiltrados.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {cultoresFiltrados.map((cultor) => (
            <div key={cultor.id} className="group flex flex-col relative overflow-hidden rounded-2xl bg-white shadow-lg transition-transform hover:-translate-y-1 hover:shadow-xl">
              <div className="aspect-[4/3] w-full bg-cafe-noir/5 relative">
                {cultor.fotoUrl ? (
                  <img src={cultor.fotoUrl} alt={cultor.nombres} className="h-full w-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-dark-umber/10 text-cafe-noir/30">
                    <svg className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                )}
              </div>
              <div className="flex flex-col flex-grow p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-serif text-2xl text-cafe-noir">{cultor.nombres} {cultor.apellidos}</h3>
                  {cultor.estado && (
                    <span className="inline-flex items-center rounded-full bg-tertiary/10 px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-widest text-tertiary">
                      {cultor.estado}
                    </span>
                  )}
                </div>
                
                <p className="font-sans text-sm uppercase tracking-widest text-tertiary mb-4">{cultor.oficio}</p>
                
                {cultor.bio && (
                  <p className="font-sans text-sm text-cafe-noir/80 mb-6 line-clamp-3 leading-relaxed flex-grow">
                    "{cultor.bio}"
                  </p>
                )}

                <div className="mt-auto pt-4 border-t border-cafe-noir/10 flex flex-col gap-3">
                  <div className="flex items-center justify-between text-cafe-noir/70 font-sans text-xs">
                    <div className="flex items-center gap-1.5">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {cultor.municipio}
                    </div>
                    {cultor.obrasCount && (
                      <div className="font-semibold text-tertiary">
                        {cultor.obrasCount} Obras
                      </div>
                    )}
                  </div>
                  
                  <div className="flex gap-2 mt-2">
                    <button 
                      onClick={() => onSelectCultor(cultor)}
                      className="flex-1 rounded bg-cafe-noir/5 py-2 font-sans text-xs font-semibold uppercase tracking-wide text-cafe-noir transition-colors hover:bg-cafe-noir hover:text-white"
                    >
                      Ver Perfil Completo
                    </button>
                  </div>
                </div>
              </div>
            </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white/50 rounded-3xl border border-cafe-noir/5 max-w-2xl mx-auto">
            <svg className="mx-auto h-12 w-12 text-cafe-noir/20 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <h3 className="font-serif text-xl text-cafe-noir mb-2">No se encontraron resultados</h3>
            <p className="font-sans text-cafe-noir/60">No hay cultores que coincidan con "{searchTerm}". Intenta con otros términos.</p>
          </div>
        )}

      </div>
    </section>
  )
}

export default Directorio
