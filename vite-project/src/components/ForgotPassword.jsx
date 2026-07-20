import { useState } from 'react'
import { Link } from 'react-router-dom'
import cesteriaImg from '../assets/Cesteria.jpeg'
import { olvidePasswordRequest } from '../services/api'
import { enviarRecuperacion } from '../services/emailNotifications'

function ForgotPassword() {
  const [correo, setCorreo] = useState('')
  const [loading, setLoading] = useState(false)
  const [mensaje, setMensaje] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setMensaje('')
    setLoading(true)
    try {
      const data = await olvidePasswordRequest(correo)

      // resetToken solo viene presente cuando el correo sí existe; el mensaje genérico
      // se muestra siempre, exista o no la cuenta, para no filtrar esa información.
      if (data.resetToken) {
        const resetLink = `${window.location.origin}/recuperar-password?token=${data.resetToken}`
        try {
          await enviarRecuperacion({ correo, nombre: data.nombre, resetLink })
        } catch {
          setError('No pudimos enviar el correo de recuperación. Intenta de nuevo en unos minutos.')
        }
      }

      setMensaje(data.message || 'Si el correo está registrado, recibirás un enlace de recuperación.')
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
          Archivo Regional del Folklore y Patrimonio Cultural «Luis Felipe Ramón y Rivera»
        </span>
        <h2 className="mt-2 font-serif text-3xl text-cafe-noir">
          Recuperar Contraseña
        </h2>
        <p className="mt-3 font-sans text-sm text-cafe-noir/80 leading-relaxed">
          Ingresa tu correo y te enviaremos un enlace para restablecer tu contraseña.
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

        <form onSubmit={handleSubmit} className="mt-8 text-left">
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
              'Enviar Enlace de Recuperación'
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

export default ForgotPassword
