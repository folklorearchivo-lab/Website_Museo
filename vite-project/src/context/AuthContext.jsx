import { createContext, useState, useContext } from 'react'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  // Estado para simular si hay un usuario logueado o no.
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('museo_simulated_user')
    return savedUser ? JSON.parse(savedUser) : null
  })

  // Función para simular el inicio de sesión
  const login = () => {
    const mockUser = {
      id: 1,
      nombres: 'María José',
      apellidos: 'Useche Rangel',
      oficio: 'Cestería',
      role: 'CULTOR_APROBADO'
    }
    setUser(mockUser)
    localStorage.setItem('museo_simulated_user', JSON.stringify(mockUser))
  }

  // Función para cerrar sesión
  const logout = () => {
    setUser(null)
    localStorage.removeItem('museo_simulated_user')
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
