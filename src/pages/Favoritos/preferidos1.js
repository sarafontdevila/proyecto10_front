import { fetchData } from '../../utils/api'
import { pintarEventos } from '../../components/PintarEventos/pintarEventos'
import { mostrarMensaje } from '../../components/Message/Message'
import '../../components/Message/Message.css'

export const Preferidos = async () => {
  const main = document.querySelector('main')
  main.innerHTML = ''

  const user = JSON.parse(localStorage.getItem('user'))
  const token = localStorage.getItem('token')

  if (!user || !token || !user.preferidos || user.preferidos.length === 0) {
    mostrarMensaje('No tienes eventos preferidos.')
    return
  }

  try {
    const todosLosEventos = await fetchData({
      url: 'http://localhost:3000/api/v1/eventos',
      method: 'GET'
    })

    const eventosPreferidos = todosLosEventos.filter(evento =>
      user.preferidos.includes(evento._id)
    )

    pintarEventos(eventosPreferidos, main, true)
  } catch (error) {
    console.error('❌ Error al obtener eventos:', error)
    mostrarMensaje('Error al cargar tus eventos preferidos.')
  }
}


