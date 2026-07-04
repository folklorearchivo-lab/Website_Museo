import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

// Postulación pública de un cultor. Ruta abierta en el backend (sin requireAuth),
// por lo tanto NO se envía Authorization aquí.
export async function postularCultorRequest(data) {
  try {
    const response = await axios.post(`${API_URL}/cultores`, data)
    return response.data
  } catch (error) {
    const errorMsg = error.response?.data?.error || error.response?.data?.message || 'Error al enviar la postulación'
    throw new Error(errorMsg, { cause: error })
  }
}

// Sube la foto/documento de cédula a Cloudinary (vía backend) y la asocia al id_cultor
// recién creado por la postulación. Ruta también pública (sin requireAuth en el
// backend), ya que el visitante no tiene sesión en este punto del flujo. No fijamos
// Content-Type a mano: el navegador debe generar el boundary del multipart solo.
export async function validarCedulaRequest(archivo) {
  try {
    const formData = new FormData()
    formData.append('archivo', archivo)

    const response = await axios.post(`${API_URL}/documentos_cultor/validar-cedula`, formData)
    return response.data
  } catch (error) {
    const data = error.response?.data
    const errorMsg = data?.error || 'La imagen no corresponde a una Cédula de Identidad válida.'
    const err = new Error(errorMsg, { cause: error })
    err.detalles = data?.detalles || []
    err.ocrData = data
    throw err
  }
}

export async function subirCedulaCultorRequest(idCultor, archivo) {
  try {
    const formData = new FormData()
    formData.append('archivo', archivo)
    formData.append('id_cultor', idCultor)

    const response = await axios.post(`${API_URL}/documentos_cultor/cedula`, formData)
    return response.data
  } catch (error) {
    const errorMsg = error.response?.data?.error || error.response?.data?.message || 'Error al subir el documento de cédula'
    throw new Error(errorMsg, { cause: error })
  }
}

// Notificaciones reales del cultor logueado (GET /api/notificaciones, requireAuth).
export async function getNotificacionesRequest(token) {
  try {
    const response = await axios.get(`${API_URL}/notificaciones`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    return response.data
  } catch (error) {
    const errorMsg = error.response?.data?.error || error.response?.data?.message || 'Error al obtener las notificaciones'
    throw new Error(errorMsg, { cause: error })
  }
}

// Marca todas las notificaciones del cultor logueado como leídas.
export async function marcarNotificacionesLeidasRequest(token) {
  try {
    const response = await axios.put(`${API_URL}/notificaciones/marcar-leidas`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    })
    return response.data
  } catch (error) {
    const errorMsg = error.response?.data?.error || error.response?.data?.message || 'Error al marcar las notificaciones como leídas'
    throw new Error(errorMsg, { cause: error })
  }
}

// Lista de parroquias para poblar el <select> de id_parroquia. Ruta pública (sin auth).
export async function getParroquiasRequest() {
  try {
    const response = await axios.get(`${API_URL}/parroquias`)
    return response.data
  } catch (error) {
    const errorMsg = error.response?.data?.error || error.response?.data?.message || 'Error al obtener las parroquias'
    throw new Error(errorMsg, { cause: error })
  }
}

// Lista de parroquias filtradas por municipio
export async function getParroquiasByMunicipioRequest(idMunicipio) {
  try {
    const response = await axios.get(`${API_URL}/parroquias/municipio/${idMunicipio}`)
    return response.data
  } catch (error) {
    const errorMsg = error.response?.data?.error || error.response?.data?.message || 'Error al obtener las parroquias filtradas'
    throw new Error(errorMsg, { cause: error })
  }
}

// Lista de municipios
export async function getMunicipiosRequest() {
  try {
    const response = await axios.get(`${API_URL}/municipios`)
    return response.data
  } catch (error) {
    const errorMsg = error.response?.data?.error || error.response?.data?.message || 'Error al obtener los municipios'
    throw new Error(errorMsg, { cause: error })
  }
}

// Lista de oficios
export async function getOficiosRequest() {
  try {
    const response = await axios.get(`${API_URL}/oficios`)
    return response.data
  } catch (error) {
    const errorMsg = error.response?.data?.error || error.response?.data?.message || 'Error al obtener los oficios'
    throw new Error(errorMsg, { cause: error })
  }
}

// Login real del cultor (POST /api/auth/login). Devuelve { message, user, token }.
export async function loginRequest(correo, password) {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, { correo, password })
    return response.data
  } catch (error) {
    // Si el servidor respondió, extraemos su mensaje exacto
    if (error.response?.data?.error) {
      throw new Error(error.response.data.error)
    }
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message)
    }
    // Error sin respuesta del servidor (red, CORS, etc.)
    throw new Error('Error de conexión con el servidor')
  }
}

