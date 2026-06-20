import { useState } from 'react'
import logoM from '../assets/LogoM.png'

const links = [
  { href: '#inicio', label: 'Inicio' },
  { href: '#nosotros', label: 'Nosotros' },
  { href: '#galeria', label: 'Galería' },
  { href: '#eventos', label: 'Eventos' },
]

function Navbar({ onOpenRegister }) {
  const [menuAbierto, setMenuAbierto] = useState(false)

  const cerrarMenu = () => setMenuAbierto(false)

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
        </ul>

        <button
          onClick={onOpenRegister}
          className="hidden rounded-full bg-tertiary px-6 py-2 font-sans text-xs font-semibold uppercase tracking-wide text-linen shadow-md transition-colors hover:bg-cafe-noir md:inline-block"
        >
          Soy Cultor / Registrarme
        </button>

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
            <li className="pt-2">
              <button
                onClick={() => { cerrarMenu(); onOpenRegister(); }}
                className="block w-full rounded-full bg-tertiary px-6 py-2.5 text-center font-sans text-xs font-semibold uppercase tracking-wide text-linen shadow-md"
              >
                Soy Cultor / Registrarme
              </button>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}

export default Navbar
