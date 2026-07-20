import logoGobernacion from '../assets/logos/logo_gobernacion.png'
import logoMuseo from '../assets/logos/logo_museo.png'
import logoDireccionCultura from '../assets/logos/logo_direccion_cultura.png'

const apoyadoPor = [
  {
    nombre: 'Dirección de Cultura',
    logo: logoDireccionCultura,
    alt: 'Logo Dirección de Cultura',
    imgClasses: 'h-7 sm:h-8 max-w-[100px]',
  },
  {
    nombre: 'Museo del Táchira',
    logo: logoMuseo,
    alt: 'Logo Museo del Táchira',
    imgClasses: 'h-7 sm:h-8 max-w-[100px]',
  },
  {
    nombre: 'Gobernación del Estado Táchira',
    logo: logoGobernacion,
    alt: 'Logo Gobernación del Estado Táchira',
    imgClasses: 'h-9 sm:h-[42px] max-w-[150px]',
  },
  {
    nombre: 'UNEFA',
    logo: null,
  },
]

const equipoDesarrollo = [
  'Julieth Andrade',
  'Kimberly Cegarra',
  'Yilbert Torres',
  'Maria Escalante',
  'Lizmar Cruz',
]

function Footer() {
  return (
    <footer className="relative bg-gradient-to-b from-[#5C4631] to-cafe-noir text-[#F4F0E6]">
      {/* Shape divider: transición tipo montañas entre la sección anterior (crema) y el footer oscuro. */}
      <div className="absolute top-0 left-0 w-full -translate-y-[99%] overflow-hidden leading-[0]">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="block h-[60px] w-full sm:h-[90px]"
        >
          <path
            d="M0,70 C200,20 400,110 600,55 C800,0 1000,90 1200,40 L1200,120 L0,120 Z"
            fill="#443223"
          />
        </svg>
      </div>

      {/* Fotografía de fachada arquitectónica clásica con overlay */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img
          src="https://images.unsplash.com/photo-1503095396549-807759245b35?auto=format&fit=crop&w=1600&q=80"
          alt="Fachada arquitectónica clásica, referencia para el Museo del Táchira"
          className="h-full w-full object-cover opacity-15 sepia-[.4]"
        />
        <div className="absolute inset-0 bg-cafe-noir/85" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 pt-12 pb-8 sm:px-6 sm:pt-16">
        <div className="grid grid-cols-1 gap-x-10 gap-y-10 md:grid-cols-2 lg:grid-cols-3 items-start">
          
          {/* Columna 1: Apoyado por (Nombre + Logo pequeño calibrado) */}
          <div>
            <h4 className="text-xs uppercase tracking-widest text-[#F4F0E6] font-semibold mb-3">
              Apoyado por
            </h4>
            <ul className="mt-3 space-y-3">
              {apoyadoPor.map((item) => (
                <li
                  key={item.nombre}
                  className="flex items-center gap-3 font-sans text-sm text-[#F4F0E6]/85 transition-opacity hover:opacity-100 min-h-[36px]"
                >
                  {item.logo ? (
                    <img
                      src={item.logo}
                      alt={item.alt}
                      className={`${item.imgClasses} w-auto object-contain filter brightness-125 contrast-110 drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)] flex-shrink-0`}
                    />
                  ) : (
                    <span className="h-1.5 w-1.5 rounded-full bg-[#F4F0E6]/60 flex-shrink-0 ml-1"></span>
                  )}
                  <span>{item.nombre}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna 2: Identidad Institucional */}
          <div className="md:text-center lg:text-center flex flex-col items-center">
            <h3 className="font-serif text-xl sm:text-2xl text-[#F4F0E6] tracking-wide leading-snug">
              Archivo Regional del Folklore y Patrimonio Cultural «Luis Felipe Ramón y Rivera»
            </h3>
            <p className="mt-3 max-w-sm font-sans text-sm leading-relaxed text-[#F4F0E6]/80">
              Un archivo digital colaborativo del Museo del Táchira para preservar el oficio y la historia de nuestros cultores.
            </p>
          </div>

          {/* Columna 3: Realizado por */}
          <div className="lg:text-right">
            <h4 className="text-xs uppercase tracking-widest text-[#F4F0E6] font-semibold mb-2">
              Realizado por
            </h4>
            <p className="mt-1 font-sans text-sm italic text-[#F4F0E6]/70">
              Estudiantes de la UNEFA - Carrera Ing. de Sistemas
            </p>
            <ul className="mt-3 space-y-1.5">
              {equipoDesarrollo.map((nombre) => (
                <li
                  key={nombre}
                  className="font-sans text-sm text-[#F4F0E6]/80 transition-opacity hover:opacity-100"
                >
                  {nombre}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="relative z-10 border-t border-[#F4F0E6]/10 px-6 py-4 text-center font-sans text-xs text-[#F4F0E6]/60">
        © {new Date().getFullYear()} Museo del Táchira · Archivo Regional del Folklore y Patrimonio Cultural «Luis Felipe Ramón y Rivera»
      </div>
    </footer>
  )
}

export default Footer


