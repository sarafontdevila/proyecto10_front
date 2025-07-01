import { pintarEventos } from "../Home/Home"
import { fetchData } from "../../utils/api"

export const Preferidos = async () => {
  const main = document.querySelector("main")
  main.innerHTML = ""

  const user = JSON.parse(localStorage.getItem("user"))
  console.log("🔍 DEBUGGING PREFERIDOS:")
  console.log("1. Usuario completo desde localStorage:", user)
  console.log("2. Array de preferidos:", user?.preferidos)
  console.log("3. Longitud del array preferidos:", user?.preferidos?.length)
  const ids = user?.preferidos || []
  console.log("4. IDs a buscar:", ids)

  try {
    const eventos = await fetchData({
      url: "http://localhost:3000/api/v1/eventos",
    })

    console.log("5. Todos los eventos obtenidos:", eventos)
    console.log("6. Cantidad de eventos:", eventos.length)

    const preferidos = eventos.filter(evento => ids.includes(evento._id))

    console.log("7. Eventos preferidos filtrados:", preferidos)
    console.log("8. Cantidad de eventos preferidos:", preferidos.length)

    pintarEventos(preferidos, main, true)
  } catch (error) {
    console.error("Error al obtener eventos preferidos:", error)
    const errorMsg = document.createElement("p")
    errorMsg.textContent = "No se pudieron cargar tus eventos preferidos."
    errorMsg.style.color = "red"
    main.append(errorMsg)
  }
}