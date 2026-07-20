import { useState, useRef, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { getNotificacionesRequest, marcarNotificacionesLeidasRequest, marcarNotificacionLeidaRequest, getMiPerfilRequest } from '../services/api'
import { socket } from '../services/socket'
import logoM from '../assets/LogoM.png'

// Icono y color por `tipo` de notificación (los únicos valores que entrega el backend:
// info / success / warning), reutilizando los mismos estilos de cápsula que ya existían.
function iconoNotificacion(tipo) {
  if (tipo === 'success') {
    return {
      clase: 'bg-emerald-100 text-emerald-600 border-emerald-200/50',
      path: 'M5 13l4 4L19 7',
      strokeWidth: 2.5,
    }
  }
  if (tipo === 'warning') {
    return {
      clase: 'bg-amber-100 text-amber-600 border-amber-200/50',
      path: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z',
      strokeWidth: 2,
    }
  }
  // info (o cualquier valor desconocido) cae aquí por defecto
  return {
    clase: 'bg-cafe-noir/5 text-cafe-noir/50 border-cafe-noir/10',
    path: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
    strokeWidth: 2,
  }
}

const links = [
  { href: '#inicio', label: 'Inicio' },
  { href: '#nosotros', label: 'Nosotros' },
  { href: '#eventos', label: 'Eventos' },
  { href: '#efemerides', label: 'Efemérides' },
]

function Navbar({ onOpenRegister, onOpenLogin, onOpenPanel }) {
  const [menuAbierto, setMenuAbierto] = useState(false)
  const [notificacionesAbiertas, setNotificacionesAbiertas] = useState(false)
  const [cuentaAbierta, setCuentaAbierta] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [notificaciones, setNotificaciones] = useState([])
  const [marcandoLeidas, setMarcandoLeidas] = useState(false)
  const [fotoPerfil, setFotoPerfil] = useState(null)
  const notificacionesRef = useRef(null)
  const cuentaRef = useRef(null)
  const { user, logout } = useAuth()

  // Carga las notificaciones reales del cultor en cuanto inicia sesión (y las limpia
  // al cerrar sesión). No depende de que el dropdown esté abierto: así el contador de
  // la campanita ya está listo desde que aparece el ícono.
  useEffect(() => {
    if (!user) {
      setNotificaciones([])
      setFotoPerfil(null)
      return
    }
    getNotificacionesRequest(user.token)
      .then(setNotificaciones)
      .catch(() => setNotificaciones([]))
    getMiPerfilRequest(user.token)
      .then((perfil) => setFotoPerfil(perfil.foto_perfil || null))
      .catch(() => setFotoPerfil(null))
  }, [user])

  // Refresca las notificaciones en tiempo real (ej. "Obra recibida" al postular, o
  // "Obra aprobada/rechazada" al revisarla) sin depender de recargar la página o
  // reabrir manualmente el dropdown de la campanita.
  useEffect(() => {
    if (!user) return
    const reFetch = () => {
      getNotificacionesRequest(user.token)
        .then(setNotificaciones)
        .catch(() => {})
    }
    socket.on('admin:update', reFetch)
    return () => { socket.off('admin:update', reFetch) }
  }, [user])

  const marcarLeidas = async () => {
    if (!user || marcandoLeidas) return
    setMarcandoLeidas(true)
    try {
      await marcarNotificacionesLeidasRequest(user.token)
      setNotificaciones((prev) => prev.map((n) => ({ ...n, leida: true })))
    } catch {
      // Si falla, dejamos las notificaciones como estaban — el usuario puede reintentar.
    } finally {
      setMarcandoLeidas(false)
    }
  }

  const handleNotificacionClick = (notif) => {
    setNotificacionesAbiertas(false)
    if (!notif.leida && user) {
      marcarNotificacionLeidaRequest(notif.id_notificacion, user.token)
        .then(() => setNotificaciones((prev) => prev.map((n) => n.id_notificacion === notif.id_notificacion ? { ...n, leida: true } : n)))
        .catch(() => {})
    }
    const tituloLower = (notif.titulo || '').toLowerCase()
    if (tituloLower.includes('obra')) {
      onOpenPanel('obras')
    } else {
      onOpenPanel('perfil')
    }
  }

  const cerrarMenu = () => setMenuAbierto(false)

  // Scroll explícito a la sección, sin depender únicamente del salto nativo de ancla
  // (que puede fallar si el documento todavía se está re-renderizando justo después del
  // login). Cierra también el menú móvil si estaba abierto.
  const irADirectorio = (event) => {
    event.preventDefault()
    cerrarMenu()
    document.getElementById('directorio')?.scrollIntoView({ behavior: 'smooth' })
  }
  const toggleNotificaciones = () => {
    const nuevoEstado = !notificacionesAbiertas
    setNotificacionesAbiertas(nuevoEstado)
    if (nuevoEstado) setCuentaAbierta(false)
    if (nuevoEstado && user) {
      getNotificacionesRequest(user.token)
        .then(setNotificaciones)
        .catch(() => {})
    }
  }
  const toggleCuenta = () => {
    const nuevoEstado = !cuentaAbierta
    setCuentaAbierta(nuevoEstado)
    if (nuevoEstado) setNotificacionesAbiertas(false)
  }

  // Cerrar notificaciones y menú de cuenta al hacer clic fuera
  useEffect(() => {
    const handleClickFuera = (event) => {
      if (notificacionesRef.current && !notificacionesRef.current.contains(event.target)) {
        setNotificacionesAbiertas(false)
      }
      if (cuentaRef.current && !cuentaRef.current.contains(event.target)) {
        setCuentaAbierta(false)
      }
    }
    document.addEventListener('mousedown', handleClickFuera)
    return () => document.removeEventListener('mousedown', handleClickFuera)
  }, [])

  // Navbar dinámico: fondo sólido/glassmorphism y texto oscuro al bajar sobre fondos claros
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const noLeidas = notificaciones.filter(n => !n.leida).length

  // Clases que cambian según el scroll, manteniendo el contraste siempre legible
  const textoBase = scrolled ? 'text-cafe-noir' : 'text-linen [text-shadow:0_1px_8px_rgba(41,24,4,0.7)]'
  const textoBaseHover = scrolled ? 'hover:text-tertiary' : 'hover:text-warm-sand'

  return (
    <header className={`fixed top-0 left-0 z-50 w-full transition-all duration-300 ${scrolled ? 'bg-linen/95 backdrop-blur-xl shadow-sm shadow-cafe-noir/10' : 'bg-linen/5 backdrop-blur-md'}`}>
      <nav className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center w-full py-3">
          <a href="#inicio" className="flex items-center gap-2.5 mr-4 lg:mr-8 shrink-0" onClick={cerrarMenu}>
            <img src={logoM} alt="Museo del Táchira" className="h-10 sm:h-12 w-auto" />
            <div className="flex flex-col justify-center leading-tight">
              <span className={`font-serif text-sm sm:text-base md:text-lg font-bold tracking-tight whitespace-nowrap transition-colors ${scrolled ? 'text-cafe-noir' : 'text-linen [text-shadow:0_1px_10px_rgba(41,24,4,0.7)]'}`}>
                Archivo Regional del Folklore
              </span>
              <span className={`font-sans text-[9px] sm:text-[11px] tracking-wider font-medium opacity-90 whitespace-nowrap transition-colors ${scrolled ? 'text-[#B4533C]' : 'text-warm-sand [text-shadow:0_1px_6px_rgba(41,24,4,0.7)]'}`}>
                «Luis Felipe Ramón y Rivera»
              </span>
            </div>
          </a>

          <ul className="hidden items-center gap-6 md:flex">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`font-sans text-xs font-medium uppercase tracking-widest whitespace-nowrap transition-colors ${textoBase} ${textoBaseHover}`}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#directorio"
                onClick={irADirectorio}
                className={`font-sans text-xs font-medium uppercase tracking-widest whitespace-nowrap transition-colors ${textoBase} ${textoBaseHover}`}
              >
                Directorio de Cultores
              </a>
            </li>
            {!user && (
              <li>
                <a
                  href="/manual-usuario"
                  className={`font-sans text-xs font-medium uppercase tracking-widest whitespace-nowrap transition-colors ${textoBase} ${textoBaseHover}`}
                >
                  Manual de Uso
                </a>
              </li>
            )}
          </ul>

          <div className={`hidden items-center gap-4 md:flex ml-4 pl-6 border-l transition-colors ${scrolled ? 'border-cafe-noir/20' : 'border-white/25'}`}>
            {user ? (
                <div className="flex items-center gap-4 relative" ref={notificacionesRef}>
                  
                  {/* Botón Campana Notificaciones */}
                  <button
                    onClick={toggleNotificaciones}
                    onMouseDown={(e) => e.stopPropagation()}
                    className={`relative p-2 rounded-full transition-colors ${scrolled ? 'text-cafe-noir hover:bg-cafe-noir/5' : 'text-linen hover:bg-white/10'}`}
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
                        <button
                          onClick={marcarLeidas}
                          disabled={marcandoLeidas || noLeidas === 0}
                          className="text-[10px] font-sans font-bold text-gallery-cream/70 hover:text-white uppercase tracking-[0.2em] transition-colors disabled:opacity-40 disabled:hover:text-gallery-cream/70"
                        >
                          Marcar leídas
                        </button>
                      </div>
                      <div className="max-h-[60vh] overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-cafe-noir/10 [&::-webkit-scrollbar-thumb]:rounded-full">
                        {notificaciones.length > 0 ? (
                          notificaciones.map((notif) => {
                            const { clase, path, strokeWidth } = iconoNotificacion(notif.tipo)
                            return (
                              <div key={notif.id_notificacion} onClick={() => handleNotificacionClick(notif)} className={`group relative p-5 border-b border-cafe-noir/5 hover:bg-cafe-noir/[0.02] transition-colors cursor-pointer ${!notif.leida ? 'bg-gallery-cream/30' : ''}`}>
                                {!notif.leida && (
                                  <div className="absolute left-2 top-1/2 -translate-y-1/2 h-1.5 w-1.5 rounded-full bg-red-500 shadow-sm" />
                                )}
                                <div className="flex gap-4">
                                  <div className="mt-0.5 flex-shrink-0">
                                    <span className={`flex h-10 w-10 items-center justify-center rounded-full shadow-sm border ${clase}`}>
                                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={strokeWidth} d={path} />
                                      </svg>
                                    </span>
                                  </div>
                                  <div className="flex-grow">
                                    <p className={`font-sans text-sm ${!notif.leida ? 'font-bold text-cafe-noir' : 'font-semibold text-cafe-noir/90'}`}>{notif.titulo}</p>
                                    <p className="font-sans text-xs text-cafe-noir/70 mt-1.5 leading-relaxed">{notif.mensaje}</p>
                                    <p className="font-sans text-[10px] font-bold text-tertiary/70 uppercase tracking-widest mt-2.5">
                                      {new Date(notif.fecha_creacion).toLocaleDateString('es-VE', { day: 'numeric', month: 'short', year: 'numeric' })}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            )
                          })
                        ) : (
                          <div className="p-10 flex flex-col items-center justify-center text-cafe-noir/40">
                            <svg className="h-8 w-8 mb-3 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/></svg>
                            <span className="font-sans text-xs uppercase tracking-widest">Al día</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Menú de Cuenta (dropdown limpio) */}
                  <div className={`relative pl-2 border-l transition-colors ${scrolled ? 'border-cafe-noir/10' : 'border-white/20'}`} ref={cuentaRef}>
                    <button
                      onClick={toggleCuenta}
                      className={`flex items-center gap-2.5 rounded-full pr-3 py-1 transition-colors ${scrolled ? 'hover:bg-cafe-noir/5' : 'hover:bg-white/10'}`}
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-tertiary text-linen font-bold font-sans shadow-md overflow-hidden">
                        {fotoPerfil ? (
                          <img src={fotoPerfil} alt={user.nombres} className="h-full w-full object-cover" />
                        ) : (
                          user.nombres.charAt(0)
                        )}
                      </div>
                      <span className={`font-sans text-sm font-medium transition-colors ${scrolled ? 'text-cafe-noir' : 'text-linen drop-shadow-md'}`}>
                        {user.nombres}
                      </span>
                      <svg className={`h-3.5 w-3.5 transition-transform ${scrolled ? 'text-cafe-noir/60' : 'text-linen/80'} ${cuentaAbierta ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {cuentaAbierta && (
                      <div className="absolute right-0 top-full mt-3 w-56 rounded-2xl bg-white/95 backdrop-blur-xl border border-white/50 shadow-[0_10px_40px_-10px_rgba(41,24,4,0.15)] overflow-hidden z-50">
                        <div className="px-4 py-3 border-b border-cafe-noir/10">
                          <p className="font-sans text-xs font-semibold text-cafe-noir">{user.nombres} {user.apellidos}</p>
                          <p className="font-sans text-[11px] text-cafe-noir/60 mt-0.5">{user.correo}</p>
                        </div>
                        <button
                          onClick={() => { setCuentaAbierta(false); onOpenPanel('perfil') }}
                          className="block w-full px-4 py-2.5 text-left font-sans text-sm text-cafe-noir hover:bg-cafe-noir/5 transition-colors"
                        >
                          Mi Perfil
                        </button>
                        <button
                          onClick={() => { setCuentaAbierta(false); onOpenPanel('obras') }}
                          className="block w-full px-4 py-2.5 text-left font-sans text-sm text-cafe-noir hover:bg-cafe-noir/5 transition-colors"
                        >
                          Mis Obras
                        </button>
                        <a
                          href="/manual-usuario"
                          className="block w-full px-4 py-2.5 text-left font-sans text-sm text-cafe-noir hover:bg-cafe-noir/5 transition-colors"
                        >
                          Manual de Uso
                        </a>
                        <button
                          onClick={() => { setCuentaAbierta(false); logout() }}
                          className="block w-full border-t border-cafe-noir/10 px-4 py-2.5 text-left font-sans text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
                        >
                          Cerrar Sesión
                        </button>
                      </div>
                    )}
                  </div>
                </div>
            ) : (
              <div className="flex items-center gap-4">
                <button
                  onClick={onOpenLogin}
                  className={`font-sans text-xs font-semibold uppercase tracking-wide whitespace-nowrap flex-shrink-0 transition-colors ${scrolled ? 'text-cafe-noir hover:text-tertiary' : 'text-linen hover:text-warm-sand drop-shadow-md'}`}
                >
                  Iniciar Sesión
                </button>
                <button
                  onClick={onOpenRegister}
                  className="rounded-full bg-tertiary px-6 py-2 font-sans text-xs font-semibold uppercase tracking-wide whitespace-nowrap flex-shrink-0 text-linen shadow-md transition-colors hover:bg-cafe-noir"
                >
                  Registrarme
                </button>
              </div>
            )}
          </div>

          {/* Botón hamburguesa, solo en móvil */}
          <button
            type="button"
            onClick={() => setMenuAbierto((prev) => !prev)}
            aria-label="Abrir menú"
            aria-expanded={menuAbierto}
            className={`flex h-10 w-10 items-center justify-center rounded-full backdrop-blur-md md:hidden transition-colors ${scrolled ? 'border border-cafe-noir/20 bg-cafe-noir/5 text-cafe-noir' : 'border border-white/30 bg-white/10 text-linen'}`}
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75">
              {menuAbierto ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Panel desplegable en móvil: mismo cristal translúcido que el navbar */}
      {menuAbierto && (
        <div className={`border-t md:hidden transition-colors ${scrolled ? 'border-cafe-noir/10 bg-linen/95 backdrop-blur-xl' : 'border-white/10 bg-linen/5 backdrop-blur-md'}`}>
          <ul className="flex flex-col gap-1 px-4 py-4">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={cerrarMenu}
                  className={`block rounded-lg px-3 py-2.5 font-sans text-sm font-medium uppercase tracking-widest transition-colors ${scrolled ? 'text-cafe-noir hover:bg-cafe-noir/5' : 'text-linen [text-shadow:0_1px_8px_rgba(41,24,4,0.7)] hover:bg-white/15'}`}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#directorio"
                onClick={irADirectorio}
                className={`block rounded-lg px-3 py-2.5 font-sans text-sm font-medium uppercase tracking-widest transition-colors ${scrolled ? 'text-cafe-noir hover:bg-cafe-noir/5' : 'text-linen [text-shadow:0_1px_8px_rgba(41,24,4,0.7)] hover:bg-white/15'}`}
              >
                Directorio de Cultores
              </a>
            </li>
            {!user && (
              <li>
                <a
                  href="/manual-usuario"
                  onClick={cerrarMenu}
                  className={`block rounded-lg px-3 py-2.5 font-sans text-sm font-medium uppercase tracking-widest transition-colors ${scrolled ? 'text-cafe-noir hover:bg-cafe-noir/5' : 'text-linen [text-shadow:0_1px_8px_rgba(41,24,4,0.7)] hover:bg-white/15'}`}
                >
                  Manual de Uso
                </a>
              </li>
            )}

            <li className={user ? '' : 'pt-2 border-t border-white/10 mt-2'}>
              {user ? (
                <div className="px-3 py-2">
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-tertiary text-linen font-bold font-sans shadow-md overflow-hidden shrink-0">
                        {fotoPerfil ? (
                          <img src={fotoPerfil} alt={user.nombres} className="h-full w-full object-cover" />
                        ) : (
                          user.nombres.charAt(0)
                        )}
                      </div>
                      <span className={`block font-sans text-sm ${scrolled ? 'text-cafe-noir' : 'text-linen'}`}>Conectado como {user.nombres}</span>
                    </div>
                    <button
                      onClick={toggleNotificaciones}
                      onMouseDown={(e) => e.stopPropagation()}
                      className={`relative p-2 rounded-full ${scrolled ? 'text-cafe-noir bg-cafe-noir/5' : 'text-linen bg-white/10'}`}
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
                        <button
                          onClick={marcarLeidas}
                          disabled={marcandoLeidas || noLeidas === 0}
                          className="text-[9px] font-sans font-bold text-gallery-cream/70 uppercase tracking-[0.2em] disabled:opacity-40"
                        >
                          Marcar leídas
                        </button>
                      </div>
                      <div className="max-h-60 overflow-y-auto">
                        {notificaciones.length > 0 ? (
                          notificaciones.map((notif) => (
                            <div key={notif.id_notificacion} onClick={() => { handleNotificacionClick(notif); setMenuAbierto(false) }} className={`p-3 border-b border-cafe-noir/5 cursor-pointer ${!notif.leida ? 'bg-gallery-cream/30' : ''}`}>
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
                    onClick={() => { cerrarMenu(); onOpenPanel('perfil'); }}
                    className="mb-2 block w-full rounded-full bg-tertiary px-6 py-2.5 text-center font-sans text-xs font-semibold uppercase tracking-wide text-linen shadow-md"
                  >
                    Mi Perfil
                  </button>
                  <button
                    onClick={() => { cerrarMenu(); onOpenPanel('obras'); }}
                    className={`mb-2 block w-full rounded-full border px-6 py-2.5 text-center font-sans text-xs font-semibold uppercase tracking-wide transition-colors ${scrolled ? 'border-cafe-noir/20 text-cafe-noir hover:bg-cafe-noir/5' : 'border-white/30 text-linen hover:bg-white/10'}`}
                  >
                    Mis Obras
                  </button>
                  <a
                    href="/manual-usuario"
                    className={`mb-2 block w-full rounded-full border px-6 py-2.5 text-center font-sans text-xs font-semibold uppercase tracking-wide transition-colors ${scrolled ? 'border-cafe-noir/20 text-cafe-noir hover:bg-cafe-noir/5' : 'border-white/30 text-linen hover:bg-white/10'}`}
                  >
                    Manual de Uso
                  </a>
                  <button
                    onClick={() => { cerrarMenu(); logout(); }}
                    className={`block w-full rounded-full border px-6 py-2.5 text-center font-sans text-xs font-semibold uppercase tracking-wide transition-colors ${scrolled ? 'border-red-300/60 text-red-700 hover:bg-red-50' : 'border-red-300/40 text-red-200 hover:bg-white/10'}`}
                  >
                    Cerrar Sesión
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => { cerrarMenu(); onOpenLogin(); }}
                    className={`block w-full rounded-full border px-6 py-2.5 text-center font-sans text-xs font-semibold uppercase tracking-wide transition-colors ${scrolled ? 'border-cafe-noir/30 text-cafe-noir hover:bg-cafe-noir/5' : 'border-white/30 text-linen hover:bg-white/10'}`}
                  >
                    Iniciar Sesión
                  </button>
                  <button
                    onClick={() => { cerrarMenu(); onOpenRegister(); }}
                    className={`block w-full rounded-full px-6 py-2.5 text-center font-sans text-xs font-semibold uppercase tracking-wide shadow-md transition-colors ${scrolled ? 'bg-cafe-noir text-linen hover:bg-tertiary' : 'bg-tertiary text-linen hover:bg-cafe-noir'}`}
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
