import { obtenerEventosPreferidos } from "../../utils/eventUtils"
import { pintarEventos } from "../../components/PintarEventos/pintarEventos"
import { mostrarMensaje } from "../../components/Message/Message"
import "../../components/Message/Message.css"

export const Preferidos = async () => {
  const main = document.querySelector("main")
  main.innerHTML = ""

  const eventosPreferidos = await obtenerEventosPreferidos()

  if (eventosPreferidos.length === 0) {
    mostrarMensaje("No tienes eventos preferidos.")
    return
  }

  pintarEventos(eventosPreferidos, main, true)
}
