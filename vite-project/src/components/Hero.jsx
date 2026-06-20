import cesteriaImg from '../assets/Cesteria.jpeg'
import { useAuth } from '../context/AuthContext'

const stats = [
  { value: '+120', label: 'Obras digitalizadas' },
  { value: '+45', label: 'Cultores activos' },
  { value: '29', label: 'Municipios' },
]

function Hero({ onOpenRegister }) {
  const { user } = useAuth()
  return (
    <header id="inicio" className="relative flex min-h-screen items-center overflow-hidden">
      {/* Fotografía real: cestería artesanal del Táchira */}
      <img
        src={cesteriaImg}
        alt="Cestería artesanal del Táchira"
        className="absolute inset-0 h-full w-full object-cover"
      />
      {/* Overlay de archivo histórico: tono vintage sin opacar la foto */}
      <div className="absolute inset-0 bg-[#291804]/70" />
      {/* Fundido inferior: transición perfecta a la Galería (fondo sólido) */}
      <div className="absolute bottom-0 w-full h-[32rem] bg-gradient-to-t from-gallery-cream via-gallery-cream/60 to-gallery-cream/0 pointer-events-none" />

      <div className="relative mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 sm:py-28">
        <div className="mx-auto h-px w-20 bg-warm-sand/60" />

        <h1 className="mt-8 font-serif text-4xl leading-[1.08] text-linen [text-shadow:0_2px_18px_rgba(41,24,4,0.7)] sm:text-5xl md:text-6xl lg:text-7xl">
          Preservando la Memoria
          <br />
          Cultural del Táchira
        </h1>

        <div className="mx-auto mt-8 h-px w-20 bg-warm-sand/60" />

        <p className="mx-auto mt-8 max-w-2xl font-sans text-base leading-relaxed text-linen/95 [text-shadow:0_1px_10px_rgba(41,24,4,0.6)] sm:text-lg first-letter:text-3xl first-letter:font-serif first-letter:text-warm-sand first-letter:mr-0.5 sm:first-letter:text-4xl">
          Un archivo digital colaborativo que rescata el oficio, la mano y la
          historia de nuestros cultores, conectando a los artesanos del
          Táchira con quienes valoran su legado.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <a
            href="#galeria"
            className="group inline-flex items-center gap-2 rounded-full bg-tertiary px-7 py-3 font-sans text-sm font-semibold uppercase tracking-wider text-linen shadow-lg shadow-cafe-noir/40 transition-all hover:scale-105 hover:bg-tertiary/80 hover:shadow-xl"
          >
            Explorar Colección
            <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
          {!user && (
            <button
              onClick={onOpenRegister}
              className="group inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-7 py-3 font-sans text-sm font-semibold uppercase tracking-wider text-linen backdrop-blur-md transition-all hover:scale-105 hover:border-linen hover:bg-white/20 hover:shadow-xl"
            >
              Registrarme como cultor
              <svg className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
          )}
        </div>

        <dl className="mx-auto mt-16 flex max-w-xl flex-wrap justify-center gap-x-8 gap-y-6 rounded-3xl border border-white/25 bg-dark-umber/70 px-6 py-6 shadow-xl shadow-cafe-noir/50 backdrop-blur-md transition-all duration-500 hover:border-white/40 hover:bg-dark-umber/80 sm:gap-x-14 sm:px-8 sm:py-7">
          {stats.map((stat) => (
            <div key={stat.label} className="group relative text-center">
              <dd className="font-serif text-3xl text-linen transition-transform duration-300 group-hover:-translate-y-1">{stat.value}</dd>
              <dt className="mt-1 font-sans text-xs uppercase tracking-[0.18em] text-warm-sand/80 transition-colors duration-300 group-hover:text-warm-sand">
                {stat.label}
              </dt>
            </div>
          ))}
        </dl>
      </div>

      {/* Indicador de scroll animado */}
      <div className="absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 opacity-70 transition-opacity hover:opacity-100">
        <span className="font-sans text-[10px] uppercase tracking-[0.25em] text-linen">Descubrir</span>
        <div className="flex h-10 w-5 justify-center rounded-full border border-linen/50 p-1">
          <div className="h-2 w-1 animate-bounce rounded-full bg-linen" />
        </div>
      </div>
    </header>
  )
}

export default Hero
