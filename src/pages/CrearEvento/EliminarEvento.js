import { fetchData } from "../../utils/api"
import { loading } from "../../components/Loading/Loading"
import { MisEventos } from "./MisEventos"

export const eliminarEvento = async (eventoId, elementoPadre) => {
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

      console.log("Evento eliminado correctamente")

      
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
