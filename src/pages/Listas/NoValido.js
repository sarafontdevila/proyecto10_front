/*export const ListaAsistentes = () => {
  const main = document.querySelector('main')
  main.innerHTML = ''

  const asistentesDiv = document.createElement('div')

  Asistentes(asistentesDiv)

  asistentesDiv.id = 'asistentes'

  main.append(asistentesDiv)
}
/*if (esPreferidos && evento.asistentes && evento.asistentes.length > 0) {
      try {
        const listaAsistentes = document.createElement("div")
        listaAsistentes.className = "lista-asistentes"
        
        const tituloAsistentes = document.createElement("h4")
        tituloAsistentes.textContent = "Asistentes:"
        listaAsistentes.appendChild(tituloAsistentes)
        
        const ulAsistentes = document.createElement("ul")
        
        // Obtener la lista de asistentes desde el backend
        const resAsistentes = await fetch(`http://localhost:3000/api/v1/eventos/${evento._id}/asistentes`, {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
          }
        })
        
        if (resAsistentes.ok) {
          const asistentes = await resAsistentes.json()
          
          if (asistentes.length > 0) {
            for (const asistente of asistentes) {
              const liAsistente = document.createElement("li")
              liAsistente.textContent = asistente.nombre || "Usuario"
              ulAsistentes.appendChild(liAsistente)
            }
          } else {
            const noAsistentes = document.createElement("li")
            noAsistentes.textContent = "No hay asistentes registrados"
            ulAsistentes.appendChild(noAsistentes)
          }
        } else {
          const errorMsg = document.createElement("li")
          errorMsg.textContent = "No se pudieron cargar los asistentes"
          ulAsistentes.appendChild(errorMsg)
        }
        
        listaAsistentes.appendChild(ulAsistentes)
        divEvento.appendChild(listaAsistentes)
      } catch (error) {
        console.error("Error al cargar asistentes:", error)
      }
    }*/
