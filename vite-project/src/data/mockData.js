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
    bio: 'Artesana especializada en técnicas de tejido tradicionales con caña brava y bejuco. Heredera de un linaje de tejedores de la frontera.',
    estado: 'Miembro Activo',
    obrasCount: 12,
    contacto: {
      email: 'mariajose@cultores.ta.gob.ve',
      telefono: '+58 414 1234567'
    }
  },
  {
    id: 2,
    nombres: 'Ramón Antonio',
    apellidos: 'Contreras Pérez',
    oficio: 'Alfarería y cerámica',
    municipio: 'Capacho (Libertador)',
    fotoUrl: null,
    bio: 'Maestro alfarero con más de 40 años de trayectoria. Reconocido por sus tinajas utilitarias y piezas decorativas con barro rojo local.',
    estado: 'Maestro Honorario',
    obrasCount: 34,
    contacto: {
      email: 'ramon.alfarero@gmail.com',
      telefono: '+58 424 7654321'
    }
  },
  {
    id: 3,
    nombres: 'Carmen Rosa',
    apellidos: 'Duque',
    oficio: 'Pintura',
    municipio: 'Pregonero',
    fotoUrl: lienzoImg,
    bio: 'Artista visual autodidacta enfocada en retratar los paisajes del páramo tachirense y la vida campesina a través del óleo.',
    estado: 'Miembro Activo',
    obrasCount: 8,
    contacto: {
      email: 'carmen.duque.arte@hotmail.com',
      telefono: '+58 412 9876543'
    }
  }
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

export const notificacionesMock = [
  {
    id: 1,
    tipo: 'invitacion',
    titulo: 'Invitación a Exposición',
    mensaje: 'Has sido seleccionado para participar en la muestra "Raíces de Los Andes" este mes.',
    tiempo: 'Hace 2 horas',
    leida: false
  },
  {
    id: 2,
    tipo: 'aprobado',
    titulo: 'Obra Aprobada',
    mensaje: 'Tu obra "Cestería de Ureña" ha sido revisada y agregada exitosamente al archivo digital.',
    tiempo: 'Hace 1 día',
    leida: true
  },
  {
    id: 3,
    tipo: 'pendiente',
    titulo: 'Revisión en Proceso',
    mensaje: 'El administrador está revisando tu nueva obra "Canasta Tradicional". Te avisaremos pronto.',
    tiempo: 'Hace 3 días',
    leida: true
  },
  {
    id: 4,
    tipo: 'rechazado',
    titulo: 'Fotografía no válida',
    mensaje: 'La obra "Tejido de palma" no pudo ser aprobada porque la fotografía está muy borrosa. Por favor, súbela de nuevo.',
    tiempo: 'Hace 1 semana',
    leida: true
  }
]
