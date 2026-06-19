// Datos ficticios (mock) para evaluar el diseño con registros realistas del Táchira.
// Las fotografías reales disponibles localmente se usan donde aplica; el resto
// queda sin imagen (null) para mostrar un placeholder elegante sin depender de
// servicios externos. Deben sustituirse por fotografía propia del archivo del museo.

import cesteriaImg from '../assets/Cesteria.jpeg'
import cesteria2Img from '../assets/Cesteria 2.jpeg'

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
    imagenUrl: null,
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
    imagenUrl: null,
  },
  {
    id: 4,
    titulo: 'Lienzo del Páramo de Pregonero',
    categoria: 'Pintura',
    autor: 'Carmen Rosa Duque',
    ubicacion: 'Pregonero, Táchira',
    imagenUrl: null,
  },
  {
    id: 5,
    titulo: 'Ruana de Queniquea',
    categoria: 'Textiles',
    autor: 'Isabel Rangel',
    ubicacion: 'Queniquea, Táchira',
    imagenUrl: null,
  },
  {
    id: 6,
    titulo: 'Jarrón Ceremonial de Independencia',
    categoria: 'Cerámica',
    autor: 'Pedro Vivas',
    ubicacion: 'Independencia, Táchira',
    imagenUrl: null,
  },
]
