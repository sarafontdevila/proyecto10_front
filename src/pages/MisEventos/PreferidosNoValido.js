/*import { pintarEventos } from "../Home/Home"
import { Home } from "../Home/Home"
import "./Preferidos.css"

export const Preferidos = async() => {
  const main = document.querySelector("main")
  main.innerHTML = ""

  const user = JSON.parse(localStorage.getItem("user"))
  const ids = user?.preferidos || []

  const res = await fetch(`http://localhost:3000/api/v1/eventos`)
  const eventos = await res.json()

  const preferidos = eventos.filter(evento => ids.includes(evento._id))

  pintarEventos(preferidos, main, true)
}*/

  
      
  
      
  
