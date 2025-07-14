import { fetchData } from "../../utils/api"
import { obtenerEventosPreferidos } from "../../utils/eventUtils"
import { borrarPreferidoYAsistencia } from "../../components/Evento/asistirEvento"
import { mostrarConfirmacion, mostrarMensaje } from "../../components/Message/Message"
import "./ListaAsistentes.css"

export const ListaAsistentes = async () => {
  const main = document.querySelector("main")
  main.innerHTML = ""

  const header = document.createElement("div")
  header.className = "lista-header"

  const icon = document.createElement("span")
  icon.className = "user-icon"
  icon.innerHTML = "👤"

  const title = document.createElement("h1")
  title.textContent = "Lista de Asistentes "

  header.append(icon, title)
  main.append(header)

  const user = JSON.parse(localStorage.getItem("user"))
  const token = localStorage.getItem("token")

  let eventosAsistiendo = []

  if (user?.rol === "admin") {
    
    eventosAsistiendo = await fetchData({
      url: "http://localhost:3000/api/v1/eventos",
      method: "GET",
      token,
    })
  } else {
    eventosAsistiendo = await obtenerEventosPreferidos()
  }

  if (eventosAsistiendo.length === 0) {
    mostrarMensaje("No tienes eventos preferidos ")
    return
  }

  const eventosContainer = document.createElement("div")
  eventosContainer.className = "eventos-container"

  pintarEventosConAsistentes(eventosAsistiendo, eventosContainer)

  main.append(eventosContainer)
}

const pintarEventosConAsistentes = (eventos, container) => {
  eventos.forEach((evento) => {
    const eventoCard = document.createElement("div")
    eventoCard.className = "evento-card"

    const nombreEvento = document.createElement("h2")
    nombreEvento.textContent = evento.nombre

    const fechaContainer = document.createElement("div")
    fechaContainer.className = "fecha-container"
    const calendarIcon = document.createElement("span")
    calendarIcon.innerHTML = "📅"
    const fechaEvento = document.createElement("p")
    fechaEvento.textContent = new Date(evento.fecha).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
    fechaContainer.append(calendarIcon, fechaEvento)

    const lugarContainer = document.createElement("div")
    lugarContainer.className = "lugar-container"
    const locationIcon = document.createElement("span")
    locationIcon.innerHTML = "📍"
    const lugarEvento = document.createElement("p")
    lugarEvento.textContent = evento.lugar
    lugarContainer.append(locationIcon, lugarEvento)

    const precioContainer = document.createElement("div")
    precioContainer.className = "precio-container"
    const precioIcon = document.createElement("span")
    precioIcon.innerHTML = "💰"
    const precioEvento = document.createElement("p")
    precioEvento.textContent = evento.precio === 0 ? "Gratis" : `${evento.precio}€`
    precioContainer.append(precioIcon, precioEvento)

    const creadorContainer = document.createElement("div");
    creadorContainer.className = "creador-container";

    const creadorIcon = document.createElement("span"); 
    creadorIcon.className = "creador-icon";
    creadorIcon.innerHTML = "✍️"; 

    const creadorText = document.createElement("p"); 
    creadorText.textContent = `Creado por: ${evento.creadorId?.nombre || "Desconocido"}`;

    creadorContainer.append(creadorIcon, creadorText);

    const asistentesContainer = document.createElement("div")
    asistentesContainer.className = "asistentes-container"

    const asistentesHeader = document.createElement("div")
    asistentesHeader.className = "asistentes-header"
    const userIcon = document.createElement("span")
    userIcon.innerHTML = "👥"
    const asistentesTitle = document.createElement("h3")
    const numAsistentes = evento.asistentes?.length || 0
    asistentesTitle.textContent = `Asistentes (${numAsistentes})`
    asistentesHeader.append(userIcon, asistentesTitle)

    const asistentesLista = document.createElement("div")
    asistentesLista.className = "asistentes-lista"

    if (evento.asistentes && evento.asistentes.length > 0) {
      const nombresAsistentes = evento.asistentes
        .map((asistente) => asistente.nombre || "Usuario sin nombre")
        .join(", ")
      const asistentesTexto = document.createElement("p")
      asistentesTexto.textContent = nombresAsistentes
      asistentesLista.append(asistentesTexto)
    } else {
      const sinAsistentes = document.createElement("p")
      sinAsistentes.className = "sin-asistentes"
      sinAsistentes.textContent = "No hay otros asistentes registrados."
      asistentesLista.append(sinAsistentes)
    }

    asistentesContainer.append(asistentesHeader, asistentesLista)

    const accionesContainer = document.createElement("div")
    accionesContainer.className = "acciones-container"

    const botonSalir = document.createElement("button")
    botonSalir.className = "boton-salir"
    botonSalir.textContent = "❌ Dejar de asistir"
    botonSalir.onclick = async () => {
      const confirmacion = await mostrarConfirmacion(`¿Estás seguro de que quieres dejar de asistir a "${evento.nombre}"?`)
      if (confirmacion) {
        await borrarPreferidoYAsistencia(evento._id, ListaAsistentes)
      }
    }

    accionesContainer.append(botonSalir)

    eventoCard.append(
      nombreEvento,
      fechaContainer,
      lugarContainer,
      precioContainer,
      creadorContainer,
      asistentesContainer,
      accionesContainer,
    )

    container.append(eventoCard)
  })
}
