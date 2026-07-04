import { useState, useEffect } from 'react'
import { useReveal } from '../hooks/useReveal'
import { getEfemeridesPublicasRequest } from '../services/api'

const NOMBRES_MES = [
  'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
  'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre',
]

// Sección "Efemérides Culturales": se oculta sola (retorna null) cuando no hay
// ninguna efeméride activa, y aparece automáticamente en cuanto el admin activa
// al menos una desde el dashboard.
function Efemerides() {
  const { ref, isVisible } = useReveal(0)
  const [efemerides, setEfemerides] = useState([])
  const [cargado, setCargado] = useState(false)

  useEffect(() => {
    getEfemeridesPublicasRequest()
      .then(setEfemerides)
      .catch(() => setEfemerides([]))
      .finally(() => setCargado(true))
  }, [])

  if (!cargado || efemerides.length === 0) return null

  return (
    <section
      id="efemerides"
      ref={ref}
      className="relative scroll-mt-20 bg-gallery-cream py-16 lg:py-20 overflow-hidden border-t border-cafe-noir/10"
    >
      <div className={`mx-auto max-w-6xl px-6 transition-all duration-1000 ease-out transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-sans text-xs uppercase tracking-[0.25em] text-tertiary">
            Memoria y Tradición
          </span>
          <h2 className="mt-4 font-serif text-4xl text-cafe-noir lg:text-5xl">
            Efemérides Culturales
          </h2>
          <div className="mx-auto mt-6 h-px w-20 bg-primary" />
          <p className="mx-auto mt-6 font-sans leading-relaxed text-primary">
            Fechas destacadas del folklore y la historia cultural venezolana.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {efemerides.map((efe) => (
            <div
              key={efe.id_efemeride}
              className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-lg transition-transform hover:-translate-y-1 hover:shadow-xl"
            >
              {efe.imagen ? (
                <div className="aspect-[4/3] w-full bg-cafe-noir/5">
                  <img src={efe.imagen} alt={efe.titulo} className="h-full w-full object-cover" />
                </div>
              ) : null}
              <div className="flex flex-col flex-grow p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="inline-flex items-center rounded-full bg-tertiary/10 px-3 py-1 font-sans text-xs font-semibold uppercase tracking-wide text-tertiary">
                    {efe.dia} de {NOMBRES_MES[efe.mes - 1]}
                  </span>
                  {efe.anio_referencia && (
                    <span className="font-sans text-xs text-cafe-noir/50">{efe.anio_referencia}</span>
                  )}
                </div>
                <h3 className="font-serif text-xl text-cafe-noir mb-2">{efe.titulo}</h3>
                {efe.categoria && (
                  <p className="font-sans text-[11px] uppercase tracking-widest text-cafe-noir/40 mb-2">
                    {efe.categoria}
                  </p>
                )}
                {efe.descripcion && (
                  <p className="font-sans text-sm text-cafe-noir/80 leading-relaxed line-clamp-4">
                    {efe.descripcion}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Efemerides
