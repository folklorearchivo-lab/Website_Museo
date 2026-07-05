const apoyadoPor = ['Dirección de Cultura', 'Museo del Táchira', 'UNEFA']

const equipoDesarrollo = [
  'Julieth Andrade',
  'Kimberly Cegarra',
  'Yilbert Torres',
  'Maria Escalante',
  'Lizmar Cruz',
]

import { useConfig } from '../context/ConfigContext'

function Footer() {
  const { configWeb, loadingConfig } = useConfig()

  return (
    <footer className="relative bg-gradient-to-b from-[#5C4631] to-cafe-noir text-[#F4F0E6]">
      {/* Shape divider: transición tipo montañas entre la sección anterior (crema) y el footer oscuro.
          El fill coincide exactamente con el from- del degradado para que el empalme sea invisible. */}
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

      {/* Fotografía de fachada arquitectónica (demo Unsplash), con opacidad baja */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1503095396549-807759245b35?auto=format&fit=crop&w=1600&q=80"
          alt="Fachada arquitectónica clásica, referencia para el Museo del Táchira"
          className="h-full w-full object-cover opacity-15 sepia-[.4]"
        />
        <div className="absolute inset-0 bg-cafe-noir/85" />
      </div>

      <div className="relative z-10 mx-auto grid max-w-5xl grid-cols-1 gap-x-10 gap-y-4 px-4 pt-12 pb-8 sm:px-6 sm:pt-16 md:grid-cols-3">
        <div>
          <h4 className="text-xs uppercase tracking-widest text-[#F4F0E6]">
            Contacto
          </h4>
          <div className="mt-3 space-y-2 font-sans text-sm text-[#F4F0E6]/70">
            {loadingConfig ? (
              <p>Cargando información...</p>
            ) : (
              <>
                {configWeb?.contacto_email && (
                  <p className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                    {configWeb.contacto_email}
                  </p>
                )}
                {configWeb?.contacto_telefono && (
                  <p className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                    {configWeb.contacto_telefono}
                  </p>
                )}
                {configWeb?.contacto_direccion && (
                  <p className="flex items-start gap-2 mt-2">
                    <svg className="w-4 h-4 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    <span>{configWeb.contacto_direccion}</span>
                  </p>
                )}
              </>
            )}
          </div>

          <div className="mt-6">
            <h4 className="text-xs uppercase tracking-widest text-[#F4F0E6]">
              Apoyado por
            </h4>
            <ul className="mt-3 space-y-2">
              {apoyadoPor.map((nombre) => (
                <li
                  key={nombre}
                  className="font-sans text-sm text-[#F4F0E6]/70"
                >
                  {nombre}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="text-center">
          <h3 className="font-serif text-3xl text-[#F4F0E6]">Archivo Táchira</h3>
          <p className="mx-auto mt-2 max-w-xs font-sans text-sm leading-relaxed text-[#F4F0E6]/70">
            Folklore y Patrimonio. Un archivo digital colaborativo del Museo
            del Táchira para preservar el oficio y la historia de nuestros
            cultores.
          </p>
        </div>

        <div className="md:text-right">
          <h4 className="text-xs uppercase tracking-widest text-[#F4F0E6]">
            Realizado por
          </h4>
          <p className="mt-2 font-sans text-sm italic text-[#F4F0E6]/60">
            Estudiantes de la UNEFA de la carrera Ing. de Sistemas
          </p>
          <ul className="mt-3 space-y-2">
            {equipoDesarrollo.map((nombre) => (
              <li
                key={nombre}
                className="font-sans text-sm text-[#F4F0E6]/70 transition-opacity hover:opacity-100"
              >
                {nombre}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="relative z-10 border-t border-[#F4F0E6]/10 px-6 py-4 text-center font-sans text-xs text-[#F4F0E6]/60">
        © {new Date().getFullYear()} Museo del Táchira · Archivo regional de folklore y patrimonio cultural "Luis Felipe Ramón y Rivera"
      </div>
    </footer>
  )
}

export default Footer
