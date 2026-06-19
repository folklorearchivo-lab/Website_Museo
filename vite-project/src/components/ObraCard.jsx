import { useState } from 'react'

const aspectRatios = ['aspect-[3/4]', 'aspect-square', 'aspect-[4/5]', 'aspect-[2/3]']

function ObraCard({ obra }) {
  const aspecto = aspectRatios[obra.id % aspectRatios.length]
  const [errorImagen, setErrorImagen] = useState(false)

  return (
    <article className="group">
      <div className={`relative ${aspecto} overflow-hidden rounded-2xl bg-gradient-to-br from-warm-sand/60 via-warm-sand/30 to-[#8E7257]/40 shadow-lg shadow-cafe-noir/10`}>
        {errorImagen ? (
          <div className="flex h-full w-full items-center justify-center">
            <svg
              className="h-10 w-10 text-cafe-noir/40"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.25"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 15.75l5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159M14.25 14.25l1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M2.25 8.25h19.5M3.75 8.25v9a2.25 2.25 0 0 0 2.25 2.25h12a2.25 2.25 0 0 0 2.25-2.25v-9"
              />
            </svg>
          </div>
        ) : (
          <img
            src={obra.imagenUrl}
            alt={obra.titulo}
            loading="lazy"
            onError={() => setErrorImagen(true)}
            className="h-full w-full object-cover transition-transform duration-500 sepia-[.2] contrast-[1.05] saturate-[.95] group-hover:scale-105"
          />
        )}
        <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-white/40 px-3 py-1 font-sans text-[10px] font-semibold uppercase tracking-wider text-mauve shadow-sm backdrop-blur-md">
          <span className="h-1.5 w-1.5 rounded-full bg-mauve" />
          {obra.categoria}
        </span>
      </div>

      <div className="mt-3 border-t border-primary/20 pt-3">
        <h3 className="font-serif text-lg text-cafe-noir">{obra.titulo}</h3>
        <p className="mt-1 font-sans text-sm text-primary">Por {obra.autor}</p>
        <p className="mt-0.5 font-sans text-xs italic text-secondary">{obra.ubicacion}</p>
      </div>
    </article>
  )
}

export default ObraCard
