import "./CrearEvento.css"
import { fetchData } from "../../utils/api"
import { loading } from "../../components/Loading/Loading"


export const MisEventos = async (elementoPadre) => {
 
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
  btnDelete.addEventListener("click", () => eliminarEvento(evento.id, elementoPadre))

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

const eliminarEvento = async (eventoId, elementoPadre) => {
  if (!eventoId) {
    console.error("ID de evento no válido:", eventoId)
    return
  }
  if (confirm("¿Estás seguro de que quieres eliminar este evento?")) {
    try {
      loading(true)
      await fetchData({
        url: `http://localhost:3000/api/v1/eventos/${eventoId}`,
        method: "DELETE",
        token: localStorage.getItem("token"),
        
      })
      console.log("Evento eliminado:", res)

      elementoPadre.innerHTML = ""
      await MisEventos(elementoPadre)
    } catch (error) {
      console.error("Error al eliminar evento:", error)
      alert("Error al eliminar el evento")
    } finally {
      loading(false)
    }
  }
}
