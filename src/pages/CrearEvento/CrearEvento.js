import "./CrearEvento.css"
import { fetchData } from "../../utils/api"
import { loading } from "../../components/Loading/Loading"

export const CrearEvento = () => {
  const main = document.querySelector("main")
  main.innerHTML = ""

  const container = document.createElement("div")
  container.className = "container"

  
  const crearEventoSection = document.createElement("div")
  crearEventoSection.className = "crear-evento-section"
  crearEventoSection.id = "crear"

 
  const misEventosSection = document.createElement("div")
  misEventosSection.className = "mis-eventos-section"

  Crear(crearEventoSection)
  MisEventos(misEventosSection)

  container.append(crearEventoSection, misEventosSection)
  main.append(container)
}

const Crear = (elementoPadre) => {
 
  const titulo = document.createElement("h2")
  titulo.textContent = "✨ Crear Nuevo Evento"

  
  const form = document.createElement("form")
  form.addEventListener("submit", handleSubmit)

  
  const grupoNombre = document.createElement("div")
  grupoNombre.className = "form-group"
  const inputNombre = document.createElement("input")
  inputNombre.type = "text"
  inputNombre.placeholder = "Nombre del evento"
  inputNombre.required = true
  grupoNombre.append(inputNombre)


  const grupoFecha = document.createElement("div")
  grupoFecha.className = "form-group"
  const inputFecha = document.createElement("input")
  inputFecha.type = "datetime-local"
  inputFecha.required = true
  grupoFecha.append(inputFecha)

  
  const grupoDescripcion = document.createElement("div")
  grupoDescripcion.className = "form-group"
  const inputDescripcion = document.createElement("textarea")
  inputDescripcion.placeholder = "Descripción"
  inputDescripcion.rows = 4
  inputDescripcion.required = true
  grupoDescripcion.append(inputDescripcion)


  const grupoLugar = document.createElement("div")
  grupoLugar.className = "form-group"
  const inputLugar = document.createElement("input")
  inputLugar.type = "text"
  inputLugar.placeholder = "Lugar"
  inputLugar.required = true
  grupoLugar.append(inputLugar)

  const grupoPrecio = document.createElement("div")
  grupoPrecio.className = "form-group"
  const inputPrecio = document.createElement("input")
  inputPrecio.type = "number"
  inputPrecio.placeholder = "Precio"
  inputPrecio.min = "0"
  inputPrecio.step = "0.01"
  inputPrecio.required = true
  grupoPrecio.append(inputPrecio)

  
  const grupoImagen = document.createElement("div")
  grupoImagen.className = "form-group"
  const fileInputContainer = document.createElement("div")
  fileInputContainer.className = "file-input"
  const inputImagen = document.createElement("input")
  inputImagen.type = "file"
  inputImagen.id = "file-input"
  inputImagen.accept = "image/*"
  inputImagen.required = true
  const labelImagen = document.createElement("label")
  labelImagen.htmlFor = "file-input"
  labelImagen.className = "file-input-label"
  labelImagen.textContent = "📷 Seleccionar imagen del evento"


  inputImagen.addEventListener("change", (e) => {
    if (e.target.files[0]) {
      labelImagen.textContent = `📷 ${e.target.files[0].name}`
    } else {
      labelImagen.textContent = "📷 Seleccionar imagen del evento"
    }
  })

  fileInputContainer.append(inputImagen, labelImagen)
  grupoImagen.append(fileInputContainer)

 
  const button = document.createElement("button")
  button.className = "btn-crear"
  button.textContent = "🎉 Crear Evento"
  button.type = "submit"


  const statusMessage = document.createElement("p")
  statusMessage.className = "status-message"

  form.append(grupoNombre, grupoFecha, grupoDescripcion, grupoLugar, grupoPrecio, grupoImagen, statusMessage, button)

  elementoPadre.append(titulo, form)

  async function handleSubmit(event) {
    event.preventDefault()
    loading(true)
    button.disabled = true

    if (
      !inputNombre.value ||
      !inputFecha.value ||
      !inputDescripcion.value ||
      !inputLugar.value ||
      !inputPrecio.value ||
      !inputImagen.files[0]
    ) {
      setTimeout(() => {
        loading(false)
        button.disabled = false
        statusMessage.textContent = "Por favor complete todos los campos"
        statusMessage.style.display = "block"
      }, 500)
      return
    }

    const formData = new FormData()
    formData.append("nombre", inputNombre.value)
    formData.append("fecha", inputFecha.value)
    formData.append("descripcion", inputDescripcion.value)
    formData.append("lugar", inputLugar.value)
    formData.append("precio", inputPrecio.value)
    formData.append("imagen", inputImagen.files[0])

    try {
      await fetchData({
        url: "http://localhost:3000/api/v1/eventos/",
        method: "POST",
        body: formData,
        token: localStorage.getItem("token"),
      })

      statusMessage.textContent = "Evento creado con éxito!"
      statusMessage.style.display = "block"
      statusMessage.style.color = "#4ade80"
      form.reset()
      labelImagen.textContent = "📷 Seleccionar imagen del evento"

     
      setTimeout(() => {
        CrearEvento() 
      }, 1500)
    } catch (error) {
      statusMessage.textContent = "Error al crear el evento."
      statusMessage.style.display = "block"
      statusMessage.style.color = "#ef4444"
      console.error("Error:", error)
    } finally {
      loading(false)
      button.disabled = false
    }
  }
}

