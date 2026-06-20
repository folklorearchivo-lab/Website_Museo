// Datos ficticios (mock) para evaluar el diseño con registros realistas del Táchira.
// Las fotografías reales disponibles localmente se usan donde aplica; el resto
// queda sin imagen (null) para mostrar un placeholder elegante sin depender de
// servicios externos. Deben sustituirse por fotografía propia del archivo del museo.

import cesteriaImg from '../assets/Cesteria.jpeg'
import cesteria2Img from '../assets/Cesteria 2.jpeg'
import tinajaImg from '../assets/tinaja.png'
import mascaraImg from '../assets/mascara.png'
import lienzoImg from '../assets/lienzo.png'
import ruanaImg from '../assets/ruana.png'
import jarronImg from '../assets/jarron.png'

export const categorias = [
  'Todas',
  'Talla en madera',
  'Cerámica',
  'Pintura',
  'Cestería',
  'Textiles',
]

export const cultoresIniciales = [
  {
    id: 1,
    nombres: 'María José',
    apellidos: 'Useche Rangel',
    oficio: 'Cestería',
    municipio: 'Ureña',
    fotoUrl: cesteriaImg,
  },
  {
    id: 2,
    nombres: 'Ramón Antonio',
    apellidos: 'Contreras Pérez',
    oficio: 'Alfarería y cerámica',
    municipio: 'Capacho (Libertador)',
    fotoUrl: null,
  },
]

export const obrasIniciales = [
  {
    id: 1,
    titulo: 'Tinaja de Capacho',
    categoria: 'Cerámica',
    autor: 'Ramón Antonio Contreras Pérez',
    ubicacion: 'Capacho, Táchira',
    imagenUrl: tinajaImg,
  },
  {
    id: 2,
    titulo: 'Cestería de Ureña',
    categoria: 'Cestería',
    autor: 'María José Useche Rangel',
    ubicacion: 'Ureña, Táchira',
    imagenUrl: cesteria2Img,
  },
  {
    id: 3,
    titulo: 'Máscara de Cedro de Lobatera',
    categoria: 'Talla en madera',
    autor: 'José Antonio Mora',
    ubicacion: 'Lobatera, Táchira',
    imagenUrl: mascaraImg,
  },
  {
    id: 4,
    titulo: 'Lienzo del Páramo de Pregonero',
    categoria: 'Pintura',
    autor: 'Carmen Rosa Duque',
    ubicacion: 'Pregonero, Táchira',
    imagenUrl: lienzoImg,
  },
  {
    id: 5,
    titulo: 'Ruana de Queniquea',
    categoria: 'Textiles',
    autor: 'Isabel Rangel',
    ubicacion: 'Queniquea, Táchira',
    imagenUrl: ruanaImg,
  },
  {
    id: 6,
    titulo: 'Jarrón Ceremonial de Independencia',
    categoria: 'Cerámica',
    autor: 'Pedro Vivas',
    ubicacion: 'Independencia, Táchira',
    imagenUrl: jarronImg,
  },
]

export const eventosProgramados = [
  {
    id: 1,
    titulo: 'Exposición Actual: Raíces de Los Andes',
    descripcion: 'Una muestra destacada de artesanía andina seleccionada para este momento.',
    fechaInicio: '2026-06-15',
    fechaFin: '2026-06-30',
    activa: true,
    obrasIds: [1, 3, 5],
  },
  {
    id: 2,
    titulo: 'Muestra Textil y Cestería',
    descripcion: 'Obras destacadas en textiles y cestería de nuestros cultores.',
    fechaInicio: '2026-08-10',
    fechaFin: '2026-08-20',
    activa: false,
    obrasIds: [2, 5],
  }
]
