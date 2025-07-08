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
    console.log("Evento cargado:", evento)

    if (!evento) {
      throw new Error('No se pudo cargar el evento')
    }

    const titulo = document.querySelector('.crear-evento-section h2')
    titulo.textContent = '✏️ Editar Evento'

    const form = document.querySelector('.crear-evento-section form')
    const inputs = form.querySelectorAll('input, textarea')

    inputs[0].value = evento.nombre || ''
    inputs[2].value = evento.descripcion || ''
    inputs[3].value = evento.lugar || ''
    inputs[4].value = evento.precio || ''

    if (evento.fecha) {
      const fechaEvento = new Date(evento.fecha)
      const fechaFormateada = fechaEvento.toISOString().slice(0, 16)
      inputs[1].value = fechaFormateada
    }

    const button = form.querySelector('.btn-crear')
    button.textContent = '💾 Actualizar Evento'

    const inputImagen = form.querySelector('input[type="file"]')
    inputImagen.required = false

    const nuevoForm = form.cloneNode(true)
    form.parentNode.replaceChild(nuevoForm, form)

    nuevoForm.addEventListener('submit', (e) => handleEditSubmit(e, eventoId))
  } catch (error) {
    console.error('Error al cargar evento para editar:', error)
    alert('Error al cargar los datos del evento')
    if (error.message.includes("400")) {
      alert("Error 400: Petición incorrecta. Verifica que el evento existe y tienes permisos.")
    } else if (error.message.includes("401")) {
      alert("Error de autenticación. Por favor, inicia sesión nuevamente.")
    } else if (error.message.includes("404")) {
      alert("Error 404: El evento no fue encontrado.")
    } else {
      alert(`Error al cargar los datos del evento: ${error.message}`)
    }
  } finally {
    loading(false)
  }
}

async function handleEditSubmit(event, eventoId) {
  event.preventDefault()
  loading(true)

  const form = event.target
  const button = form.querySelector('.btn-crear')
  const statusMessage = form.querySelector('.status-message')
  const inputs = form.querySelectorAll('input, textarea')

  button.disabled = true

  if (
    !inputs[0].value ||
    !inputs[1].value ||
    !inputs[2].value ||
    !inputs[3].value ||
    !inputs[4].value
  ) {
    setTimeout(() => {
      loading(false)
      button.disabled = false
      statusMessage.textContent = 'Por favor complete todos los campos'
      statusMessage.style.display = 'block'
      statusMessage.style.color = '#ef4444'
    }, 500)
    return
  }

  const formData = new FormData()
  formData.append('nombre', inputs[0].value)
  formData.append('fecha', inputs[1].value)
  formData.append('descripcion', inputs[2].value)
  formData.append('lugar', inputs[3].value)
  formData.append('precio', inputs[4].value)

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

    statusMessage.textContent = '¡Evento actualizado con éxito!'
    statusMessage.style.display = 'block'
    statusMessage.style.color = '#4ade80'

    setTimeout(() => {
      CrearEvento()
    }, 1500)
  } catch (error) {
    statusMessage.textContent = 'Error al actualizar el evento.'
    statusMessage.style.display = 'block'
    statusMessage.style.color = '#ef4444'
    console.error('Error:', error)
  } finally {
    loading(false)
    button.disabled = false
  }
}

