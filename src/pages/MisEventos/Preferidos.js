import { pintarEventos } from "../Home/Home"
import { fetchData } from "../../utils/api"

export const Preferidos = async () => {
  const main = document.querySelector("main")
  main.innerHTML = ""

  const user = JSON.parse(localStorage.getItem("user"))
  const ids = user?.preferidos || []

  try {
    const eventos = await fetchData({
      url: "http://localhost:3000/api/v1/eventos",
    })

    const preferidos = eventos.filter(evento => ids.includes(evento._id))

    pintarEventos(preferidos, main, true)
  } catch (error) {
    console.error("Error al obtener eventos preferidos:", error)
    const errorMsg = document.createElement("p")
    errorMsg.textContent = "No se pudieron cargar tus eventos preferidos."
    errorMsg.style.color = "red"
    main.append(errorMsg)
  }
}