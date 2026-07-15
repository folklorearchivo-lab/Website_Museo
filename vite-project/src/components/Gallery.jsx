import { useMemo, useState, useEffect } from 'react'
import { useReveal } from '../hooks/useReveal'
import ObraCard from './ObraCard'
import { getGaleriaPublicaRequest } from '../services/api'
import { socket } from '../services/socket'

function Gallery() {
  const [obras, setObras] = useState([])
  const [categorias, setCategorias] = useState(['Todas'])
  const [filtro, setFiltro] = useState('Todas')
  const { ref, isVisible } = useReveal(0.2)

  const fetchObras = async () => {
    try {
      const data = await getGaleriaPublicaRequest()
      const obrasMapeadas = data.map(o => ({
        ...o,
        id: o.id_obra,
        categoria: o.tipo_patrimonio || 'N/A',
        imagenUrl: o.multimedia && o.multimedia[0] ? o.multimedia[0].url_archivo : null,
        autor: o.cultor ? `${o.cultor.primer_nombre} ${o.cultor.primer_apellido}` : 'Cultor Anónimo',
        ubicacion: o.ubicacion_actual || 'Ubicación no especificada'
      }))
      setObras(obrasMapeadas)
      const cats = new Set(obrasMapeadas.map(o => o.categoria))
      setCategorias(['Todas', ...Array.from(cats)])
    } catch (error) {
      console.error("Error al cargar la galería", error)
    }
  }

  const obrasFiltradas = useMemo(() => {
    if (filtro === 'Todas') return obras
    return obras.filter((obra) => obra.tipo_patrimonio === filtro)
  }, [obras, filtro])

  useEffect(() => {
    fetchObras()
  }, [])

  useEffect(() => {
    socket.on('obra:updated', fetchObras)
    socket.on('admin:update', fetchObras)
    return () => {
      socket.off('obra:updated', fetchObras)
      socket.off('admin:update', fetchObras)
    }
  }, [])

  return (
    <section
      id="galeria"
      ref={ref}
      className="relative scroll-mt-20 bg-gallery-cream py-28"
    >
      <div className="pointer-events-none absolute top-0 w-full h-[12rem] bg-gradient-to-b from-linen via-linen/60 to-linen/0" />

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
        <div className="mt-16 columns-1 gap-8 sm:columns-2 lg:columns-3">
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
