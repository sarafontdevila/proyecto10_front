import './Home.css'
  /*http://localhost:3000/api/v1/eventos */

export const Home = async() => {
  const main = document.querySelector("main")
  main.innerHTML = ""
  const res = await fetch("http://localhost:3000/api/v1/eventos")
  const eventos = await res.json()

  pintarEventos(eventos, main)

  const pintarEventos = (eventos, elementoPadre)

  



}

