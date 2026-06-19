import cesteriaImg from '../assets/Cesteria.jpeg'

const stats = [
  { value: '+120', label: 'Obras digitalizadas' },
  { value: '+45', label: 'Cultores activos' },
  { value: '29', label: 'Municipios' },
]

function Hero() {
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
      {/* Fundido inferior: mismo color exacto que el inicio de la Galería, en un tono más cálido y suave */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#C5A687] via-[#C5A687]/15 to-transparent pointer-events-none md:h-64" />

      <div className="relative mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 sm:py-28">
        <div className="mx-auto h-px w-20 bg-warm-sand/60" />

        <h1 className="mt-8 font-serif text-4xl leading-[1.08] text-linen [text-shadow:0_2px_18px_rgba(41,24,4,0.7)] sm:text-5xl md:text-6xl lg:text-7xl">
          Preservando la Memoria
          <br />
          Cultural del Táchira
        </h1>

        <div className="mx-auto mt-8 h-px w-20 bg-warm-sand/60" />

        <p className="mx-auto mt-8 max-w-2xl font-sans text-base leading-relaxed text-linen/95 [text-shadow:0_1px_10px_rgba(41,24,4,0.6)] first-letter:mr-2 first-letter:float-left first-letter:font-serif first-letter:text-5xl first-letter:leading-[0.8] first-letter:text-warm-sand sm:text-lg sm:first-letter:text-6xl">
          Un archivo digital colaborativo que rescata el oficio, la mano y la
          historia de nuestros cultores, conectando a los artesanos del
          Táchira con quienes valoran su legado.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <a
            href="#galeria"
            className="rounded-full bg-tertiary px-7 py-3 font-sans text-sm font-semibold uppercase tracking-wider text-linen shadow-lg shadow-cafe-noir/40 transition-colors hover:bg-tertiary/80"
          >
            Explorar Colección
          </a>
          <a
            href="#registro"
            className="rounded-full border border-white/30 bg-white/10 px-7 py-3 font-sans text-sm font-semibold uppercase tracking-wider text-linen backdrop-blur-md transition-colors hover:border-linen hover:bg-white/20"
          >
            Registrarme como cultor
          </a>
        </div>

        <dl className="mx-auto mt-16 flex max-w-xl flex-wrap justify-center gap-x-8 gap-y-6 rounded-3xl border border-white/25 bg-dark-umber/30 px-6 py-6 shadow-xl shadow-cafe-noir/30 backdrop-blur-sm sm:gap-x-14 sm:px-8 sm:py-7">
          {stats.map((stat) => (
            <div key={stat.label}>
              <dd className="font-serif text-3xl text-linen">{stat.value}</dd>
              <dt className="mt-1 font-sans text-xs uppercase tracking-[0.18em] text-warm-sand/80">
                {stat.label}
              </dt>
            </div>
          ))}
        </dl>
      </div>
    </header>
  )
}

export default Hero
