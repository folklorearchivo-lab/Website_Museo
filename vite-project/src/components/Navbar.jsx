import { useState, useRef, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { notificacionesMock } from '../data/mockData'
import logoM from '../assets/LogoM.png'

const links = [
  { href: '#inicio', label: 'Inicio' },
  { href: '#nosotros', label: 'Nosotros' },
  { href: '#galeria', label: 'Galería' },
  { href: '#eventos', label: 'Eventos' },
]

function Navbar({ onOpenRegister, onOpenLogin }) {
  const [menuAbierto, setMenuAbierto] = useState(false)
  const [notificacionesAbiertas, setNotificacionesAbiertas] = useState(false)
  const notificacionesRef = useRef(null)
  const { user, logout } = useAuth()

  const cerrarMenu = () => setMenuAbierto(false)
  const toggleNotificaciones = () => setNotificacionesAbiertas(!notificacionesAbiertas)

  // Cerrar notificaciones al hacer clic fuera
  useEffect(() => {
    const handleClickFuera = (event) => {
      if (notificacionesRef.current && !notificacionesRef.current.contains(event.target)) {
        setNotificacionesAbiertas(false)
      }
    }
    document.addEventListener('mousedown', handleClickFuera)
    return () => document.removeEventListener('mousedown', handleClickFuera)
  }, [])

  const noLeidas = notificacionesMock.filter(n => !n.leida).length

  return (
    <header className="fixed top-0 z-50 w-full bg-linen/5 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <a href="#inicio" className="flex items-center gap-3" onClick={cerrarMenu}>
          <img src={logoM} alt="Museo del Táchira" className="h-12 w-auto sm:h-16" />
          <span className="font-serif text-xl text-linen [text-shadow:0_1px_10px_rgba(41,24,4,0.7)] sm:text-2xl">
            Archivo Táchira
          </span>
        </a>

        <ul className="hidden items-center gap-10 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="font-sans text-xs font-medium uppercase tracking-widest text-linen transition-colors hover:text-warm-sand [text-shadow:0_1px_8px_rgba(41,24,4,0.7)]"
              >
                {link.label}
              </a>
            </li>
          ))}
          {user && (
            <li>
              <a
                href="#directorio"
                className="font-sans text-xs font-medium uppercase tracking-widest text-warm-sand transition-colors hover:text-white [text-shadow:0_1px_8px_rgba(41,24,4,0.7)]"
              >
                Directorio
              </a>
            </li>
          )}
        </ul>

        <div className="hidden items-center gap-4 md:flex">
          {user ? (
              <div className="flex items-center gap-4 relative" ref={notificacionesRef}>
                
                {/* Botón Campana Notificaciones */}
                <button 
                  onClick={toggleNotificaciones}
                  className="relative p-2 rounded-full text-linen hover:bg-white/10 transition-colors"
                >
                  <svg className="h-6 w-6 drop-shadow-md" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                  {noLeidas > 0 && (
                    <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 font-sans text-[10px] font-bold text-white shadow-sm ring-2 ring-transparent">
                      {noLeidas}
                    </span>
                  )}
                </button>

                {/* Dropdown Notificaciones (Desktop) */}
                {notificacionesAbiertas && (
                  <div className="absolute right-0 top-full mt-4 w-[22rem] lg:w-[24rem] rounded-3xl bg-white/95 backdrop-blur-xl border border-white/50 shadow-[0_10px_40px_-10px_rgba(41,24,4,0.15)] overflow-hidden animate-in slide-in-from-top-2 fade-in duration-200 z-50">
                    <div className="bg-cafe-noir/95 p-5 flex items-center justify-between">
                      <h3 className="font-serif text-xl text-gallery-cream">Notificaciones</h3>
                      <button className="text-[10px] font-sans font-bold text-gallery-cream/70 hover:text-white uppercase tracking-[0.2em] transition-colors">Marcar leídas</button>
                    </div>
                    <div className="max-h-[60vh] overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-cafe-noir/10 [&::-webkit-scrollbar-thumb]:rounded-full">
                      {notificacionesMock.length > 0 ? (
                        notificacionesMock.map((notif) => (
                          <div key={notif.id} className={`group relative p-5 border-b border-cafe-noir/5 hover:bg-cafe-noir/[0.02] transition-colors ${!notif.leida ? 'bg-gallery-cream/30' : ''}`}>
                            {!notif.leida && (
                              <div className="absolute left-2 top-1/2 -translate-y-1/2 h-1.5 w-1.5 rounded-full bg-red-500 shadow-sm" />
                            )}
                            <div className="flex gap-4">
                              <div className="mt-0.5 flex-shrink-0">
                                {notif.tipo === 'invitacion' && <span className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 text-amber-600 shadow-sm border border-amber-200/50"><svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg></span>}
                                {notif.tipo === 'aprobado' && <span className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 shadow-sm border border-emerald-200/50"><svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7"/></svg></span>}
                                {notif.tipo === 'pendiente' && <span className="flex h-10 w-10 items-center justify-center rounded-full bg-cafe-noir/5 text-cafe-noir/50 shadow-sm border border-cafe-noir/10"><svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg></span>}
                                {notif.tipo === 'rechazado' && <span className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100 text-red-600 shadow-sm border border-red-200/50"><svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg></span>}
                              </div>
                              <div className="flex-grow">
                                <p className={`font-sans text-sm ${!notif.leida ? 'font-bold text-cafe-noir' : 'font-semibold text-cafe-noir/90'}`}>{notif.titulo}</p>
                                <p className="font-sans text-xs text-cafe-noir/70 mt-1.5 leading-relaxed">{notif.mensaje}</p>
                                <p className="font-sans text-[10px] font-bold text-tertiary/70 uppercase tracking-widest mt-2.5">{notif.tiempo}</p>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="p-10 flex flex-col items-center justify-center text-cafe-noir/40">
                          <svg className="h-8 w-8 mb-3 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/></svg>
                          <span className="font-sans text-xs uppercase tracking-widest">Al día</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Avatar y Botón de Salir */}
                <div className="flex items-center gap-2 pl-2 border-l border-white/20">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-tertiary text-linen font-bold font-sans shadow-md">
                    {user.nombres.charAt(0)}
                  </div>
                  <span className="font-sans text-sm font-medium text-linen drop-shadow-md">
                    Hola, {user.nombres}
                  </span>
                </div>
                <button
                  onClick={logout}
                  className="rounded-full border border-white/30 bg-transparent px-4 py-1.5 font-sans text-[10px] font-semibold uppercase tracking-wide text-linen backdrop-blur-md transition-colors hover:border-linen hover:bg-white/20 ml-2"
                >
                  Salir
                </button>
              </div>
          ) : (
            <>
              <button
                onClick={onOpenLogin}
                className="font-sans text-xs font-semibold uppercase tracking-wide text-linen transition-colors hover:text-warm-sand drop-shadow-md"
              >
                Iniciar Sesión
              </button>
              <button
                onClick={onOpenRegister}
                className="rounded-full bg-tertiary px-6 py-2 font-sans text-xs font-semibold uppercase tracking-wide text-linen shadow-md transition-colors hover:bg-cafe-noir"
              >
                Registrarme
              </button>
            </>
          )}
        </div>

        {/* Botón hamburguesa, solo en móvil */}
        <button
          type="button"
          onClick={() => setMenuAbierto((prev) => !prev)}
          aria-label="Abrir menú"
          aria-expanded={menuAbierto}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-white/10 text-linen backdrop-blur-md md:hidden"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75">
            {menuAbierto ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5" />
            )}
          </svg>
        </button>
      </nav>

      {/* Panel desplegable en móvil: mismo cristal translúcido que el navbar */}
      {menuAbierto && (
        <div className="border-t border-white/10 bg-linen/5 backdrop-blur-md md:hidden">
          <ul className="flex flex-col gap-1 px-4 py-4">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={cerrarMenu}
                  className="block rounded-lg px-3 py-2.5 font-sans text-sm font-medium uppercase tracking-widest text-linen [text-shadow:0_1px_8px_rgba(41,24,4,0.7)] transition-colors hover:bg-white/15"
                >
                  {link.label}
                </a>
              </li>
            ))}
            {user && (
              <li>
                <a
                  href="#directorio"
                  onClick={cerrarMenu}
                  className="block rounded-lg px-3 py-2.5 font-sans text-sm font-medium uppercase tracking-widest text-warm-sand [text-shadow:0_1px_8px_rgba(41,24,4,0.7)] transition-colors hover:bg-white/15"
                >
                  Directorio
                </a>
              </li>
            )}
            
            <li className="pt-2 border-t border-white/10 mt-2">
              {user ? (
                <div className="px-3 py-2">
                  <div className="flex justify-between items-center mb-4">
                    <span className="block font-sans text-sm text-linen">Conectado como {user.nombres}</span>
                    <button 
                      onClick={toggleNotificaciones}
                      className="relative p-2 rounded-full text-linen bg-white/10"
                    >
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                      </svg>
                      {noLeidas > 0 && (
                        <span className="absolute top-1 right-1 flex h-3 w-3 items-center justify-center rounded-full bg-red-500" />
                      )}
                    </button>
                  </div>
                  
                  {notificacionesAbiertas && (
                    <div className="mb-4 rounded-xl bg-linen border border-white/20 overflow-hidden">
                      <div className="bg-cafe-noir p-3 flex justify-between items-center">
                        <span className="font-serif text-sm text-gallery-cream">Notificaciones</span>
                      </div>
                      <div className="max-h-60 overflow-y-auto">
                        {notificacionesMock.length > 0 ? (
                          notificacionesMock.map((notif) => (
                            <div key={notif.id} className="p-3 border-b border-cafe-noir/5">
                              <p className="font-sans text-xs font-semibold text-cafe-noir">{notif.titulo}</p>
                              <p className="font-sans text-[10px] text-cafe-noir/70 mt-1 line-clamp-2">{notif.mensaje}</p>
                            </div>
                          ))
                        ) : (
                          <div className="p-4 text-center text-cafe-noir/40 font-sans text-xs">Sin notificaciones</div>
                        )}
                      </div>
                    </div>
                  )}

                  <button
                    onClick={() => { cerrarMenu(); logout(); }}
                    className="block w-full rounded-full border border-white/30 px-6 py-2.5 text-center font-sans text-xs font-semibold uppercase tracking-wide text-linen"
                  >
                    Cerrar Sesión
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => { cerrarMenu(); onOpenLogin(); }}
                    className="block w-full rounded-full border border-white/30 px-6 py-2.5 text-center font-sans text-xs font-semibold uppercase tracking-wide text-linen"
                  >
                    Iniciar Sesión
                  </button>
                  <button
                    onClick={() => { cerrarMenu(); onOpenRegister(); }}
                    className="block w-full rounded-full bg-tertiary px-6 py-2.5 text-center font-sans text-xs font-semibold uppercase tracking-wide text-linen shadow-md"
                  >
                    Registrarme
                  </button>
                </div>
              )}
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}

export default Navbar
