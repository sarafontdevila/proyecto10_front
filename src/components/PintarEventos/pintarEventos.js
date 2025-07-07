import { fetchData } from '../../utils/api'
import { mostrarMensaje } from '../Message/Message'

export const pintarEventos = async (
  eventos,
  elementoPadre,
  esPreferidos = false
) => {
  const divEventos = document.createElement('div')
  divEventos.className = 'eventos'

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
        borrarPreferido(evento._id, recargarPreferidos)
      )
    } else {
      if (token && user) {
        asistir.textContent = 'Asistir'
        asistir.addEventListener('click', () =>
          addPreferido(evento._id, recargarHome)
        )
      } else {
        asistir.textContent = 'Regístrate primero'
        asistir.addEventListener('click', () => irARegistro())
      }
    }

    divEvento.append(imagen, nombre, descripcion, fecha, lugar, precio, asistir)

    if (user && evento.creadorId === user._id) {
      const eliminarBtn = document.createElement('button')
      eliminarBtn.className = 'button'
      eliminarBtn.textContent = 'Eliminar'
      eliminarBtn.addEventListener('click', async () => {
        const confirmado = confirm(
          '¿Estás seguro de que deseas eliminar este evento?'
        )
        if (confirmado) {
          try {
            await eliminarEvento(evento._id)
            mostrarMensaje('Evento eliminado correctamente.')
            if (esPreferidos) {
              recargarPreferidos()
            } else {
              recargarHome()
            }
          } catch (error) {
            console.error('Error al eliminar evento:', error)
            mostrarMensaje('Error al eliminar el evento. Inténtalo de nuevo.')
          }
        }
      })
      divEvento.appendChild(eliminarBtn)
    }
    divEventos.appendChild(divEvento)
  }

  elementoPadre.appendChild(divEventos)
}

const asistirAEvento = async (eventoId, userId, token, boton) => {
  try {
    const response = await fetch(
      `http://localhost:3000/api/v1/eventos/${eventoId}/asistentes`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ asistente: user_Id })
      }
    )

    if (response.ok) {
      mostrarMensaje('✅ Te has registrado como asistente')
      boton.disabled = true
      boton.textContent = 'Ya estás registrado'
    } else {
      mostrarMensaje('⚠️ Error al registrarte como asistente')
    }
  } catch (error) {
    console.error('❌ Error al asistir:', error)
    mostrarMensaje('Error al intentar asistir al evento')
  }
}
const eliminarEvento = async (idEvento) => {
  try {
    await fetchData({
      url: `http://localhost:3000/api/v1/eventos/${idEvento}`,
      method: 'DELETE',
      token: localStorage.getItem('token')
    })
  } catch (error) {
    console.error('Error eliminando evento:', error)
    throw error
  }
}
const addPreferido = async (idEvento, callbackRecarga) => {
  try {
    const user = JSON.parse(localStorage.getItem('user'))
    const token = localStorage.getItem('token')

    if (!user || !token) {
      mostrarMensaje('Debes iniciar sesión')
      return
    }

    if (user.preferidos.includes(idEvento)) {
      mostrarMensaje('Este evento ya está en tus preferidos')
      return
    }

    const nuevosPreferidos = [...user.preferidos, idEvento]

    await fetch(`http://localhost:3000/api/v1/users/${user._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        preferidos: nuevosPreferidos
      })
    })

    user.preferidos = nuevosPreferidos
    localStorage.setItem('user', JSON.stringify(user))

    mostrarMensaje('Evento añadido a tus preferidos')
    callbackRecarga()
  } catch (error) {
    console.error('Error agregando preferido:', error)
    mostrarMensaje('Error al agregar a preferidos')
  }
}

const borrarPreferido = async (idEvento, callbackRecarga) => {
  try {
    const user = JSON.parse(localStorage.getItem('user'))
    const token = localStorage.getItem('token')

    if (!user || !token) {
      mostrarMensaje('Debes iniciar sesión')
      return
    }

    const nuevosPreferidos = user.preferidos.filter((id) => id !== idEvento)

    await fetch(`http://localhost:3000/api/v1/users/${user._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        preferidos: nuevosPreferidos
      })
    })

    user.preferidos = nuevosPreferidos
    localStorage.setItem('user', JSON.stringify(user))

    mostrarMensaje('Evento eliminado de tus preferidos')
    callbackRecarga()
  } catch (error) {
    console.error('Error borrando preferido:', error)
    mostrarMensaje('Error al quitar de preferidos')
  }
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
