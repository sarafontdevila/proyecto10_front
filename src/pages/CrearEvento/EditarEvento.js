import './CrearEvento.css'
import { fetchData } from '../../utils/api'
import { loading } from '../../components/Loading/Loading'
import { CrearEvento } from './CrearEvento'
import '../../components/StatusMessage/StatusMessage.css'

export const editarEvento = async (eventoId) => {
  if (!eventoId) {
    console.error('ID de evento no válido:', eventoId)
    alert('Error: ID de evento no válido')
    return
  }

  try {
    loading(true)
    console.log('Intentando cargar evento con ID:', eventoId)

    const evento = await fetchData({
      url: `https://proyecto10-full-stack-js-gwfa.vercel.app/api/v1/eventos/${eventoId}`,
      method: 'GET',
      token: localStorage.getItem('token')
    })

    if (!evento) {
      throw new Error('No se pudo cargar el evento')
    }

    console.log('Evento cargado:', evento)

    const titulo = document.querySelector('.crear-evento-section h2')
    titulo.textContent = '✏️ Editar Evento'

    const form = document.querySelector('.crear-evento-section form')
    const inputs = form.querySelectorAll('input, textarea')

    inputs[0].value = evento.nombre || ''
    inputs[1].value = evento.fecha
      ? new Date(evento.fecha).toISOString().slice(0, 16)
      : ''
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
  } finally {
    loading(false)
  }
}

async function handleEditSubmit(event, eventoId) {
  event.preventDefault()
  loading(true)

  const form = event.target
  const button = form.querySelector('.btn-crear')
  const statusMessage =
    form.querySelector('.status-message') || document.createElement('p')
  statusMessage.className = 'status-message'

  if (!form.contains(statusMessage)) form.appendChild(statusMessage)

  const inputs = form.querySelectorAll('input, textarea')
  const [nombre, fecha, descripcion, lugar, precio] = inputs

  button.disabled = true

  if (
    ![nombre, fecha, descripcion, lugar, precio].every(
      (input) => input.value.trim() !== ''
    )
  ) {
    setTimeout(() => {
      loading(false)
      button.disabled = false
      statusMessage.textContent = 'Por favor complete todos los campos'
      statusMessage.className = 'status-message error'
      statusMessage.style.display = 'block'
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
      url: `https://proyecto10-full-stack-js-gwfa.vercel.app/api/v1/eventos/${eventoId}`,
      method: 'PUT',
      body: formData,
      token: localStorage.getItem('token')
    })

    statusMessage.textContent = '¡Evento actualizado con éxito!'
    statusMessage.className = 'status-message success'
    statusMessage.style.display = 'block'

    setTimeout(() => {
      CrearEvento()
    }, 1500)
  } catch (error) {
    console.error('Error:', error)
    statusMessage.textContent = 'Error al actualizar el evento.'
    statusMessage.className = 'status-message error'
    statusMessage.style.display = 'block'
  } finally {
    loading(false)
    button.disabled = false
  }
}
