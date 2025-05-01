import './ListaAsistentes.css'
import { fetchData } from '../../utils/api'

export const ListaAsistentes = async () => {
  const main = document.querySelector("main")
  main.innerHTML = ""

  const token = localStorage.getItem("token")

  if (!token) {
    main.innerHTML = "<p>Debes iniciar sesión para ver las listas de asistentes</p>"
    return
  }

  const header = document.createElement("div")
  header.className = "lista-header"

  const icon = document.createElement("span")
  icon.className = "user-icon"
  icon.innerHTML = "👤"

  const title = document.createElement("h1")
  title.textContent = "Lista Asistentes"

  header.append(icon, title)
  main.append(header)

  try {
    const eventos = await fetchData({
      url: `http://localhost:3000/api/v1/eventos`,
      method: 'GET',
      token
    })

    const eventosConAsistentes = eventos.filter(evento => evento.asistentes && evento.asistentes.length > 0)

    if (eventosConAsistentes.length === 0) {
      const noEvents = document.createElement("p")
      noEvents.className = "no-events"
      noEvents.textContent = "No hay eventos con asistentes registrados"
      main.append(noEvents)
      return
    }

    const eventosContainer = document.createElement("div")
    eventosContainer.className = "eventos-container"

    for (const evento of eventosConAsistentes) {
      let asistentesData = []

      try {
        asistentesData = await fetchData({
          url: `http://localhost:3000/api/v1/eventos/${evento._id}/asistentes`,
          method: 'GET',
          token
        })
      } catch (e) {
        continue 
      }

      const eventoCard = document.createElement("div")
      eventoCard.className = "evento-card"

      const nombreEvento = document.createElement("h2")
      nombreEvento.textContent = evento.nombre

      const fechaContainer = document.createElement("div")
      fechaContainer.className = "fecha-container"

      const calendarIcon = document.createElement("span")
      calendarIcon.className = "calendar-icon"
      calendarIcon.innerHTML = "📅"

      const fechaEvento = document.createElement("p")
      fechaEvento.textContent = new Date(evento.fecha).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })

      fechaContainer.append(calendarIcon, fechaEvento)

      const lugarEvento = document.createElement("p")
      lugarEvento.textContent = evento.lugar

      const asistentesContainer = document.createElement("div")
      asistentesContainer.className = "asistentes-container"

      const asistentesHeader = document.createElement("div")
      asistentesHeader.className = "asistentes-header"

      const userIcon = document.createElement("span")
      userIcon.className = "user-icon"
      userIcon.innerHTML = "👤"

      const asistentesTitle = document.createElement("h3")
      asistentesTitle.textContent = `Asistentes(${asistentesData.length})`

      asistentesHeader.append(userIcon, asistentesTitle)

      const asistentesLista = document.createElement("p")
      asistentesLista.className = "asistentes-lista"

      const nombresAsistentes = asistentesData.map(asistente =>
        `${asistente.nombre || ''}`
      ).join(", ")

      asistentesLista.textContent = nombresAsistentes || "No hay información de asistentes"

      asistentesContainer.append(asistentesHeader, asistentesLista)
      eventoCard.append(nombreEvento, fechaContainer, lugarEvento, asistentesContainer)
      eventosContainer.append(eventoCard)
    }

    main.append(eventosContainer)

  } catch (error) {
    console.error("Error:", error)
    const errorMsg = document.createElement("p")
    errorMsg.className = "error"
    errorMsg.textContent = "Error al cargar las listas de asistentes"
    main.append(errorMsg)
  }
}