import { fetchData } from '../../utils/api'
import { mostrarMensaje } from '../Message/Message'
import { manejarAsistencia, borrarPreferidoYAsistencia } from '../Evento/asistirEvento' 

export const pintarEventos = async (
  eventos,
  elementoPadre,
  esPreferidos = false
) => {
  const divEventos = document.createElement('div')
  divEventos.className = 'eventos'

  if (eventos.length === 0) {
    mostrarMensaje(
      esPreferidos
        ? 'No tienes eventos preferidos.'
        : 'No hay eventos disponibles en este momento.'
    )
    return
  }
  const user = JSON.parse(localStorage.getItem('user'))
  const token = localStorage.getItem('token')

  for (const evento of eventos) {
    const divEvento = document.createElement('div')
    divEvento.className = 'evento'

    const nombre = document.createElement('h3')
    const descripcion = document.createElement('p')
    const fecha = document.createElement('p')
    const precio = document.createElement('p')
    const lugar = document.createElement('p')
    const imagen = document.createElement('img')
    const asistir = document.createElement('button')

    nombre.textContent = evento.nombre || 'Sin nombre'
    descripcion.textContent = evento.descripcion || 'Sin descripción'
    fecha.textContent = evento.fecha || 'Sin fecha'
    precio.textContent = evento.precio ? `${evento.precio}€` : 'Gratis'
    lugar.textContent = evento.lugar || 'Sin lugar'
    imagen.src = evento.imagen || ''
    imagen.alt = evento.nombre || 'Imagen del evento'

    asistir.className = 'button'

    if (esPreferidos) {
      asistir.textContent = 'Cancelar'
      asistir.addEventListener('click', () =>
        borrarPreferidoYAsistencia(evento._id, recargarPreferidos)
      )
    } else {
      if (token && user) {
        asistir.textContent = 'Asistir'
        asistir.addEventListener('click', () =>
          manejarAsistencia(evento._id, asistir, recargarHome)
        )
      } else {
        asistir.textContent = 'Regístrate primero'
        asistir.addEventListener('click', () => irARegistro())
      }
    }

    divEvento.append(imagen, nombre, descripcion, fecha, lugar, precio, asistir)

    divEventos.appendChild(divEvento)
  }

  elementoPadre.appendChild(divEventos)
}
const irARegistro = async () => {
  const { Register } = await import('../../pages/Register/Register')
  Register()
}

const recargarHome = async () => {
  const { Home } = await import('../../pages/Home/Home')
  Home()
}

const recargarPreferidos = async () => {
  const { Preferidos } = await import('../../pages/Favoritos/preferidos')
  Preferidos()
}
