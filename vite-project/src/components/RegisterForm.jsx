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
    <legend className="w-full pb-4">
      <span className="inline-block rounded-full bg-warm-sand/70 px-4 py-1.5 font-serif text-lg text-cafe-noir shadow-sm backdrop-blur-sm">
        {children}
      </span>
    </legend>
  )
}

function RegisterForm() {
  const [form, setForm] = useState(initialFormState)
  const [funcionalidadMarcada, setFuncionalidadMarcada] = useState([])
  const [recaudosMarcados, setRecaudosMarcados] = useState([])
  const [archivos, setArchivos] = useState([])
  const [enviado, setEnviado] = useState(false)

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
    <section id="registro" className="relative scroll-mt-20 overflow-hidden bg-[#8E7257] py-28">
      {/* Fotografía de cestería de fondo en toda la sección, con encuadre más abierto (menos cerca/zoom) */}
      <div
        className="absolute inset-0 bg-cover bg-top bg-no-repeat sepia-[.3] contrast-[1] saturate-[.9]"
        style={{ backgroundImage: `url(${cesteria2Img})` }}
      />
      {/* Velo de color: arranca en el tono exacto donde termina la Galería y se funde hacia abajo, sin opacar del todo la foto */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#A98B6E]/90 via-[#8E7257]/80 to-[#8E7257]/95" />

      <div className="relative mx-auto max-w-3xl px-6">
        <div className="text-center">
          <span className="font-sans text-xs uppercase tracking-[0.25em] text-cafe-noir/70">
            Registro Nacional de Artesanos
          </span>
          <h2 className="mt-4 font-serif text-4xl text-cafe-noir lg:text-5xl">
            Solicitud de Inscripción
          </h2>
          <div className="mx-auto mt-6 h-px w-20 bg-cafe-noir/30" />
          <p className="mt-6 font-sans text-cafe-noir/80">
            Museo del Táchira · Archivo Táchira: Folklore y Patrimonio
          </p>
        </div>

        <div className="mt-12 rounded-3xl border border-white/30 bg-white/40 p-5 shadow-2xl shadow-cafe-noir/20 backdrop-blur-md sm:p-8 lg:p-12">
          {enviado && (
            <div className="mb-8 rounded-2xl border border-white/40 bg-white/40 px-4 py-3 text-center font-sans text-sm text-cafe-noir backdrop-blur-sm">
              Tu solicitud fue recibida. El equipo del museo la revisará y se
              pondrá en contacto contigo.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-14">
          {/* Sección I: Datos Personales */}
          <fieldset>
            <SectionTitle>I. Datos Personales</SectionTitle>
            <div className="mt-8 grid grid-cols-1 gap-x-8 gap-y-7 md:grid-cols-2">
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
          </fieldset>

          {/* Sección II: Oficio, Producto y Materia Prima */}
          <fieldset>
            <SectionTitle>II. Características de Oficio y Producto</SectionTitle>
            <div className="mt-8 grid grid-cols-1 gap-x-8 gap-y-7 md:grid-cols-2">
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
              <span className="font-sans text-xs uppercase tracking-wider text-secondary">
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
              <span className="font-sans text-xs uppercase tracking-wider text-secondary">
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
              <span className="font-sans text-xs uppercase tracking-wider text-secondary">
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
          </fieldset>

          {/* Sección III: Declaración y Recaudos */}
          <fieldset>
            <SectionTitle>III. Declaración de Buena Fe y Recaudos</SectionTitle>

            <p className="mt-8 font-sans text-sm leading-relaxed text-primary">
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
              <span className="font-sans text-xs uppercase tracking-wider text-secondary">
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
              <span className="font-sans text-xs uppercase tracking-wider text-secondary">
                Documentos de soporte
              </span>
              <div className="mt-3">
                <Dropzone files={archivos} onFilesChange={setArchivos} />
              </div>
            </div>
          </fieldset>

          <div className="flex justify-center pt-4 sm:justify-end">
            <button
              type="submit"
              className="w-full rounded-full bg-primary px-10 py-3.5 font-sans text-sm font-semibold uppercase tracking-wider text-linen shadow-md transition-colors hover:bg-cafe-noir sm:w-auto"
            >
              Enviar solicitud
            </button>
          </div>
          </form>
        </div>
      </div>
    </section>
  )
}

export default RegisterForm
