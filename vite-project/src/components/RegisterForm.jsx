import { useState } from 'react'

import cesteria2Img from '../assets/Cesteria 2.jpeg'
import TextInput from './form/TextInput'
import SelectInput from './form/SelectInput'
import DateInput from './form/DateInput'
import Dropzone from './form/Dropzone'
import Checkbox from './form/Checkbox'
import Radio from './form/Radio'

const municipios = [
  'San Cristóbal',
  'Capacho (Libertador)',
  'Independencia',
  'Lobatera',
  'Pregonero',
  'Queniquea',
  'Rubio',
]

const oficios = [
  'Alfarería y cerámica',
  'Cestería',
  'Talla en madera',
  'Textiles y tejidos',
  'Pintura popular',
  'Marroquinería',
]

const funcionalidades = ['Utilitaria', 'Decorativa', 'Ceremonial', 'Mixta']

const recaudosRequeridos = [
  'Copia de la cédula de identidad',
  'Resumen curricular del oficio',
  'Fotografías del proceso productivo',
  'Fotografías de las obras terminadas',
  'Constancia de residencia',
]

const initialFormState = {
  nombres: '',
  apellidos: '',
  cedula: '',
  fechaNacimiento: '',
  lugarNacimiento: '',
  municipio: '',
  telefono: '',
  correo: '',
  oficio: '',
  especialidad: '',
  producto: '',
  clasificacion: '',
  materiaPrima: '',
  fuenteMateriaPrima: '',
  comercializa: '',
  lugaresVenta: '',
  firma: '',
}

function SectionTitle({ children }) {
  return (
    <div className="w-full mb-6">
      <span className="inline-block rounded-full border border-white/30 bg-[#4A3219] px-4 py-1.5 font-sans font-medium text-sm text-white">
        {children}
      </span>
    </div>
  )
}

