import { fetchData } from "../../utils/api"
import { loading } from "../../components/Loading/Loading"
import { MisEventos } from "./MisEventos"
import { mostrarConfirmacion } from "../../components/Message/Message"

export const eliminarEvento = async (eventoId, elementoPadre) => {
  if (!eventoId) {
    console.error("ID de evento no válido:", eventoId)
    return
  }

  const confirmacion = await mostrarConfirmacion("¿Estas seguro de que quieres eliminar este evento?")
  if (confirmacion) {
   
    try {
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
  }else { 
    console.log("Evento no eliminado")
  }
}
