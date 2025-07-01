import { pintarEventos } from '../../components/PintarEventos/pintarEventos'
import { fetchData } from '../../utils/api'

export const Preferidos = async () => {
  const main = document.querySelector('main')
  main.innerHTML = ''

  try {
    const preferidos = await fetchData({
      url: 'http://localhost:3000/api/v1/eventos/mis-eventos',
      method: 'GET',
      token: localStorage.getItem('token')
    })

    if (preferidos && preferidos.length > 0) {
      pintarEventos(preferidos, main, true)
    } else {
      const noEventosMsg = document.createElement('p')
      noEventosMsg.textContent = 'No tienes eventos preferidos aún.'
      main.append(noEventosMsg)
    }
  } catch (error) {
    console.error('Error al obtener eventos preferidos:', error)

    // Fallback: usar el método original si el endpoint no existe
    const user = JSON.parse(localStorage.getItem('user'))
    const ids = user?.preferidos || []

    if (ids.length === 0) {
      const noEventosMsg = document.createElement('p')
      noEventosMsg.textContent = 'No tienes eventos preferidos aún.'
      main.append(noEventosMsg)
      return
    }

    try {
      const eventos = await fetchData({
        url: 'http://localhost:3000/api/v1/eventos'
      })

      const preferidos = eventos.filter((evento) => ids.includes(evento._id))

      if (preferidos.length > 0) {
        pintarEventos(preferidos, main, true)
      } else {
        const noEventosMsg = document.createElement('p')
        noEventosMsg.textContent = 'No se encontraron tus eventos preferidos.'
        main.append(noEventosMsg)
      }
    } catch (fallbackError) {
      console.error('Error en fallback:', fallbackError)
      const errorMsg = document.createElement('p')
      errorMsg.textContent = 'No se pudieron cargar tus eventos preferidos.'
      main.append(errorMsg)
    }
  }
}