function RegisterForm({ isOpen, onClose }) {
  const [form, setForm] = useState(initialFormState)
  const [funcionalidadMarcada, setFuncionalidadMarcada] = useState([])
  const [recaudosMarcados, setRecaudosMarcados] = useState([])
  const [archivos, setArchivos] = useState([])
  const [enviado, setEnviado] = useState(false)

  if (!isOpen) return null;

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const toggleEnLista = (lista, setLista, valor) => {
    setLista(
      lista.includes(valor)
        ? lista.filter((item) => item !== valor)
        : [...lista, valor],
    )
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setEnviado(true)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#3a200d]/50 backdrop-blur-md">
      <div className="relative w-full max-w-4xl h-auto max-h-[90vh] rounded-[2rem] bg-[#F4F0E6] shadow-2xl shadow-black/50 flex flex-col">

        {/* Botón de cerrar */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-20 flex h-10 w-10 items-center justify-center rounded-full text-cafe-noir transition-opacity hover:opacity-70"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Contenido scrollable del modal con barra de desplazamiento estilizada */}
        <div className="relative z-10 w-full overflow-y-auto px-6 py-10 sm:px-12 sm:py-14 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-cafe-noir/20 hover:scrollbar-thumb-cafe-noir/40 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-cafe-noir/20 hover:[&::-webkit-scrollbar-thumb]:bg-cafe-noir/40">
        <div className="text-center text-cafe-noir">
          <span className="font-sans text-xs uppercase tracking-[0.1em] text-cafe-noir/80">
            Registro Nacional de Artesanos
          </span>
          <h2 className="mt-1 font-sans font-semibold tracking-tight text-3xl sm:text-4xl text-cafe-noir">
            Solicitud de Inscripción
          </h2>
          <p className="mt-2 font-sans text-sm text-cafe-noir/90">
            Museo del Táchira · Archivo regional de folklore y patrimonio cultural "Luis Felipe Ramón y Rivera"
          </p>
        </div>

        <div className="mt-10">
          {enviado && (
            <div className="mb-8 rounded-2xl border border-cafe-noir/20 bg-white/50 px-4 py-3 text-center font-sans text-sm text-cafe-noir">
              Tu solicitud fue recibida. El equipo del museo la revisará y se
              pondrá en contacto contigo.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-14">
          {/* Sección I: Datos Personales */}
          <div className="space-y-0">
            <SectionTitle>I. Datos Personales</SectionTitle>
            <div className="mt-2 grid grid-cols-1 gap-x-8 gap-y-7 md:grid-cols-2">
              <TextInput
                label="Nombres"
                name="nombres"
                required
                value={form.nombres}
                onChange={handleChange}
                placeholder="Ej. María José"
              />
              <TextInput
                label="Apellidos"
                name="apellidos"
                required
                value={form.apellidos}
                onChange={handleChange}
                placeholder="Ej. Useche Rangel"
              />
              <TextInput
                label="Cédula de identidad"
                name="cedula"
                required
                value={form.cedula}
                onChange={handleChange}
                placeholder="V-9876543"
              />
              <DateInput
                label="Fecha de nacimiento"
                name="fechaNacimiento"
                required
                value={form.fechaNacimiento}
                onChange={handleChange}
              />
              <TextInput
                label="Lugar de nacimiento"
                name="lugarNacimiento"
                value={form.lugarNacimiento}
                onChange={handleChange}
                placeholder="Ureña, Táchira"
              />
              <SelectInput
                label="Municipio de residencia"
                name="municipio"
                required
                value={form.municipio}
                onChange={handleChange}
                options={municipios}
              />
              <TextInput
                label="Teléfono de contacto"
                name="telefono"
                type="tel"
                required
                value={form.telefono}
                onChange={handleChange}
                placeholder="0414-0000000"
              />
              <TextInput
                label="Correo electrónico"
                name="correo"
                type="email"
                value={form.correo}
                onChange={handleChange}
                placeholder="nombre@correo.com"
              />
            </div>
          </div>

          {/* Sección II: Oficio, Producto y Materia Prima */}
          <div className="space-y-0">
            <SectionTitle>II. Características de Oficio y Producto</SectionTitle>
            <div className="mt-2 grid grid-cols-1 gap-x-8 gap-y-7 md:grid-cols-2">
              <SelectInput
                label="Oficio"
                name="oficio"
                required
                value={form.oficio}
                onChange={handleChange}
                options={oficios}
              />
              <TextInput
                label="Especialidad"
                name="especialidad"
                value={form.especialidad}
                onChange={handleChange}
                placeholder="Ej. Cestería en bejuco"
              />
              <TextInput
                label="Producto principal"
                name="producto"
                value={form.producto}
                onChange={handleChange}
                placeholder="Ej. Tinaja de Capacho"
              />
              <TextInput
                label="Materia prima utilizada"
                name="materiaPrima"
                value={form.materiaPrima}
                onChange={handleChange}
                placeholder="Ej. Arcilla roja de Capacho"
              />
              <TextInput
                label="Procedencia de la materia prima"
                name="fuenteMateriaPrima"
                value={form.fuenteMateriaPrima}
                onChange={handleChange}
                placeholder="Ej. Extracción local, compra a terceros"
              />
            </div>

            <div className="mt-8">
              <span className="font-sans text-xs font-semibold uppercase tracking-wide text-cafe-noir">
                Clasificación
              </span>
              <div className="mt-3 flex flex-wrap gap-6">
                {['Indígena', 'Tradicional', 'Contemporánea'].map((opcion) => (
                  <Radio
                    key={opcion}
                    name="clasificacion"
                    value={opcion}
                    checked={form.clasificacion === opcion}
                    onChange={handleChange}
                    label={opcion}
                  />
                ))}
              </div>
            </div>

            <div className="mt-8">
              <span className="font-sans text-xs font-semibold uppercase tracking-wide text-cafe-noir">
                Funcionalidad
              </span>
              <div className="mt-3 flex flex-wrap gap-6">
                {funcionalidades.map((opcion) => (
                  <Checkbox
                    key={opcion}
                    checked={funcionalidadMarcada.includes(opcion)}
                    onChange={() =>
                      toggleEnLista(funcionalidadMarcada, setFuncionalidadMarcada, opcion)
                    }
                    label={opcion}
                  />
                ))}
              </div>
            </div>

            <div className="mt-8">
              <span className="font-sans text-xs font-semibold uppercase tracking-wide text-cafe-noir">
                Comercialización
              </span>
              <div className="mt-3 flex flex-wrap gap-6">
                {['Sí comercializa', 'No comercializa'].map((opcion) => (
                  <Radio
                    key={opcion}
                    name="comercializa"
                    value={opcion}
                    checked={form.comercializa === opcion}
                    onChange={handleChange}
                    label={opcion}
                  />
                ))}
              </div>
              <div className="mt-5">
                <TextInput
                  label="Lugares de venta habituales"
                  name="lugaresVenta"
                  value={form.lugaresVenta}
                  onChange={handleChange}
                  placeholder="Ej. Mercado artesanal, ferias, encargos"
                />
              </div>
            </div>
          </div>

          {/* Sección III: Declaración y Recaudos */}
          <div className="space-y-0">
            <SectionTitle>III. Declaración de Buena Fe y Recaudos</SectionTitle>

            <p className="mt-2 font-sans text-sm leading-relaxed text-cafe-noir">
              Declaro que la información suministrada en este formulario es
              verídica y autorizo al Museo del Táchira a verificarla con
              fines de registro patrimonial.
            </p>

            <div className="mt-6">
              <TextInput
                label="Firma (nombre completo como constancia)"
                name="firma"
                required
                value={form.firma}
                onChange={handleChange}
                placeholder="Ej. María José Useche Rangel"
              />
            </div>

            <div className="mt-8">
              <span className="font-sans text-xs font-semibold uppercase tracking-wide text-cafe-noir">
                Recaudos exigidos
              </span>
              <div className="mt-3 space-y-2.5">
                {recaudosRequeridos.map((recaudo) => (
                  <Checkbox
                    key={recaudo}
                    checked={recaudosMarcados.includes(recaudo)}
                    onChange={() =>
                      toggleEnLista(recaudosMarcados, setRecaudosMarcados, recaudo)
                    }
                    label={recaudo}
                  />
                ))}
              </div>
            </div>

            <div className="mt-8">
              <span className="font-sans text-xs font-semibold uppercase tracking-wide text-cafe-noir">
                Documentos de soporte
              </span>
              <div className="mt-3">
                <Dropzone files={archivos} onFilesChange={setArchivos} />
              </div>
            </div>
          </div>

          <div className="flex justify-center pt-4 sm:justify-end">
            <button
              type="submit"
              className="w-full rounded-full bg-cafe-noir px-10 py-3.5 font-sans text-sm font-semibold uppercase tracking-wider text-white shadow-md transition-opacity hover:opacity-80 sm:w-auto"
            >
              Enviar solicitud
            </button>
          </div>
          </form>
        </div>
        </div>
      </div>
    </div>
  )
}

export default RegisterForm
