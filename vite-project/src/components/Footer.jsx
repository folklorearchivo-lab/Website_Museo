const apoyadoPor = ['Dirección de Cultura', 'Museo del Táchira', 'UNEFA']

function Footer() {
  return (
    <footer className="relative overflow-hidden bg-cafe-noir text-warm-sand">
      {/* Fotografía de fachada arquitectónica (demo Unsplash), con opacidad baja */}
      <img
        src="https://images.unsplash.com/photo-1503095396549-807759245b35?auto=format&fit=crop&w=1600&q=80"
        alt="Fachada arquitectónica clásica, referencia para el Museo del Táchira"
        className="absolute inset-0 h-full w-full object-cover opacity-15 sepia-[.4]"
      />
      <div className="absolute inset-0 bg-cafe-noir/85" />

      <div className="relative z-10 mx-auto grid max-w-5xl gap-10 border-b border-warm-sand/15 px-4 py-12 sm:grid-cols-2 sm:gap-16 sm:px-6 sm:py-16">
        <div>
          <h3 className="font-serif text-xl text-linen">Archivo Táchira</h3>
          <p className="mt-3 max-w-xs font-sans text-sm leading-relaxed text-warm-sand/80">
            Folklore y Patrimonio. Un archivo digital colaborativo del Museo
            del Táchira para preservar el oficio y la historia de nuestros
            cultores.
          </p>
        </div>

        <div>
          <h4 className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-warm-sand">
            Apoyado por
          </h4>
          <div className="mt-4 grid grid-cols-1 gap-3">
            {apoyadoPor.map((institucion) => (
              <div
                key={institucion}
                className="rounded-2xl border border-warm-sand/30 bg-white/5 px-4 py-3 text-center font-sans text-xs font-medium uppercase tracking-wide text-warm-sand/90 backdrop-blur-sm"
              >
                {institucion}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="relative z-10 px-6 py-5 text-center font-sans text-xs text-warm-sand/60">
        © {new Date().getFullYear()} Museo del Táchira · Archivo regional de folklore y patrimonio cultural "Luis Felipe Ramón y Rivera"
      </div>
    </footer>
  )
}

export default Footer
