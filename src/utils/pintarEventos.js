import { Home } from '../pages/Home/Home'
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
    const asistir = document.createElement("button")

    divEvento.className = "evento"
    
    
    nombre.textContent = evento.nombre || "Sin nombre"
    descripcion.textContent = evento.descripcion || "Sin descripción"
    fecha.textContent = evento.fecha || "Sin fecha"
    precio.textContent = evento.precio ? `${evento.precio}€` : "Gratis"
    lugar.textContent = evento.lugar || "Sin lugar"
    imagen.src = evento.imagen || ""
    imagen.alt = evento.nombre || "Imagen del evento"
    
    
    asistir.className = "button"
    const user = JSON.parse(localStorage.getItem("user"))
    const token = localStorage.getItem("token")

    if (esPreferidos) {
      asistir.textContent = "Borrar"
      asistir.addEventListener("click", () => borrarPreferido(evento._id, recargarPreferidos))
    } else {
      
      asistir.addEventListener("click", () => addPreferido(evento._id, recargarHome))
    }

    
    divEvento.append(imagen, nombre, descripcion, fecha, lugar, precio,  asistir)
    divEventos.append(divEvento)
  }

  elementoPadre.append(divEventos)
}


const addPreferido = async (idEvento, callbackRecarga) => {
  await fetchData({
  url: `http://localhost:3000/api/v1/usuarios/preferidos/${idEvento}`,
  method: 'POST',
  headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
     })
  callbackRecarga() 
}

const borrarPreferido = async (idEvento, callbackRecarga) => {
  await fetchData({
    url: `http://localhost:3000/api/v1/usuarios/preferidos/${idEvento}`,
    method: 'DELETE',
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
  
  callbackRecarga() 
}

const recargarHome = async () => {
  const { Home } = await import('../pages/Home/Home')
  Home()
}

const recargarPreferidos = async () => {
  const { Preferidos } = await import('../pages/MisEventos/Preferidos')
  Preferidos()
}