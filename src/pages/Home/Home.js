import './Home.css'
  /*http://localhost:3000/api/v1/eventos */

export const Home = async() => {
  const main = document.querySelector("main")
  main.innerHTML = ""
  const res = await fetch("http://localhost:3000/api/v1/eventos")
  const eventos = await res.json()

  pintarEventos(eventos, main)
}

  export const pintarEventos = (eventos, elementoPadre) => {
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
      asistir.className = "btn-quieroir";

      asistir.addEventListener("click", () => addPreferido(evento._id))

      const user = JSON.parse(localStorage.getItem("user"))

      if(user?.preferidos?.includes(evento._id)){
        asistir.textContent = 'Ya voy'
      }else {
        asistir.textContent = 'Quiero ir'}


      divEvento.className = "evento"
      nombre.textContent = evento.nombre
      imagen.src = evento.imagen
      descripcion.textContent = evento.descripcion
      fecha.textContent = evento.fecha
      precio.textContent = '${evento.precio}€'
      lugar.textContent = evento.lugar
      asistentes.textContent = 'Asistentes: ${evento.asistentes}'
      asistir.textContent = 'Quiero ir'
    

      divEvento.append(imagen, nombre, descripcion, fecha,lugar, precio,asistentes, asistir)
      divEventos.append(divEvento)

      elementoPadre.append(divEventos)
    }}

    const addPreferido = async (idEvento) => {

      const user = JSON.parse(localStorage.getItem("user"))

      user.preferidos = [...user.preferidos, idEvento]

      const objetoFinal = JSON.stringify({
        preferidos: [idEvento]
      })

      const opciones = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: objetoFinal
      }
      const res = await fetch(`http://localhost:3000/api/v1/users/${user._id}`, 
        opciones)
    
    const respuesta = await res.json()

    localStorage.setItem("user", JSON.stringify(user))
    Home()
  }
  
  


