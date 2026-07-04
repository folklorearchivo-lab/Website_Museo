import { createContext, useState, useContext } from 'react'
import { loginRequest } from '../services/api'

const AuthContext = createContext()
const STORAGE_KEY = 'cultor_sesion'

export function AuthProvider({ children }) {
  // Sesión real persistida (id, nombres/apellidos del Usuario, correo y el JWT).
  // Los datos completos del cultor (cédula, parroquia, etc.) se piden aparte vía
  // GET /api/cultores/perfil, no viven aquí.
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem(STORAGE_KEY)
    return savedUser ? JSON.parse(savedUser) : null
  })

  const login = async (correo, password) => {
    const data = await loginRequest(correo, password)
    if (data?.user?.activo === false) {
      throw new Error('Su usuario está inactivo. Por favor, contacte a la administración del archivo para reactivarlo.')
    }
    const sesion = {
      id: data.user.id_usuario,
      nombres: data.user.primer_nombre,
      apellidos: data.user.primer_apellido,
      correo: data.user.correo,
      passwordTemporal: Boolean(data.user.password_temporal),
      token: data.token,
    }
    setUser(sesion)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sesion))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem(STORAGE_KEY)
  }

  // Actualiza campos puntuales de la sesión (correo, passwordTemporal) sin re-loguear,
  // usado tras editar el perfil o cambiar la contraseña desde el Portal del Cultor.
  const actualizarSesion = (cambios) => {
    setUser((prev) => {
      if (!prev) return prev
      const actualizado = { ...prev, ...cambios }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(actualizado))
      return actualizado
    })
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, actualizarSesion }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
