import './Home.css'
  /*http://localhost:3000/api/v1/eventos */

export const Home = async() => {
  const main = document.querySelector("main")
  main.innerHTML = ""
  const res = await fetch("http://localhost:3000/api/v1/eventos")
  const eventos = await res.json()

  pintarEventos(eventos, main)

  const pintarEventos = (eventos, elementoPadre) => {
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

      titulo.textContent = evento.nombre
      imagen.src = evento.imagen
      descripcion.textContent = evento.descripcion
      fecha.textContent = evento.fecha
      precio.textContent = "${evento.precio}€"
      lugar.textContent = evento.lugar

      divEvento.append(titulo, descripcion, fecha, precio, lugar, imagen)
      divEventos.append(divEvento)
      elementoPadre.append(divEvento)
      console.log(evento)
    }
  }

  
}

