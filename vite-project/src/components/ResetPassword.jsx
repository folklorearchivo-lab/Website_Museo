import { useState } from 'react'
import { useNavigate, useSearchParams, Link } from 'react-router-dom'
import { Eye, EyeOff } from 'lucide-react'
import cesteriaImg from '../assets/Cesteria.jpeg'
import { resetPasswordRequest } from '../services/api'

// Misma regla que el backend (ver commonSchemas.js): mínimo 8 caracteres, al menos
// una mayúscula y al menos un carácter especial.
function validarPasswordSegura(password) {
  if (password.length < 8) return 'La contraseña debe tener al menos 8 caracteres.'
  if (!/[A-ZÁÉÍÓÚÑ]/.test(password)) return 'La contraseña debe tener al menos una letra mayúscula.'
  if (!/[^A-Za-z0-9]/.test(password)) return 'La contraseña debe tener al menos un carácter especial.'
  return ''
}

function ResetPassword() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token')

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [mensaje, setMensaje] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setMensaje('')

    if (!token) {
      setError('El enlace de recuperación no es válido. Solicita uno nuevo.')
      return
    }

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden.')
      return
    }

    const errorPassword = validarPasswordSegura(password)
    if (errorPassword) {
      setError(errorPassword)
      return
    }

    setLoading(true)
    try {
      const data = await resetPasswordRequest(token, password)
      setMensaje(data.message || 'Contraseña restablecida con éxito. Redirigiendo al inicio de sesión...')
      setTimeout(() => navigate('/login'), 3000)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="min-h-screen relative flex items-center justify-center bg-cover bg-center p-4 sm:p-6"
      style={{ backgroundImage: `url(${cesteriaImg})` }}
    >
      {/* Capa translúcida: efecto cristalino y profundo sobre la foto */}
      <div className="absolute inset-0 bg-cafe-noir/60" />

      {/* Tarjeta del formulario, flotando sobre el fondo */}
      <div className="relative z-10 w-full max-w-md rounded-[2rem] bg-[#F4F0E6] p-8 shadow-2xl shadow-black/30 sm:p-10 text-center">
        <span className="font-sans text-xs uppercase tracking-[0.1em] text-cafe-noir/80">
          Archivo Regional del Folklore y Patrimonio Cultural "Luis Felipe Ramón y Rivera"
        </span>
        <h2 className="mt-2 font-serif text-3xl text-cafe-noir">
          Restablecer Contraseña
        </h2>
        <p className="mt-3 font-sans text-sm text-cafe-noir/80 leading-relaxed">
          Ingresa tu nueva contraseña para acceder a tu cuenta.
        </p>

        {mensaje && (
          <div className="mt-6 rounded-xl border border-emerald-200/50 bg-emerald-50/60 px-4 py-3 text-left font-sans text-sm text-emerald-700">
            {mensaje}
          </div>
        )}

        {error && (
          <div className="mt-6 rounded-xl border border-red-200/50 bg-red-50/60 px-4 py-3 text-left font-sans text-sm text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-8 text-left space-y-5">
          <div>
            <label className="block font-sans text-xs font-semibold uppercase tracking-wide text-cafe-noir mb-2">
              Nueva Contraseña
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
          </div>

          <div>
            <label className="block font-sans text-xs font-semibold uppercase tracking-wide text-cafe-noir mb-2">
              Confirmar Contraseña
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full rounded-xl border border-cafe-noir/20 bg-white/60 px-4 py-3 font-sans text-sm text-cafe-noir shadow-sm placeholder:text-cafe-noir/30 focus:border-tertiary focus:outline-none focus:ring-1 focus:ring-tertiary"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-cafe-noir px-6 py-3.5 font-sans text-sm font-semibold uppercase tracking-wider text-white shadow-md transition-opacity hover:opacity-80 flex items-center justify-center disabled:opacity-50"
          >
            {loading ? (
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              'Guardar Contraseña'
            )}
          </button>
        </form>

        <Link
          to="/"
          className="mt-6 inline-block font-sans text-xs text-cafe-noir/70 underline transition-colors hover:text-tertiary"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  )
}

export default ResetPassword
