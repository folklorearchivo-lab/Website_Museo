import { useMemo, useState } from 'react'
import { categorias, cultoresIniciales, obrasIniciales } from '../data/mockData'
import ObraCard from './ObraCard'

function Gallery() {
  const [obras] = useState(obrasIniciales)
  const [cultores] = useState(cultoresIniciales)
  const [filtro, setFiltro] = useState('Todas')

  const obrasFiltradas = useMemo(() => {
    if (filtro === 'Todas') return obras
    return obras.filter((obra) => obra.categoria === filtro)
  }, [obras, filtro])

  return (
    <section
      id="galeria"
      className="relative scroll-mt-20 overflow-hidden bg-gradient-to-b from-[#C5A687] via-[#BC9A78] to-[#A98B6E] py-28"
    >
      {/* Toques decorativos para que el fondo no se vea plano en secciones largas */}
      <div
        aria-hidden="true"
        className="absolute left-[10%] top-40 h-72 w-72 rounded-full bg-warm-sand/40 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute right-[8%] top-[55%] h-80 w-80 rounded-full bg-[#8E7257]/30 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-24 left-[20%] h-64 w-64 rounded-full bg-[#C5A687]/40 blur-3xl"
      />

      <div className="relative mx-auto max-w-5xl px-6">
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

        {/* Cultores destacados — panel cristalino */}
        <div className="mx-auto mt-14 flex max-w-2xl flex-wrap justify-center gap-6 rounded-3xl border border-white/35 bg-white/25 px-5 py-6 shadow-xl shadow-cafe-noir/10 backdrop-blur-md sm:gap-10 sm:px-8 sm:py-7">
          {cultores.map((cultor) => (
            <div key={cultor.id} className="flex items-center gap-4">
              <img
                src={cultor.fotoUrl}
                alt={`${cultor.nombres} ${cultor.apellidos}`}
                className="h-14 w-14 rounded-full border-2 border-white/80 object-cover shadow-md sepia-[.25] contrast-[1.05]"
              />
              <div className="text-left">
                <p className="font-serif text-base text-cafe-noir">
                  {cultor.nombres} {cultor.apellidos}
                </p>
                <p className="font-sans text-xs uppercase tracking-wider text-primary">
                  {cultor.oficio} · {cultor.municipio}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Filtros tipo píldora cristalina */}
        <div className="mt-12 flex flex-wrap justify-center gap-3">
          {categorias.map((categoria) => (
            <button
              key={categoria}
              type="button"
              onClick={() => setFiltro(categoria)}
              className={`rounded-full px-5 py-2 font-sans text-xs uppercase tracking-[0.15em] backdrop-blur-sm transition-all ${
                filtro === categoria
                  ? 'bg-tertiary text-linen shadow-md'
                  : 'border border-white/35 bg-white/20 text-cafe-noir shadow-sm hover:bg-white/40'
              }`}
            >
              {categoria}
            </button>
          ))}
        </div>

        {/* Galería tipo masonry */}
        <div className="mt-16 columns-1 gap-6 md:columns-2 lg:columns-3">
          {obrasFiltradas.map((obra) => (
            <div key={obra.id} className="mb-6 break-inside-avoid">
              <ObraCard obra={obra} />
            </div>
          ))}
        </div>

        {obrasFiltradas.length === 0 && (
          <p className="mt-16 text-center font-sans text-primary">
            Aún no hay registros en esta categoría.
          </p>
        )}

        <div className="mt-16 flex justify-center">
          <button
            type="button"
            className="rounded-full border border-white/35 bg-white/20 px-8 py-3 font-sans text-sm font-semibold uppercase tracking-wider text-cafe-noir shadow-sm backdrop-blur-sm transition-all hover:bg-primary hover:text-linen"
          >
            Ver más obras
          </button>
        </div>
      </div>
    </section>
  )
}

export default Gallery
