import { useState } from 'react'
import { useAuth } from '../context/AuthContext'

function UploadObraForm({ isOpen, onClose }) {
  const { user } = useAuth()
  const [enviado, setEnviado] = useState(false)

  if (!isOpen) return null

  const handleSubmit = (e) => {
    e.preventDefault()
    setEnviado(true)
    setTimeout(() => {
      setEnviado(false)
      onClose()
    }, 3000)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#3a200d]/50 backdrop-blur-md">
      <div className="relative w-full max-w-2xl h-auto max-h-[90vh] rounded-[2rem] bg-[#F4F0E6] shadow-2xl shadow-black/50 flex flex-col">
        
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-20 flex h-10 w-10 items-center justify-center rounded-full text-cafe-noir transition-opacity hover:opacity-70"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="relative z-10 w-full overflow-y-auto px-6 py-10 sm:px-12 sm:py-14 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-cafe-noir/20">
          <div className="text-center text-cafe-noir">
            <span className="font-sans text-xs uppercase tracking-[0.1em] text-cafe-noir/80">
              Panel de Cultor · {user?.nombres}
            </span>
            <h2 className="mt-1 font-sans font-semibold tracking-tight text-3xl sm:text-4xl text-cafe-noir">
              Enviar nueva obra
            </h2>
            <p className="mt-2 font-sans text-sm text-cafe-noir/90">
              Añade una pieza al archivo digital del museo.
            </p>
          </div>

          <div className="mt-10">
            {enviado ? (
              <div className="rounded-2xl border border-green-800/20 bg-green-50 px-4 py-8 text-center font-sans text-cafe-noir">
                <svg className="mx-auto h-12 w-12 text-green-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-xl font-bold mb-2">¡Obra enviada con éxito!</h3>
                <p className="text-sm opacity-80">El administrador revisará los datos antes de publicarla en la galería pública.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                
                <div>
                  <label className="block font-sans text-xs font-semibold uppercase tracking-wide text-cafe-noir mb-2">
                    Título de la obra
                  </label>
                  <input required type="text" className="w-full rounded-xl border border-cafe-noir/20 bg-white/60 px-4 py-3 font-sans text-sm shadow-sm focus:border-tertiary focus:outline-none focus:ring-1 focus:ring-tertiary" placeholder="Ej: Cesta de caña amarga" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-sans text-xs font-semibold uppercase tracking-wide text-cafe-noir mb-2">
                      Categoría
                    </label>
                    <select className="w-full rounded-xl border border-cafe-noir/20 bg-white/60 px-4 py-3 font-sans text-sm shadow-sm focus:border-tertiary focus:outline-none focus:ring-1 focus:ring-tertiary">
                      <option>Cestería</option>
                      <option>Cerámica</option>
                      <option>Talla en madera</option>
                      <option>Textiles</option>
                      <option>Pintura</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-sans text-xs font-semibold uppercase tracking-wide text-cafe-noir mb-2">
                      Año de creación
                    </label>
                    <input type="number" defaultValue="2026" className="w-full rounded-xl border border-cafe-noir/20 bg-white/60 px-4 py-3 font-sans text-sm shadow-sm focus:border-tertiary focus:outline-none focus:ring-1 focus:ring-tertiary" />
                  </div>
                </div>

                <div>
                  <label className="block font-sans text-xs font-semibold uppercase tracking-wide text-cafe-noir mb-2">
                    Descripción / Técnica usada
                  </label>
                  <textarea rows="4" className="w-full rounded-xl border border-cafe-noir/20 bg-white/60 px-4 py-3 font-sans text-sm shadow-sm focus:border-tertiary focus:outline-none focus:ring-1 focus:ring-tertiary" placeholder="Describe los materiales y el proceso..."></textarea>
                </div>

                <div>
                  <label className="block font-sans text-xs font-semibold uppercase tracking-wide text-cafe-noir mb-2">
                    Fotografía de la obra
                  </label>
                  <div className="mt-1 flex justify-center rounded-xl border-2 border-dashed border-cafe-noir/30 px-6 pt-5 pb-6 bg-white/40 hover:bg-white/60 transition-colors cursor-pointer">
                    <div className="space-y-1 text-center">
                      <svg className="mx-auto h-12 w-12 text-cafe-noir/40" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <div className="flex text-sm text-cafe-noir/80 justify-center">
                        <span className="relative cursor-pointer rounded-md font-medium text-tertiary focus-within:outline-none focus-within:ring-2 focus-within:ring-tertiary focus-within:ring-offset-2 hover:text-tertiary/80">
                          <span>Sube un archivo</span>
                          <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                        </span>
                        <p className="pl-1">o arrastra y suelta</p>
                      </div>
                      <p className="text-xs text-cafe-noir/50">PNG, JPG, GIF hasta 10MB</p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <button
                    type="submit"
                    className="w-full rounded-full bg-cafe-noir px-10 py-3.5 font-sans text-sm font-semibold uppercase tracking-wider text-white shadow-md transition-opacity hover:opacity-80 sm:w-auto"
                  >
                    Enviar al archivo
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default UploadObraForm
