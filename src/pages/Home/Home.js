import './Home.css'
import { CrearEvento } from '../CrearEvento/CrearEvento'
import { BotonesAsistir } from '../../components/BotonAsistir/BotonAsistir'
import { Preferidos } from '../MisEventos/preferidos'
import { fetchData } from '../../utils/api'

export const Home = async () => {
  const main = document.querySelector("main")
  main.innerHTML = ""

  const eventos = await fetchData({
    url: 'http://localhost:3000/api/v1/eventos'
  })

  pintarEventos(eventos, main)
}

export const pintarEventos = async (eventos, elementoPadre, esPreferidos = false) => {
  const divEventos = document.createElement("div")
  divEventos.className = "eventos"

  for (const evento of eventos) {
    const divEvento = document.createElement("div")
    const nombre = document.createElement("h3")
    const descripcion = document.createElement("p")
    const fecha = document.createElement("p")
    const precio = document.createElement("p")
    const lugar = document.createElement("p")
    const imagen = document.createElement("img")
    const asistentes = document.createElement("p")
    const asistir = document.createElement("button")

    asistir.className = "button"
    const user = JSON.parse(localStorage.getItem("user"))

    if (esPreferidos) {
      asistir.textContent = "Borrar"
      asistir.addEventListener("click", () => borrarPreferido(evento._id))
    } else {
      if (user?.preferidos?.includes(evento._id)) {
        asistir.textContent = "Confirmado"
      } else {
        asistir.textContent = "Asistir"
      }
      asistir.addEventListener("click", () => addPreferido(evento._id, elementoPadre))
    }

    divEvento.className = "evento"
    nombre.textContent = evento.nombre
    imagen.src = evento.imagen
    descripcion.textContent = evento.descripcion
    fecha.textContent = new Date(evento.fecha).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
    precio.textContent = `${evento.precio}€`
    lugar.textContent = evento.lugar
    asistentes.textContent = `Asistentes: ${evento.asistentes.length || 0}`

    divEvento.append(imagen, nombre, descripcion, fecha, lugar, precio, asistentes, asistir)
    divEventos.append(divEvento)
  }

  elementoPadre.append(divEventos)
}

const addPreferido = async (idEvento, main) => {
  const token = localStorage.getItem("token")
  if (!token) {
    main.innerHTML = "<p>Debes iniciar sesión para ver los eventos</p>"
    return
  }

  const user = JSON.parse(localStorage.getItem("user"))
  if (user && !user.preferidos.includes(idEvento)) {
    user.preferidos = [...user.preferidos, idEvento]

    await fetchData({
      url: `http://localhost:3000/api/v1/users/${user._id}`,
      method: "PUT",
      body: { preferidos: user.preferidos },
      token
    })

    await fetchData({
      url: `http://localhost:3000/api/v1/eventos/${idEvento}/asistentes`,
      method: "PUT",
      body: { asistente: user._id },
      token
    })

    localStorage.setItem("user", JSON.stringify(user))
    Home()
  }
}

const borrarPreferido = async (idEvento) => {
  const token = localStorage.getItem("token")
  const user = JSON.parse(localStorage.getItem("user"))

  if (user && user.preferidos.includes(idEvento)) {
    user.preferidos = user.preferidos.filter(id => id !== idEvento)

    await fetchData({
      url: `http://localhost:3000/api/v1/users/${user._id}`,
      method: "PUT",
      body: { preferidos: user.preferidos },
      token
    })

    await fetchData({
      url: `http://localhost:3000/api/v1/eventos/${idEvento}/asistentes/${user._id}`,
      method: "DELETE",
      token
    })

    localStorage.setItem("user", JSON.stringify(user))

    const main = document.querySelector("main")
    main.innerHTML = ""
    Home()
  }
}