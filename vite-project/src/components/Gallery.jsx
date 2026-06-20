import { useMemo, useState } from 'react'
import { useReveal } from '../hooks/useReveal'
import { categorias, obrasIniciales } from '../data/mockData'
import ObraCard from './ObraCard'

function Gallery() {
  const [obras] = useState(obrasIniciales)
  const [filtro, setFiltro] = useState('Todas')
  const { ref, isVisible } = useReveal(0.1)

  const obrasFiltradas = useMemo(() => {
    if (filtro === 'Todas') return obras
    return obras.filter((obra) => obra.categoria === filtro)
  }, [obras, filtro])

  return (
    <section
      id="galeria"
      ref={ref}
      className="relative scroll-mt-20 overflow-hidden bg-gallery-cream py-28"
    >
      <div className={`relative mx-auto max-w-5xl px-6 transition-all duration-1000 ease-out transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
        <div className="text-center">
          <span className="font-sans text-xs uppercase tracking-[0.25em] text-tertiary">
            Colección pública
          </span>
          <h2 className="mt-4 font-serif text-4xl text-cafe-noir lg:text-5xl">
            Colección de obras artesanales
          </h2>
          <div className="mx-auto mt-6 h-px w-20 bg-primary" />
          <p className="mx-auto mt-6 max-w-xl font-sans leading-relaxed text-primary">
            Un mosaico vivo de técnicas, materiales e historias que dan forma
            al patrimonio artesanal del Táchira.
          </p>
        </div>


        {/* Filtros tipo píldora cristalina */}
        <div className="mt-12 flex flex-wrap justify-center gap-3">
          {categorias.map((categoria) => (
            <button
              key={categoria}
              type="button"
              onClick={() => setFiltro(categoria)}
              className={`rounded-full px-5 py-2 font-sans text-xs uppercase tracking-[0.15em] transition-all ${
                filtro === categoria
                  ? 'bg-cafe-noir text-linen'
                  : 'border border-cafe-noir/20 bg-transparent text-cafe-noir hover:border-cafe-noir/40'
              }`}
            >
              {categoria}
            </button>
          ))}
        </div>

        {/* Galería tipo masonry */}
        <div className="mt-16 columns-1 md:columns-3 gap-8">
          {obrasFiltradas.map((obra) => (
            <div key={obra.id} className="mb-8 break-inside-avoid">
              <ObraCard obra={obra} />
            </div>
          ))}
        </div>

        {obrasFiltradas.length === 0 && (
          <p className="mt-16 text-center font-sans text-primary">
            Aún no hay registros en esta categoría.
          </p>
        )}

      </div>
    </section>
  )
}

export default Gallery
