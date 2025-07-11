import { fetchData } from "./api"
import { mostrarMensaje } from "../components/Message/Message"

export const obtenerEventosPreferidos = async () => {
  const user = JSON.parse(localStorage.getItem("user"))
  const token = localStorage.getItem("token")

  if (!user || !token || !user.preferidos || user.preferidos.length === 0) {
    return []
  }

  try {
    const todosLosEventos = await fetchData({
      url: "http://localhost:3000/api/v1/eventos",
      method: "GET",
      token,
    })

    return todosLosEventos.filter((evento) => user.preferidos.includes(evento._id))
  } catch (error) {
    console.error("❌ Error al obtener eventos:", error)
    mostrarMensaje("Error al cargar eventos.")
    return []
  }
}
