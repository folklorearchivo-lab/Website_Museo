import { useAuth } from '../context/AuthContext'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Eye, EyeOff } from 'lucide-react'
import { useConfig } from '../context/ConfigContext'

function LoginForm({ isOpen, onClose }) {
  const { login } = useAuth()
  const { configWeb } = useConfig()
  const [correo, setCorreo] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  if (!isOpen) return null

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(correo, password)
      setCorreo('')
      setPassword('')
      onClose()
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#3a200d]/50 backdrop-blur-md" style={{ overflowY: 'auto' }}>
      <div 
        className="relative w-full max-w-md rounded-[2rem] bg-[#F4F0E6] shadow-2xl shadow-black/50 p-6 sm:p-10 my-8 text-center"
        style={configWeb?.login_imagen ? {
          backgroundImage: `linear-gradient(rgba(244, 240, 230, 0.92), rgba(244, 240, 230, 0.92)), url(${configWeb.login_imagen})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        } : {}}
      >
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
          {configWeb?.login_top_label || 'Archivo Regional del Folklore y Patrimonio Cultural «Luis Felipe Ramón y Rivera»'}
        </span>
        <h2 className="mt-2 font-serif text-3xl text-cafe-noir">
          {configWeb?.login_titulo || 'Iniciar Sesión'}
        </h2>
        <p className="mt-3 font-sans text-sm text-cafe-noir/80 leading-relaxed">
          {configWeb?.login_subtitulo || 'Usa tu correo y contraseña para acceder a las herramientas de cultor.'}
        </p>

        {error && (
          <div className="mt-6 rounded-xl border border-red-200/50 bg-red-50/60 px-4 py-3 text-left font-sans text-sm text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="mt-8 text-left">
          <div className="space-y-5">
            <div>
              <label className="block font-sans text-xs font-semibold uppercase tracking-wide text-cafe-noir mb-2">
                Correo Electrónico
              </label>
              <input
                type="email"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                placeholder="nombre@correo.com"
                required
                className="w-full rounded-xl border border-cafe-noir/20 bg-white/60 px-4 py-3 font-sans text-sm text-cafe-noir shadow-sm placeholder:text-cafe-noir/30 focus:border-tertiary focus:outline-none focus:ring-1 focus:ring-tertiary"
              />
            </div>
            <div>
              <label className="block font-sans text-xs font-semibold uppercase tracking-wide text-cafe-noir mb-2">
                Contraseña
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full rounded-xl border border-cafe-noir/20 bg-white/60 px-4 py-3 pr-11 font-sans text-sm text-cafe-noir shadow-sm placeholder:text-cafe-noir/30 focus:border-tertiary focus:outline-none focus:ring-1 focus:ring-tertiary"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                  className="absolute inset-y-0 right-0 flex items-center px-3 text-cafe-noir/50 transition-colors hover:text-cafe-noir"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              <div className="mt-2 text-right">
                <Link
                  to="/olvide-password"
                  className="font-sans text-xs text-cafe-noir/70 transition-colors hover:text-tertiary"
                >
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>
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
