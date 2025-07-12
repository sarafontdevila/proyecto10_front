import "./CrearEvento.css"
import { fetchData } from "../../utils/api"
import { editarEvento } from "./EditarEvento"
import { eliminarEvento } from "./EliminarEvento"

export const MisEventos = async (elementoPadre, modoAdmin = false) => {
  const header = document.createElement("div")
  header.className = "mis-eventos-header"

  const titulo = document.createElement("h2")
  titulo.textContent = "🎭 Eventos Creados"

  const eventosCount = document.createElement("div")
  eventosCount.className = "eventos-count"
  eventosCount.textContent = "0 eventos"

  header.append(titulo, eventosCount)

  const eventosGrid = document.createElement("div")
  eventosGrid.className = "eventos-grid"

  elementoPadre.innerHTML = ""
  elementoPadre.append(header, eventosGrid)

  try {

    
    const response = await fetchData({
      url:"http://localhost:3000/api/v1/eventos/eventos-creados",
      method: "GET",
      token: localStorage.getItem("token"),
    })

    console.log("Respuesta del servidor:", response) 

    if (response && response.length > 0) {
      eventosCount.textContent = `${response.length} evento${response.length !== 1 ? "s" : ""}`
      response.forEach((evento, index) => {
        console.log(`Evento ${index}:`, evento) 
        console.log(`_id del evento ${index}:`, evento._id) 
        console.log(`id del evento ${index}:`, evento.id) 
        const eventoCard = crearEventoCard(evento, elementoPadre)
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

const crearEventoCard = (evento, elementoPadre) => {
  
  const eventoId = evento._id || evento.id

  console.log("ID del evento:", eventoId) 
  console.log("Evento completo:", evento) 

  if (!eventoId) {
    console.error("⚠️ EVENTO SIN ID VÁLIDO:", evento)
    console.error("Propiedades disponibles:", Object.keys(evento))
  }

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

  const actions = document.createElement("div")
  actions.className = "evento-actions"

  const btnEdit = document.createElement("button")
  btnEdit.className = "btn-action btn-edit"
  btnEdit.textContent = "✏️ Editar"
  btnEdit.addEventListener("click", () => {
    console.log("🔧 Editando evento con ID:", eventoId) 
    if (!eventoId) {
      alert("Error: No se puede editar este evento porque no tiene un ID válido")
      return
    }
    editarEvento(eventoId)
  })

  const btnDelete = document.createElement("button")
  btnDelete.className = "btn-action btn-delete"
  btnDelete.textContent = "🗑️ Eliminar"
  btnDelete.addEventListener("click", () => {
    console.log("🗑️ Eliminando evento con ID:", eventoId) 
    if (!eventoId) {
      alert("Error: No se puede eliminar este evento porque no tiene un ID válido")
      return
    }
    eliminarEvento(eventoId, elementoPadre)
  })

  actions.append(btnEdit, btnDelete)
  stats.append(actions)
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