const mostrarFormularioEdicion = (elementoPadre, evento) => {
  const header = document.createElement('div')
  header.className = 'editar-header'
  header.style.display = 'flex'
  header.style.justifyContent = 'space-between'
  header.style.alignItems = 'center'
  header.style.marginBottom = '1.5rem'

  const titulo = document.createElement('h2')
  titulo.textContent = '✏️ Editar Evento'
  titulo.style.margin = '0'

  const btnVolver = document.createElement('button')
  btnVolver.className = 'btn-volver'
  btnVolver.textContent = '← Volver'
  btnVolver.style.cssText = `
    background: rgba(255, 255, 255, 0.1);
    color: #bb8218;
    border: 1px solid rgba(187, 130, 24, 0.3);
    padding: 0.5rem 1rem;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.3s ease;
  `
  btnVolver.addEventListener('click', () => {
    CrearEvento()
  })
  btnVolver.addEventListener('mouseenter', () => {
    btnVolver.style.background = 'rgba(187, 130, 24, 0.2)'
  })
  btnVolver.addEventListener('mouseleave', () => {
    btnVolver.style.background = 'rgba(255, 255, 255, 0.1)'
  })

  header.append(titulo, btnVolver)

  const form = document.createElement('form')
  form.addEventListener('submit', (e) => handleEditSubmit(e, evento.id))

  const grupoNombre = document.createElement('div')
  grupoNombre.className = 'form-group'
  const inputNombre = document.createElement('input')
  inputNombre.type = 'text'
  inputNombre.placeholder = 'Nombre del evento'
  inputNombre.value = evento.nombre || ''
  inputNombre.required = true
  grupoNombre.append(inputNombre)

  const grupoFecha = document.createElement('div')
  grupoFecha.className = 'form-group'
  const inputFecha = document.createElement('input')
  inputFecha.type = 'datetime-local'
  inputFecha.required = true

  if (evento.fecha) {
    const fechaEvento = new Date(evento.fecha)
    const fechaFormateada = fechaEvento.toISOString().slice(0, 16)
    inputFecha.value = fechaFormateada
  }
  grupoFecha.append(inputFecha)

  const grupoDescripcion = document.createElement('div')
  grupoDescripcion.className = 'form-group'
  const inputDescripcion = document.createElement('textarea')
  inputDescripcion.placeholder = 'Descripción'
  inputDescripcion.rows = 4
  inputDescripcion.value = evento.descripcion || ''
  inputDescripcion.required = true
  grupoDescripcion.append(inputDescripcion)

  const grupoLugar = document.createElement('div')
  grupoLugar.className = 'form-group'
  const inputLugar = document.createElement('input')
  inputLugar.type = 'text'
  inputLugar.placeholder = 'Lugar'
  inputLugar.value = evento.lugar || ''
  inputLugar.required = true
  grupoLugar.append(inputLugar)

  const grupoPrecio = document.createElement('div')
  grupoPrecio.className = 'form-group'
  const inputPrecio = document.createElement('input')
  inputPrecio.type = 'number'
  inputPrecio.placeholder = 'Precio'
  inputPrecio.min = '0'
  inputPrecio.step = '0.01'
  inputPrecio.value = evento.precio || ''
  inputPrecio.required = true
  grupoPrecio.append(inputPrecio)

  const grupoImagen = document.createElement('div')
  grupoImagen.className = 'form-group'

  const fileInputContainer = document.createElement('div')
  fileInputContainer.className = 'file-input'

  const inputImagen = document.createElement('input')
  inputImagen.type = 'file'
  inputImagen.id = 'file-input-edit'
  inputImagen.accept = 'image/*'
  inputImagen.required = false

  const labelImagen = document.createElement('label')
  labelImagen.htmlFor = 'file-input-edit'
  labelImagen.className = 'file-input-label'
  labelImagen.textContent = '📷 Cambiar imagen del evento (opcional)'

  inputImagen.addEventListener('change', (e) => {
    if (e.target.files[0]) {
      labelImagen.textContent = `📷 ${e.target.files[0].name}`
    } else {
      labelImagen.textContent = '📷 Cambiar imagen del evento (opcional)'
    }
  })

  fileInputContainer.append(inputImagen, labelImagen)
  grupoImagen.append(fileInputContainer)

  const button = document.createElement('button')
  button.className = 'btn-crear'
  button.textContent = '💾 Actualizar Evento'
  button.type = 'submit'

  const statusMessage = document.createElement('p')
  statusMessage.className = 'status-message'

  form.append(
    grupoNombre,
    grupoFecha,
    grupoDescripcion,
    grupoLugar,
    grupoPrecio,
    grupoImagen,
    statusMessage,
    button
  )

  elementoPadre.append(header, form)

  async function handleEditSubmit(event, eventoId) {
    event.preventDefault()
    loading(true)
    button.disabled = true

    if (
      !inputNombre.value ||
      !inputFecha.value ||
      !inputDescripcion.value ||
      !inputLugar.value ||
      !inputPrecio.value
    ) {
      setTimeout(() => {
        loading(false)
        button.disabled = false
        statusMessage.textContent = 'Por favor complete todos los campos'
        statusMessage.style.display = 'block'
        statusMessage.style.color = '#ef4444'
      }, 500)
      return
    }

    const formData = new FormData()
    formData.append('nombre', inputNombre.value)
    formData.append('fecha', inputFecha.value)
    formData.append('descripcion', inputDescripcion.value)
    formData.append('lugar', inputLugar.value)
    formData.append('precio', inputPrecio.value)

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

      statusMessage.textContent = '¡Evento actualizado con éxito!'
      statusMessage.style.display = 'block'
      statusMessage.style.color = '#4ade80'

      setTimeout(() => {
        CrearEvento()
      }, 1500)
    } catch (error) {
      statusMessage.textContent = 'Error al actualizar el evento.'
      statusMessage.style.display = 'block'
      statusMessage.style.color = '#ef4444'
      console.error('Error:', error)
    } finally {
      loading(false)
      button.disabled = false
    }
  }
}
