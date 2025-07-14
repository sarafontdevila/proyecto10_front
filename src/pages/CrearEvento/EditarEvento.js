import './CrearEvento.css'
import { fetchData } from '../../utils/api'
import { loading } from '../../components/Loading/Loading'
import { CrearEvento } from './CrearEvento'

export const editarEvento = async (eventoId) => {
  if (!eventoId) {
    console.error("ID de evento no válido:", eventoId)
    alert("Error: ID de evento no válido")
    return
  }

  try {
    loading(true)
    console.log("Intentando cargar evento con ID:", eventoId)

    const evento = await fetchData({
      url: `http://localhost:3000/api/v1/eventos/${eventoId}`,
      method: 'GET',
      token: localStorage.getItem('token')
    })

    if (!evento) {
      throw new Error('No se pudo cargar el evento')
    }

    console.log("Evento cargado:", evento)

    const titulo = document.querySelector('.crear-evento-section h2')
    titulo.textContent = '✏️ Editar Evento'

    const form = document.querySelector('.crear-evento-section form')
    const inputs = form.querySelectorAll('input, textarea')

    inputs[0].value = evento.nombre || ''
    inputs[1].value = evento.fecha ? new Date(evento.fecha).toISOString().slice(0, 16) : ''
    inputs[2].value = evento.descripcion || ''
    inputs[3].value = evento.lugar || ''
    inputs[4].value = evento.precio || ''

    const button = form.querySelector('.btn-crear')
    button.textContent = '💾 Actualizar Evento'

    const inputImagen = form.querySelector('input[type="file"]')
    inputImagen.required = false

    const nuevoForm = form.cloneNode(true)
    form.parentNode.replaceChild(nuevoForm, form)

    nuevoForm.addEventListener('submit', (e) => handleEditSubmit(e, eventoId))
  } catch (error) {
    console.error('Error al cargar evento para editar:', error)

    alert(
      error.message.includes("400")
        ? "Error 400: Petición incorrecta. Verifica que el evento existe y tienes permisos."
        : error.message.includes("401")
        ? "Error de autenticación. Por favor, inicia sesión nuevamente."
        : error.message.includes("404")
        ? "Error 404: El evento no fue encontrado."
        : `Error al cargar los datos del evento: ${error.message}`
    )
  } finally {
    loading(false)
  }
}

async function handleEditSubmit(event, eventoId) {
  event.preventDefault()
  loading(true)

  const form = event.target
  const button = form.querySelector('.btn-crear')
  const statusMessage = form.querySelector('.status-message') || document.createElement('p')
  statusMessage.className = 'status-message'

  if (!form.contains(statusMessage)) form.appendChild(statusMessage)

  const inputs = form.querySelectorAll('input, textarea')
  const [nombre, fecha, descripcion, lugar, precio] = inputs

  button.disabled = true

  if (![nombre, fecha, descripcion, lugar, precio].every(input => input.value.trim() !== '')) {
    setTimeout(() => {
      loading(false)
      button.disabled = false
      mostrarMensaje(statusMessage, 'Por favor complete todos los campos', '#ef4444')
    }, 500)
    return
  }

  const formData = new FormData()
  formData.append('nombre', nombre.value)
  formData.append('fecha', fecha.value)
  formData.append('descripcion', descripcion.value)
  formData.append('lugar', lugar.value)
  formData.append('precio', precio.value)

  const inputImagen = form.querySelector('input[type="file"]')
  if (inputImagen.files[0]) {
    formData.append('imagen', inputImagen.files[0])
  }

  try {
    await fetchData({
      url: `http://localhost:3000/api/v1/eventos/${eventoId}`,
      method: 'PUT',
      body: formData,
      token: localStorage.getItem('token')
    })

    mostrarMensaje(statusMessage, '¡Evento actualizado con éxito!', '#4ade80')

    setTimeout(() => {
      CrearEvento()
    }, 1500)
  } catch (error) {
    console.error('Error:', error)
    mostrarMensaje(statusMessage, 'Error al actualizar el evento.', '#ef4444')
  } finally {
    loading(false)
    button.disabled = false
  }
}

function mostrarMensaje(elemento, mensaje, color) {
  elemento.textContent = mensaje
  elemento.style.display = 'block'
  elemento.style.color = color
}
