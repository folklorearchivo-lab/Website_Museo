import { useEffect, useState } from 'react'
import ObraCard from './ObraCard'
import { getObrasPublicasRequest } from '../services/api'
import { socket } from '../services/socket'

function CultorProfile({ cultor, onClose }) {
  const [obras, setObras] = useState([])
  const [obrasLoading, setObrasLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    if (cultor?.id) {
      setObrasLoading(true)
      getObrasPublicasRequest(cultor.id)
        .then((data) => {
          if (cancelled) return
          const mapeadas = (Array.isArray(data) ? data : []).map((o) => ({
            ...o,
            id: o.id_obra,
            categoria: o.tipo_patrimonio || 'N/A',
            imagenUrl: o.multimedia && o.multimedia[0] ? o.multimedia[0].url_archivo : null,
            autor: o.cultor ? `${o.cultor.primer_nombre} ${o.cultor.primer_apellido}` : 'Cultor Anónimo',
          }))
          setObras(mapeadas)
        })
        .catch(() => { if (!cancelled) setObras([]) })
        .finally(() => { if (!cancelled) setObrasLoading(false) })
    }
    return () => { cancelled = true }
  }, [cultor?.id])

  useEffect(() => {
    const reFetchObras = () => {
      if (!cultor?.id) return
      getObrasPublicasRequest(cultor.id)
        .then((data) => {
          const mapeadas = (Array.isArray(data) ? data : []).map((o) => ({
            ...o,
            id: o.id_obra,
            categoria: o.tipo_patrimonio || 'N/A',
            imagenUrl: o.multimedia && o.multimedia[0] ? o.multimedia[0].url_archivo : null,
            autor: o.cultor ? `${o.cultor.primer_nombre} ${o.cultor.primer_apellido}` : 'Cultor Anónimo',
          }))
          setObras(mapeadas)
        })
        .catch(() => setObras([]))
    }
    socket.on('obra:updated', reFetchObras)
    socket.on('cultor:updated', (payload) => {
      if (!payload?.id_cultor || payload.id_cultor === cultor?.id) {
        reFetchObras()
      }
    })
    socket.on('fe-de-vida:updated', reFetchObras)
    socket.on('admin:update', reFetchObras)
    return () => {
      socket.off('obra:updated', reFetchObras)
      socket.off('cultor:updated')
      socket.off('fe-de-vida:updated', reFetchObras)
      socket.off('admin:update', reFetchObras)
    }
  }, [cultor?.id])

  // Evitar scroll en el body cuando el modal está abierto
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [])

  if (!cultor) return null

  const iniciales = (cultor.nombre_completo || '--')
    .split(' ')
    .slice(0, 2)
    .map((p) => p.charAt(0).toUpperCase())
    .join('')
    || '--'

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-dark-umber/60 p-4 sm:p-6 backdrop-blur-sm animate-in fade-in duration-300">
      
      {/* Contenedor Flotante */}
      <div className="relative flex w-full max-w-3xl flex-col overflow-hidden rounded-[2rem] bg-linen shadow-2xl animate-in zoom-in-95 duration-300" style={{ maxHeight: 'calc(100vh - 4rem)' }}>
        
        {/* Botón flotante para cerrar */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-cafe-noir/20 backdrop-blur-md shadow-sm border border-white/20 text-white transition-all hover:bg-cafe-noir/40 hover:scale-105"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Área scrolleable del modal con barra oculta */}
        <div className="overflow-y-auto overflow-x-hidden w-full h-full flex-grow [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-cafe-noir/20 [&::-webkit-scrollbar-thumb]:rounded-full">

        {/* Header Profile - Mitad superior con imagen de fondo */}
        <div className="relative w-full h-[25vh] min-h-[180px] bg-cafe-noir flex items-end justify-center">
          {cultor.foto_perfil ? (
            <img 
              src={cultor.foto_perfil} 
              alt={cultor.nombre_completo} 
              className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay"
            />
          ) : (
            <div className="absolute inset-0 w-full h-full bg-gradient-to-tr from-cafe-noir to-tertiary opacity-80" />
          )}
          
          {/* Gradiente para suavizar la transición al contenido */}
          <div className="absolute inset-0 bg-gradient-to-t from-linen via-linen/60 to-transparent" />

          <div className="relative z-10 text-center px-4 translate-y-12">
            <div className="mx-auto h-28 w-28 rounded-full border-4 border-linen bg-gallery-cream shadow-xl overflow-hidden flex items-center justify-center">
              {cultor.foto_perfil ? (
                <img src={cultor.foto_perfil} alt={cultor.nombre_completo} className="w-full h-full object-contain p-1" />
              ) : (
                <span className="font-serif text-4xl text-tertiary">
                  {iniciales}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Contenido Principal */}
        <div className="relative z-20 mx-auto max-w-2xl px-6 pt-16 pb-12 text-center w-full">
          {cultor.rol && (
            <span className="inline-flex items-center rounded-full bg-tertiary px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest text-white shadow-sm mb-4">
              {cultor.rol}
            </span>
          )}
          
          <h1 className="font-serif text-3xl md:text-4xl text-cafe-noir mb-2">
            {cultor.nombre_completo}
          </h1>
          
          <p className="font-sans text-sm uppercase tracking-[0.2em] text-tertiary mb-5">
            {cultor.oficio}
          </p>

          <div className="flex items-center justify-center gap-1.5 text-cafe-noir/60 font-sans text-sm mb-3">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {cultor.municipio && `${cultor.municipio}, Táchira`}
          </div>

          {/* Datos adicionales del cultor */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-cafe-noir/80 font-sans text-sm mb-8">
            {cultor.seudonimo && (
              <span className="inline-flex items-center gap-1.5 bg-cafe-noir/5 rounded-full px-3 py-1">
                <svg className="h-4 w-4 text-cafe-noir/50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                <span className="text-cafe-noir/40 mr-0.5">Seudónimo:</span> {cultor.seudonimo}
              </span>
            )}
            {cultor.fecha_nacimiento && (
              <span className="inline-flex items-center gap-1.5 bg-cafe-noir/5 rounded-full px-3 py-1">
                <svg className="h-4 w-4 text-cafe-noir/50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                {(() => {
                  const partes = cultor.fecha_nacimiento.split('T')[0].split('-');
                  const meses = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
                  return `${parseInt(partes[2])} de ${meses[parseInt(partes[1]) - 1]} de ${partes[0]}`;
                })()}
              </span>
            )}
            {cultor.genero && (
              <span className="inline-flex items-center gap-1.5 bg-cafe-noir/5 rounded-full px-3 py-1">
                <svg className="h-4 w-4 text-cafe-noir/50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /></svg>
                {cultor.genero}
              </span>
            )}
            {cultor.esta_certificado && (
              <span className="inline-flex items-center gap-1.5 bg-tertiary/10 rounded-full px-3 py-1 text-tertiary font-semibold">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                Certificado
              </span>
            )}
          </div>

          {cultor.trayectoria_documentada && (
            <div className="max-w-xl mx-auto mb-8 text-left">
              <h3 className="font-sans text-sm uppercase tracking-[0.15em] text-cafe-noir/50 mb-3">Trayectoria</h3>
              <p className="font-sans text-base text-cafe-noir/85 leading-relaxed whitespace-pre-wrap">
                {cultor.trayectoria_documentada}
              </p>
            </div>
          )}

          {cultor.resumen_curricular && (
            <div className="max-w-xl mx-auto">
              <div className="mx-auto h-px w-12 bg-primary/20 mb-5" />
              <p className="font-sans text-sm text-cafe-noir/80 leading-relaxed italic">
                &ldquo;{cultor.resumen_curricular}&rdquo;
              </p>
              <div className="mx-auto h-px w-12 bg-primary/20 mt-5 mb-10" />
            </div>
          )}

          {/* Galería Privada del Cultor */}
          <div className="text-left mt-6">
            <div className="flex items-end justify-between mb-6 border-b border-cafe-noir/10 pb-3">
              <div>
                <h2 className="font-serif text-xl text-cafe-noir">Obras en el Archivo</h2>
              </div>
              <div className="text-right">
                <span className="font-serif text-2xl text-tertiary">{obras.length}</span>
                <span className="font-sans text-[10px] text-cafe-noir/60 ml-1.5 uppercase tracking-widest block sm:inline">registros</span>
              </div>
            </div>

            {obrasLoading ? (
              <div className="text-center py-10 bg-gallery-cream/50 rounded-2xl border border-cafe-noir/5">
                <p className="font-sans text-cafe-noir/60 text-sm">Cargando obras...</p>
              </div>
            ) : obras.length > 0 ? (
              <div className="columns-1 gap-6 sm:columns-2">
                {obras.map((obra) => (
                  <div key={obra.id_obra} className="mb-6 break-inside-avoid">
                    <ObraCard obra={obra} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10 bg-gallery-cream/50 rounded-2xl border border-cafe-noir/5">
                <svg className="mx-auto h-8 w-8 text-cafe-noir/20 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="font-sans text-cafe-noir/60 text-sm">Este cultor aún no tiene obras digitalizadas en el archivo.</p>
              </div>
            )}
          </div>
        </div>
        
        </div>
      </div>
    </div>
  )
}

export default CultorProfile
