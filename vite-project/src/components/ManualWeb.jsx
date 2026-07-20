import { useRef } from 'react'
import { Link } from 'react-router-dom'
import html2pdf from 'html2pdf.js'
import cesteriaImg from '../assets/Cesteria.jpeg'
import logoM from '../assets/LogoM.png'

const secciones = [
  {
    id: 'introduccion',
    titulo: '1. Introducción',
    contenido: (
      <p>
        El <strong>Portal Web del Archivo Regional del Folklore y Patrimonio Cultural «Luis Felipe Ramón y Rivera»</strong> es la plataforma
        pública donde los cultores pueden registrarse, gestionar su perfil, postular sus obras
        y expresiones culturales, y formar parte del inventario patrimonial de la región.
        Este manual le guiará en el uso de todas las herramientas disponibles en el portal.
      </p>
    ),
  },
  {
    id: 'registro',
    titulo: '2. Registro como Cultor',
    contenido: (
      <>
        <p>
          Para acceder a las funciones exclusivas del portal, primero debe registrarse como cultor.
        </p>
        <h4>Pasos para Registrarse</h4>
        <ul>
          <li>En la página principal, haga clic en el botón <strong>"Registrarse"</strong> en la barra de navegación o en la portada principal.</li>
          <li>Complete el formulario con sus datos personales: nombres, apellidos, cédula de identidad, fecha de nacimiento, oficio y manifestación cultural.</li>
          <li>Seleccione su <strong>municipio</strong> y <strong>parroquia</strong> de residencia.</li>
          <li>Ingrese un <strong>correo electrónico</strong> y un <strong>número de teléfono</strong> de contacto.</li>
          <li>Acepte los términos y condiciones, y haga clic en <strong>"Enviar Solicitud"</strong>.</li>
        </ul>
        <div className="manual-nota">
          <strong>Importante:</strong> Una vez enviada la solicitud, un administrador revisará sus datos.
          Recibirá un correo electrónico con sus credenciales de acceso cuando su cuenta sea aprobada.
        </div>
      </>
    ),
  },
  {
    id: 'inicio-sesion',
    titulo: '3. Inicio de Sesión',
    contenido: (
      <>
        <p>
          Una vez que su cuenta haya sido aprobada, podrá iniciar sesión en el portal.
        </p>
        <h4>Cómo Iniciar Sesión</h4>
        <ul>
          <li>Haga clic en <strong>"Iniciar Sesión"</strong> en la barra de navegación.</li>
          <li>Ingrese su <strong>correo electrónico</strong> y la <strong>contraseña</strong> que recibió en su correo de bienvenida.</li>
          <li>Haga clic en <strong>"Entrar"</strong>.</li>
        </ul>
        <h4>Recuperación de Contraseña</h4>
        <p>
          Si olvidó su contraseña, haga clic en <em>"¿Olvidaste tu contraseña?"</em> en la
          pantalla de inicio de sesión. Ingrese su correo electrónico y recibirá un enlace
          para restablecerla.
        </p>
      </>
    ),
  },
  {
    id: 'panel',
    titulo: '4. Panel del Cultor',
    contenido: (
      <>
        <p>
          El <strong>Panel del Cultor</strong> es su espacio privado dentro del portal.
          Para acceder, haga clic en el botón <strong>"Mi Panel"</strong> en la barra de navegación
          (solo visible cuando ha iniciado sesión).
        </p>
        <p>
          El panel se organiza en una interfaz de dos columnas: un menú lateral con las
          secciones disponibles y un área de contenido principal donde se muestra la
          información de cada sección.
        </p>
        <h4>Secciones del Panel</h4>
        <ul>
          <li><strong>Mis Obras:</strong> Gestione sus postulaciones patrimoniales.</li>
          <li><strong>Mi Perfil:</strong> Visualice y edite su información personal.</li>
          <li><strong>Seguridad y Configuración:</strong> Cambie su contraseña y configure su cuenta.</li>
        </ul>
      </>
    ),
  },
  {
    id: 'obras',
    titulo: '5. Mis Obras (Postulaciones)',
    contenido: (
      <>
        <p>
          En la sección <strong>"Mis Obras"</strong> puede postular nuevas expresiones culturales
          y hacer seguimiento al estado de sus postulaciones anteriores.
        </p>
        <h4>Postular una Nueva Obra</h4>
        <ul>
          <li>Dentro del Panel del Cultor, en la pestaña <strong>"Mis Obras"</strong>, haga clic en <strong>"+ Nueva Postulación"</strong>.</li>
          <li>Complete el formulario con los datos de la obra: título, tipo de patrimonio, descripción, fecha, municipio y parroquia.</li>
          <li>Puede adjuntar <strong>imágenes</strong> y <strong>documentos</strong> relacionados con la obra.</li>
          <li>Haga clic en <strong>"Enviar Postulación"</strong>.</li>
        </ul>
        <h4>Estado de las Obras</h4>
        <ul>
          <li><strong>En Revisión:</strong> La obra está pendiente de aprobación por parte del administrador.</li>
          <li><strong>Aprobada:</strong> La obra ha sido aceptada y forma parte del inventario patrimonial.</li>
          <li><strong>Rechazada:</strong> La obra no cumple con los requisitos. Contacte al administrador para más información.</li>
        </ul>
        <p>
          Puede ver el estado actual de cada una de sus postulaciones en la tabla de
          <strong>"Mis obras enviadas"</strong> dentro del panel.
        </p>
      </>
    ),
  },
  {
    id: 'perfil',
    titulo: '6. Mi Perfil',
    contenido: (
      <>
        <p>
          La sección <strong>"Mi Perfil"</strong> le permite visualizar y actualizar su
          información personal registrada en el archivo.
        </p>
        <h4>Información Disponible</h4>
        <ul>
          <li><strong>Foto de perfil:</strong> Puede subir o cambiar su foto de perfil.</li>
          <li><strong>Datos personales:</strong> Nombres, apellidos, cédula, fecha de nacimiento, oficio y manifestación cultural.</li>
          <li><strong>Información de contacto:</strong> Correo electrónico, teléfono, dirección, municipio y parroquia.</li>
          <li><strong>Curriculum:</strong> Puede adjuntar un archivo PDF con su currículum vitae u hoja de vida.</li>
        </ul>
        <h4>Editar Perfil</h4>
        <p>
          Haga clic en el botón <strong>"Editar Perfil"</strong> para modificar sus datos.
          Guarde los cambios una vez haya terminado. Algunos campos como la cédula de
          identidad no pueden ser modificados por seguridad.
        </p>
      </>
    ),
  },
  {
    id: 'seguridad',
    titulo: '7. Seguridad y Configuración',
    contenido: (
      <>
        <p>
          En la sección <strong>"Seguridad y Configuración"</strong> puede gestionar la
          seguridad de su cuenta.
        </p>
        <h4>Cambiar Contraseña</h4>
        <ul>
          <li>Ingrese su <strong>contraseña actual</strong>.</li>
          <li>Ingrese su <strong>nueva contraseña</strong>. Debe tener al menos 8 caracteres, contener al menos una letra mayúscula y un carácter especial.</li>
          <li>Confirme la nueva contraseña ingresándola nuevamente.</li>
          <li>Haga clic en <strong>"Actualizar Contraseña"</strong>.</li>
        </ul>
        <div className="manual-nota">
          <strong>Recomendación:</strong> Use una contraseña única y segura. No comparta su
          contraseña con nadie. El administrador nunca le pedirá su contraseña.
        </div>
      </>
    ),
  },
  {
    id: 'directorio',
    titulo: '8. Directorio de Cultores',
    contenido: (
      <>
        <p>
          El <strong>Directorio de Cultores</strong> es una sección pública del portal donde
          puede explorar los perfiles de todos los cultores registrados en el archivo.
        </p>
        <ul>
          <li>Navegue por la lista de cultores disponible en la página principal.</li>
          <li>Haga clic en un cultor para ver su perfil completo y las obras asociadas.</li>
          <li>Si ha iniciado sesión, puede ver información de contacto de otros cultores.</li>
        </ul>
      </>
    ),
  },
  {
    id: 'cierre',
    titulo: '9. Cierre de Sesión',
    contenido: (
      <>
        <p>
          Para cerrar su sesión de forma segura, haga clic en el botón <strong>"Cerrar Sesión"</strong>
          en la barra de navegación (visible cuando ha iniciado sesión).
        </p>
        <div className="manual-nota">
          <strong>Consejo:</strong> Siempre cierre sesión cuando termine de usar el portal,
          especialmente si está usando un computador compartido o público.
        </div>
      </>
    ),
  },
]

