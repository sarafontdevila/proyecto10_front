import { fetchData } from './api'

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
    const token = localStorage.getItem("token")

    if (esPreferidos) {
      asistir.textContent = "Borrar"
      asistir.addEventListener("click", () => borrarPreferido(evento._id, recargarPreferidos))
    } else {
      
      asistir.addEventListener("click", () => addPreferido(evento._id, recargarHome))
    }

    
    divEvento.append(imagen, nombre, descripcion, fecha, lugar, precio, asistentes, asistir)
    divEventos.append(divEvento)
  }

  elementoPadre.append(divEventos)
}


const addPreferido = async (idEvento, callbackRecarga) => {
  
  callbackRecarga() 
}

const borrarPreferido = async (idEvento, callbackRecarga) => {
  
  callbackRecarga() 
}

const recargarHome = async () => {
  const { Home } = await import('../pages/Home/Home')
  Home()
}

const recargarPreferidos = async () => {
  const { Preferidos } = await import('../pages/Preferidos/Preferidos')
  Preferidos()
}