// Perfil real del cultor logueado (GET /api/cultores/perfil, requireAuth).
export async function getMiPerfilRequest(token) {
  try {
    const response = await axios.get(`${API_URL}/cultores/perfil`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    return response.data
  } catch (error) {
    const errorMsg = error.response?.data?.error || error.response?.data?.message || 'Error al obtener el perfil'
    throw new Error(errorMsg, { cause: error })
  }
}

// Solicitud de recuperación: token real persistido en BD (1h de validez), devuelto en
// esta respuesta solo porque el correo se envía desde el frontend (EmailJS), no desde
// el backend. Misma ruta pública que usa el panel admin.
export async function olvidePasswordRequest(correo) {
  try {
    const response = await axios.post(`${API_URL}/auth/olvide-password`, { correo })
    return response.data
  } catch (error) {
    const errorMsg = error.response?.data?.error || error.response?.data?.message || 'Error al solicitar recuperación'
    throw new Error(errorMsg, { cause: error })
  }
}

// Confirma el restablecimiento con el token recibido por correo.
export async function resetPasswordRequest(token, newPassword) {
  try {
    const response = await axios.post(`${API_URL}/auth/reset-password`, { token, newPassword })
    return response.data
  } catch (error) {
    const errorMsg = error.response?.data?.error || error.response?.data?.message || 'Error al restablecer la contraseña'
    throw new Error(errorMsg, { cause: error })
  }
}

// Obtiene las obras públicas de la colección
export async function getGaleriaPublicaRequest() {
  try {
    const response = await axios.get(`${API_URL}/public-galeria/coleccion`)
    return response.data
  } catch (error) {
    const errorMsg = error.response?.data?.error || error.response?.data?.message || 'Error al obtener la colección'
    throw new Error(errorMsg, { cause: error })
  }
}

// Obtiene la exposición activa y sus obras asociadas
export async function getExposicionActivaRequest() {
  try {
    const response = await axios.get(`${API_URL}/public-galeria/exposicion-activa`)
    return response.data
  } catch (error) {
    const errorMsg = error.response?.data?.error || error.response?.data?.message || 'Error al obtener la exposición activa'
    throw new Error(errorMsg, { cause: error })
  }
}

// Envía una nueva obra desde el portal del cultor. El backend asignará estatus 'pendiente'.
export async function postularObraRequest(data, token) {
  try {
    const response = await axios.post(`${API_URL}/obras`, data, {
      headers: { Authorization: `Bearer ${token}` }
    })
    return response.data
  } catch (error) {
    const errorMsg = error.response?.data?.error || error.response?.data?.message || 'Error al enviar la obra'
    throw new Error(errorMsg, { cause: error })
  }
}

// Sube archivo multimedia ligado a una obra recién creada
export async function subirMultimediaObraRequest(formData, token) {
  try {
    const response = await axios.post(`${API_URL}/multimedia/upload`, formData, {
      headers: { Authorization: `Bearer ${token}` }
    })
    return response.data
  } catch (error) {
    const errorMsg = error.response?.data?.error || error.response?.data?.message || 'Error al subir la imagen de la obra'
    throw new Error(errorMsg, { cause: error })
  }
}

// Obtiene todas las obras del cultor logueado (aprobadas + pendientes)
export async function getMisObrasRequest(token) {
  try {
    const response = await axios.get(`${API_URL}/obras`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    return response.data
  } catch (error) {
    const errorMsg = error.response?.data?.error || error.response?.data?.message || 'Error al obtener tus obras'
    throw new Error(errorMsg, { cause: error })
  }
}

// Actualizar el perfil del cultor logueado (PATCH /cultores/mi-perfil)
export async function updateMiPerfilRequest(data, token) {
  try {
    const response = await axios.patch(`${API_URL}/cultores/mi-perfil`, data, {
      headers: { Authorization: `Bearer ${token}` }
    })
    return response.data
  } catch (error) {
    const errorMsg = error.response?.data?.error || error.response?.data?.message || 'Error al actualizar el perfil'
    throw new Error(errorMsg, { cause: error })
  }
}

// Agregar texto al resumen curricular del cultor (PATCH /cultores/mi-perfil/curriculum)
export async function appendCurriculumRequest(texto, token) {
  try {
    const response = await axios.patch(`${API_URL}/cultores/mi-perfil/curriculum`, { texto }, {
      headers: { Authorization: `Bearer ${token}` }
    })
    return response.data
  } catch (error) {
    const errorMsg = error.response?.data?.error || error.response?.data?.message || 'Error al agregar al currículum'
    throw new Error(errorMsg, { cause: error })
  }
}
