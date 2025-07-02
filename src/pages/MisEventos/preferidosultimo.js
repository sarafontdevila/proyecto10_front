import { fetchData } from '../../utils/api'
import { pintarEventos } from '../../components/PintarEventos/pintarEventos'

/*export const Preferidos = async () => {
  const main = document.querySelector('main')
  main.innerHTML = ''

  try {
    const preferidos = await fetchData({
      url: `http://localhost:3000/api/v1/users/${userId}`,
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
}*/

/*export const Preferidos = async () => {
  const main = document.querySelector('main')
  main.innerHTML = ''

  const user = JSON.parse(localStorage.getItem('user'))
  const token = localStorage.getItem('token')

  if (!user || !token) {
    const msg = document.createElement('p')
    msg.textContent = 'Debes iniciar sesión para ver tus eventos preferidos.'
    main.appendChild(msg)
    return
  }

  try {
    const userData = await fetchData({
      url: `http://localhost:3000/api/v1/users/${user._id}`,
      method: 'GET',
      token
    })

    const preferidos = userData.preferidos || []

    if (preferidos.length > 0) {
      pintarEventos(preferidos, main, true)
    } else {
      const noEventosMsg = document.createElement('p')
      noEventosMsg.textContent = 'No tienes eventos preferidos aún.'
      main.append(noEventosMsg)
    }
  } catch (error) {
    console.error('Error al obtener eventos preferidos:', error)
    const errorMsg = document.createElement('p')
    errorMsg.textContent = 'Error al cargar tus eventos preferidos.'
    main.append(errorMsg)
  }
}*/


export const Preferidos = async () => {
  const main = document.querySelector('main')
  main.innerHTML = ''

  const user = JSON.parse(localStorage.getItem('user'))
  const token = localStorage.getItem('token')

  console.log('🧾 Usuario desde localStorage:', user)
  console.log('🔐 Token desde localStorage:', token)

  if (!user || !token) {
    const msg = document.createElement('p')
    msg.textContent = 'Debes iniciar sesión para ver tus eventos preferidos.'
    main.appendChild(msg)
    return
  }
  const user_id = user._id
  console.log('📌 ID del usuario:', user_id)

  try {
   
    const userData = await fetchData({
      url: `http://localhost:3000/api/v1/users/${user._id}`,
      method: 'GET',
      token
    })
    console.log('📦 Datos del usuario desde API:', userData)

    const idsPreferidos = userData.preferidos || []
    console.log('🎯 IDs de eventos preferidos:', idsPreferidos)

    if (idsPreferidos.length === 0) {
      const noEventosMsg = document.createElement('p')
      noEventosMsg.textContent = 'No tienes eventos preferidos aún.'
      main.append(noEventosMsg)
      return
    }

    
    const todosLosEventos = await fetchData({
      url: 'http://localhost:3000/api/v1/eventos',
      method: 'GET'
    })
    console.log('📚 Lista completa de eventos:', todosLosEventos)

   
    const eventosPreferidos = todosLosEventos.filter(evento => 
      idsPreferidos.includes(evento._id)
    )
    console.log('💖 Eventos preferidos encontrados:', eventosPreferidos)

    if (eventosPreferidos.length > 0) {
     
      pintarEventos(eventosPreferidos, main, true)
    } else {
      const noEventosMsg = document.createElement('p')
      noEventosMsg.textContent = 'No se encontraron tus eventos preferidos.'
      main.append(noEventosMsg)
    }

  } catch (error) {
    console.error('Error al obtener eventos preferidos:', error)
    
    
    try {
      const idsPreferidos = user.preferidos || []
      
      if (idsPreferidos.length === 0) {
        const noEventosMsg = document.createElement('p')
        noEventosMsg.textContent = 'No tienes eventos preferidos aún.'
        main.append(noEventosMsg)
        return
      }

      const todosLosEventos = await fetchData({
        url: 'http://localhost:3000/api/v1/eventos',
        method: 'GET'
      })

      const eventosPreferidos = todosLosEventos.filter(evento => 
        idsPreferidos.includes(evento._id)
      )

      if (eventosPreferidos.length > 0) {
        pintarEventos(eventosPreferidos, main, true)
      } else {
        const noEventosMsg = document.createElement('p')
        noEventosMsg.textContent = 'No se encontraron tus eventos preferidos.'
        main.append(noEventosMsg)
      }
    } catch (fallbackError) {
      console.error('Error en fallback:', fallbackError)
      const errorMsg = document.createElement('p')
      errorMsg.textContent = 'Error al cargar tus eventos preferidos.'
      main.append(errorMsg)
    }
  }
}