export default function ManualWeb() {
  const contentRef = useRef(null)

  const descargarPDF = () => {
    const el = contentRef.current
    if (!el) return
    const opt = {
      margin: [0, 0, 0, 0],
      filename: 'Manual_Cultor_Archivo_Folklore.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, letterRendering: true, useCORS: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      pagebreak: { mode: ['css', 'legacy'] },
    }
    html2pdf().set(opt).from(el).save()
  }

  return (
    <div className="relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-110 opacity-70"
        style={{ backgroundImage: `url(${cesteriaImg})`, filter: 'blur(2px)' }}
      />
      <div className="absolute inset-0 bg-cafe-noir/40" />

      <div className="relative z-10 w-full">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
          <div className="flex items-center justify-between gap-4 mb-6 flex-wrap">
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur-sm px-5 py-2.5 font-sans text-xs font-semibold uppercase tracking-wide text-linen hover:bg-white/25 transition-all duration-200"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"/><polyline points="12 19 5 12 12 5"/></svg>
              Volver al inicio
            </Link>
            <button
              onClick={descargarPDF}
              className="inline-flex items-center gap-2 rounded-full bg-linen px-5 py-2.5 font-sans text-xs font-semibold uppercase tracking-wide text-cafe-noir shadow-md hover:bg-white transition-all duration-200"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              Descargar PDF
            </button>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 pb-16">
          <div className="manual-content" ref={contentRef}>
            <div className="manual-portada">
              <img src={logoM} alt="Museo del Táchira" className="h-24 w-auto mx-auto mb-4" />
              <h2>Archivo Regional del Folklore y Patrimonio Cultural</h2>
              <h3>«Luis Felipe Ramón y Rivera»</h3>
              <p className="manual-portada-sub">Manual de Usuario — Portal Web del Cultor</p>
              <p className="manual-portada-version">Versión 1.0</p>
            </div>

            <div className="manual-indice">
              <h3>Índice</h3>
              <ol>
                {secciones.map((s) => (
                  <li key={s.id}>{s.titulo.replace(/^\d+\.\s*/, '')}</li>
                ))}
              </ol>
            </div>

            {secciones.map((s) => (
              <section key={s.id} id={s.id} className="manual-seccion">
                <h3>{s.titulo}</h3>
                {s.contenido}
              </section>
            ))}

            <div className="manual-footer-page">
              <p>Archivo Regional del Folklore y Patrimonio Cultural «Luis Felipe Ramón y Rivera» — Documento generado electrónicamente</p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .manual-content {
          background: #fff;
          border-radius: 16px;
          box-shadow: 0 4px 24px rgba(0,0,0,0.15);
          padding: 48px 56px;
          font-family: 'Work Sans', system-ui, sans-serif;
          color: #443223;
          line-height: 1.7;
        }
        .manual-portada {
          text-align: center;
          padding: 32px 20px 24px;
          border-bottom: 2px solid #f0ebe0;
          margin-bottom: 24px;
        }
        .manual-portada h2 {
          font-family: 'Libre Caslon Text', Georgia, serif;
          font-size: 28px;
          margin: 0 0 6px;
          color: #443223;
        }
        .manual-portada h3 {
          font-family: 'Work Sans', system-ui, sans-serif;
          font-size: 14px;
          letter-spacing: 0.15em;
          color: #807471;
          margin: 0 0 16px;
          font-weight: 500;
        }
        .manual-portada-sub {
          font-size: 15px;
          color: #5c4631;
          margin: 0 0 6px;
        }
        .manual-portada-version {
          font-size: 12px;
          color: #a09080;
        }
        .manual-indice {
          background: #f9f6ef;
          border-radius: 12px;
          padding: 20px 28px;
          margin-bottom: 24px;
        }
        .manual-indice h3 {
          font-family: 'Work Sans', system-ui, sans-serif;
          font-size: 14px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #807471;
          margin: 0 0 12px;
        }
        .manual-indice ol {
          margin: 0;
          padding-left: 20px;
        }
        .manual-indice li {
          font-size: 14px;
          color: #443223;
          margin-bottom: 6px;
          font-weight: 500;
        }
        .manual-seccion {
          page-break-inside: avoid;
          break-inside: avoid;
          margin-bottom: 14px;
          padding-bottom: 10px;
          border-bottom: 1px solid #f0ebe0;
        }
        .manual-seccion:last-child {
          border-bottom: none;
          margin-bottom: 0;
        }
        .manual-seccion h3 {
          font-family: 'Libre Caslon Text', Georgia, serif;
          font-size: 20px;
          color: #443223;
          margin: 0 0 12px;
        }
        .manual-seccion h4 {
          font-family: 'Work Sans', system-ui, sans-serif;
          font-size: 14px;
          font-weight: 700;
          color: #5c4631;
          margin: 14px 0 6px;
        }
        .manual-seccion p,
        .manual-seccion ul,
        .manual-seccion ol,
        .manual-seccion li,
        .manual-seccion h3,
        .manual-seccion h4 {
          page-break-inside: avoid;
          break-inside: avoid;
        }
        .manual-seccion p {
          font-size: 14px;
          color: #3d322b;
          margin: 0 0 8px;
        }
        .manual-seccion ul {
          margin: 0 0 8px;
          padding-left: 20px;
        }
        .manual-seccion li {
          font-size: 14px;
          color: #3d322b;
          margin-bottom: 4px;
        }
        .manual-nota {
          page-break-inside: avoid;
          break-inside: avoid;
          border-left: 4px solid #d4a68c;
          padding: 10px 14px;
          border-radius: 0 8px 8px 0;
          margin: 12px 0;
          font-size: 13px;
          color: #5c4631;
        }
        .manual-footer-page {
          text-align: center;
          padding-top: 12px;
          margin-top: 4px;
          border-top: 2px solid #f0ebe0;
        }
        .manual-footer-page p {
          font-size: 11px;
          color: #a09080;
          margin: 0;
        }
        @media print {
          .manual-header { display: none; }
          .manual-page { padding: 0; }
          .manual-content { box-shadow: none; border-radius: 0; padding: 20px; }
        }
        @media (max-width: 640px) {
          .manual-content { padding: 16px; }
          .manual-indice { padding: 12px 16px; }
          .manual-portada { padding: 16px 12px 12px; }
        }
      `}</style>
    </div>
  )
}
