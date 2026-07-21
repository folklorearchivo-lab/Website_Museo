import { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { useReveal } from '../hooks/useReveal'
import { useConfig } from '../context/ConfigContext'

function MapSection() {
  const { ref, isVisible } = useReveal(0.2)
  const { configWeb, loadingConfig } = useConfig()
  const mapRef = useRef(null)
  const mapInstanceRef = useRef(null)

  useEffect(() => {
    if (!mapRef.current) return
    if (mapInstanceRef.current) return // Evitar doble inicialización en React 18/19 strict mode

    // Inicializar mapa de Leaflet
    const map = L.map(mapRef.current, {
      zoomControl: false,
    }).setView([7.797587, -72.200383], 16)

    mapInstanceRef.current = map

    // Añadir control de zoom en la parte superior derecha
    L.control.zoom({ position: 'topright' }).addTo(map)

    // Capa de losetas de OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map)

    // Crear marcador personalizado con Tailwind
    const customIcon = L.divIcon({
      html: `
        <div class="flex items-center justify-center w-12 h-12 bg-[#B4533C] text-white rounded-full shadow-2xl border-2 border-white hover:scale-110 transition-transform duration-200">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0z"/>
            <circle cx="12" cy="10" r="3"/>
          </svg>
        </div>
      `,
      className: 'custom-map-pin',
      iconSize: [48, 48],
      iconAnchor: [24, 48],
      popupAnchor: [0, -48],
    })

    // Añadir marcador
    const marker = L.marker([7.797587, -72.200383], { icon: customIcon }).addTo(map)

    // Añadir popup interactivo
    marker
      .bindPopup(
        `
      <div style="font-family: 'Plus Jakarta Sans', sans-serif; color: #291804; padding: 4px;">
        <h4 style="font-weight: 700; margin: 0; font-size: 14px;">Museo del Táchira</h4>
        <p style="margin: 4px 0 0 0; font-size: 11px; color: #807471;">Hacienda Paramillo · Archivo Regional del Folklore y Patrimonio Cultural "Luis Felipe Ramón y Rivera"</p>
      </div>
    `
      )
      .openPopup()

    // Forzar recalculo de dimensiones para cargar tiles correctamente
    const timer = setTimeout(() => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.invalidateSize()
      }
    }, 250)

    return () => {
      clearTimeout(timer)
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [])

  // Recalcular tamaño cuando el componente entra en vista por la animación de scroll
  useEffect(() => {
    if (isVisible && mapInstanceRef.current) {
      const timer = setTimeout(() => {
        if (mapInstanceRef.current) {
          mapInstanceRef.current.invalidateSize()
        }
      }, 200)
      return () => clearTimeout(timer)
    }
  }, [isVisible])

  const defaultDireccion =
    'Avenida Universidad, Hacienda Paramillo, San Cristóbal, Estado Táchira, Venezuela.'
  const defaultHorario =
    'Martes a Viernes: 8:00 AM – 4:00 PM\nSábados y Domingos: 10:00 AM – 4:00 PM'

  return (
    <section id="ubicacion" className="relative bg-linen py-20 lg:py-28 overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Información Institucional a la Izquierda */}
          <div className="lg:col-span-5" ref={ref}>
            <span className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-[#B4533C]">
              Ubicación Física
            </span>
            <h2 className="mt-4 font-serif text-4xl text-cafe-noir lg:text-5xl leading-tight">
              Visítanos
            </h2>
            <div className="mt-6 h-px w-20 bg-[#B4533C]/40" />

            <p className="mt-6 font-sans text-base text-cafe-noir/80 leading-relaxed">
              El Archivo Regional del Folklore y Patrimonio Cultural "Luis Felipe Ramón y Rivera" se encuentra ubicado en las históricas instalaciones de la Hacienda Paramillo, sede del Museo del Táchira. Ven a conocer nuestras colecciones físicas y material histórico recopilado.
            </p>

            {/* Ficha de Detalles de Contacto */}
            <div className="mt-8 rounded-3xl bg-[#FAF7F2] p-6 shadow-xl shadow-cafe-noir/5 border border-cafe-noir/5 space-y-5">
              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-2xl bg-[#B4533C]/10 text-[#B4533C] shrink-0">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-sans text-sm font-semibold text-cafe-noir">Dirección</h4>
                  <p className="mt-1 font-sans text-sm text-[#807471] leading-relaxed">
                    {loadingConfig ? defaultDireccion : (configWeb?.contacto_direccion || defaultDireccion)}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-2xl bg-[#B4533C]/10 text-[#B4533C] shrink-0">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-sans text-sm font-semibold text-cafe-noir">Horarios de Atención</h4>
                  <p className="mt-1 font-sans text-sm text-[#807471] leading-relaxed whitespace-pre-line">
                    {loadingConfig ? defaultHorario : (configWeb?.contacto_horario || defaultHorario)}
                  </p>
                </div>
              </div>

              {(configWeb?.contacto_telefono || configWeb?.contacto_email) && (
                <div className="pt-4 border-t border-cafe-noir/5 flex flex-wrap gap-x-6 gap-y-3">
                  {configWeb?.contacto_telefono && (
                    <a href={`tel:${configWeb.contacto_telefono}`} className="flex items-center gap-2 font-sans text-xs text-[#807471] hover:text-[#B4533C] transition-colors">
                      <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      {configWeb.contacto_telefono}
                    </a>
                  )}
                  {configWeb?.contacto_email && (
                    <a href={`mailto:${configWeb.contacto_email}`} className="flex items-center gap-2 font-sans text-xs text-[#807471] hover:text-[#B4533C] transition-colors">
                      <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      {configWeb.contacto_email}
                    </a>
                  )}
                </div>
              )}
            </div>

            {/* Botón de Cómo Llegar */}
            <a
              href="https://www.google.com/maps/dir/?api=1&destination=7.797587,-72.200383"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#B4533C] text-white hover:bg-[#96432F] transition-all shadow-lg hover:shadow-xl font-sans text-xs font-semibold uppercase tracking-wider mt-8 hover:-translate-y-0.5"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              </svg>
              Cómo llegar (Google Maps)
            </a>
          </div>

          {/* Columna del Mapa */}
          <div
            className={`lg:col-span-7 w-full transition-all duration-1000 ease-out delay-200 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}
          >
            <div className="relative h-[380px] sm:h-[480px] w-full rounded-3xl overflow-hidden shadow-2xl shadow-cafe-noir/10 border-4 border-white z-10 bg-stone-100">
              <div ref={mapRef} className="h-full w-full relative z-10" style={{ minHeight: '380px' }} />
            </div>
            {/* Círculos decorativos en el fondo */}
            <div className="absolute -bottom-10 -right-10 z-0 h-64 w-64 rounded-full border border-[#B4533C]/10 pointer-events-none"></div>
            <div className="absolute -top-10 -left-10 z-0 h-40 w-40 rounded-full border border-[#B4533C]/5 pointer-events-none"></div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default MapSection
