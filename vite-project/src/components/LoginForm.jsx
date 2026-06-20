import { useAuth } from '../context/AuthContext'
import { useState } from 'react'

function LoginForm({ isOpen, onClose }) {
  const { login } = useAuth()
  const [loading, setLoading] = useState(false)

  if (!isOpen) return null

  const handleLogin = (e) => {
    e.preventDefault()
    setLoading(true)
    // Simulamos un tiempo de carga de 1 segundo para que se vea más realista
    setTimeout(() => {
      login() // Inicia sesión globalmente
      setLoading(false)
      onClose() // Cierra el modal
    }, 1000)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#3a200d]/50 backdrop-blur-md">
      <div className="relative w-full max-w-md rounded-[2rem] bg-[#F4F0E6] shadow-2xl shadow-black/50 p-8 sm:p-10 text-center">
        {/* Botón Cerrar */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 flex h-10 w-10 items-center justify-center rounded-full text-cafe-noir transition-opacity hover:opacity-70"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <span className="font-sans text-xs uppercase tracking-[0.1em] text-cafe-noir/80">
          Archivo Táchira
        </span>
        <h2 className="mt-2 font-serif text-3xl text-cafe-noir">
          Iniciar Sesión
        </h2>
        <p className="mt-3 font-sans text-sm text-cafe-noir/80 leading-relaxed">
          Usa tu correo y contraseña para acceder a las herramientas de cultor.
        </p>

        <form onSubmit={handleLogin} className="mt-8 text-left">
          <div className="space-y-5">
            <div>
              <label className="block font-sans text-xs font-semibold uppercase tracking-wide text-cafe-noir mb-2">
                Correo Electrónico
              </label>
              <input
                type="email"
                defaultValue="mariajose@cultores.ta.gob.ve"
                className="w-full rounded-xl border border-cafe-noir/20 bg-white/60 px-4 py-3 font-sans text-sm text-cafe-noir shadow-sm placeholder:text-cafe-noir/30 focus:border-tertiary focus:outline-none focus:ring-1 focus:ring-tertiary"
              />
            </div>
            <div>
              <label className="block font-sans text-xs font-semibold uppercase tracking-wide text-cafe-noir mb-2">
                Contraseña
              </label>
              <input
                type="password"
                defaultValue="contraseña123"
                className="w-full rounded-xl border border-cafe-noir/20 bg-white/60 px-4 py-3 font-sans text-sm text-cafe-noir shadow-sm placeholder:text-cafe-noir/30 focus:border-tertiary focus:outline-none focus:ring-1 focus:ring-tertiary"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-8 w-full rounded-full bg-cafe-noir px-6 py-3.5 font-sans text-sm font-semibold uppercase tracking-wider text-white shadow-md transition-opacity hover:opacity-80 flex items-center justify-center disabled:opacity-50"
          >
            {loading ? (
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              'Entrar al panel'
            )}
          </button>
        </form>
      </div>
    </div>
  )
}

export default LoginForm