const MisEventos = async (elementoPadre) => {
 
  const header = document.createElement("div")
  header.className = "mis-eventos-header"

  const titulo = document.createElement("h2")
  titulo.textContent = "🎭 Mis Eventos Creados"

  const eventosCount = document.createElement("div")
  eventosCount.className = "eventos-count"
  eventosCount.textContent = "0 eventos"

  header.append(titulo, eventosCount)

  
  const eventosGrid = document.createElement("div")
  eventosGrid.className = "eventos-grid"

  elementoPadre.append(header, eventosGrid)

  
  try {
    const response = await fetchData({
      url: "http://localhost:3000/api/v1/eventos/mis-eventos",
      method: "GET",
      token: localStorage.getItem("token"),
    })

    if (response && response.length > 0) {
      eventosCount.textContent = `${response.length} evento${response.length !== 1 ? "s" : ""}`

      response.forEach((evento) => {
        const eventoCard = crearEventoCard(evento)
        eventosGrid.append(eventoCard)
      })
    } else {
      mostrarEstadoVacio(eventosGrid)
    }
  } catch (error) {
    console.error("Error al cargar eventos:", error)
    mostrarEstadoVacio(eventosGrid)
  }
}

const crearEventoCard = (evento) => {
  const card = document.createElement("div")
  card.className = "evento-card"


  const titulo = document.createElement("div")
  titulo.className = "evento-title"
  titulo.textContent = evento.nombre

  
  const info = document.createElement("div")
  info.className = "evento-info"

  const fecha = new Date(evento.fecha).toLocaleDateString("es-ES", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })

  const detalles = [
    { icon: "📅", text: fecha },
    { icon: "📍", text: evento.lugar },
    { icon: "💰", text: `${evento.precio}€` },
  ]

  detalles.forEach((detalle) => {
    const detalleDiv = document.createElement("div")
    detalleDiv.className = "evento-detail"

    const icon = document.createElement("span")
    icon.className = "evento-detail-icon"
    icon.textContent = detalle.icon

    const text = document.createElement("span")
    text.textContent = detalle.text

    detalleDiv.append(icon, text)
    info.append(detalleDiv)
  })

  
  const stats = document.createElement("div")
  stats.className = "evento-stats"

  const asistentesInfo = document.createElement("div")
  asistentesInfo.className = "asistentes-info"
  const asistentes = Array.isArray(evento.asistentes) ? evento.asistentes.length : 0
  asistentesInfo.innerHTML = `<span>👥</span><span>${asistentes} asistente(s)</span>`

  const actions = document.createElement("div")
  actions.className = "evento-actions"

  const btnEdit = document.createElement("button")
  btnEdit.className = "btn-action btn-edit"
  btnEdit.textContent = "✏️ Editar"
  btnEdit.addEventListener("click", () => editarEvento(evento.id))

  const btnDelete = document.createElement("button")
  btnDelete.className = "btn-action btn-delete"
  btnDelete.textContent = "🗑️ Eliminar"
  btnDelete.addEventListener("click", () => eliminarEvento(evento.id))

  actions.append(btnEdit, btnDelete)
  stats.append(asistentesInfo, actions)

  card.append(titulo, info, stats)
  return card
}

const mostrarEstadoVacio = (container) => {
  const emptyState = document.createElement("div")
  emptyState.className = "empty-state"

  const icon = document.createElement("div")
  icon.className = "empty-state-icon"
  icon.textContent = "🎭"

  const text = document.createElement("p")
  text.textContent = "Aún no has creado ningún evento"

  emptyState.append(icon, text)
  container.append(emptyState)
}

const editarEvento = (eventoId) => {
 
  console.log("Editar evento:", eventoId)
  
}

const eliminarEvento = async (eventoId) => {
  if (confirm("¿Estás seguro de que quieres eliminar este evento?")) {
    try {
      loading(true)
      await fetchData({
        url: `http://localhost:3000/api/v1/eventos/${eventoId}`,
        method: "DELETE",
        token: localStorage.getItem("token"),
      })

      
      CrearEvento()
    } catch (error) {
      console.error("Error al eliminar evento:", error)
      alert("Error al eliminar el evento")
    } finally {
      loading(false)
    }
  }
}
