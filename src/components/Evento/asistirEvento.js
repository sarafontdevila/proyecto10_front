import { mostrarMensaje } from '../Message/Message'

export const manejarAsistencia = async (idEvento, boton, callbackRecarga) => {
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

  try {
   
    const nuevosPreferidos = [...user.preferidos, idEvento]

    await fetch(`http://localhost:3000/api/v1/users/${user._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ preferidos: nuevosPreferidos })
    })

    user.preferidos = nuevosPreferidos
    localStorage.setItem('user', JSON.stringify(user))

    const respuestaAsistencia = await fetch(
      `http://localhost:3000/api/v1/eventos/${idEvento}/asistentes`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ asistente: user._id })
      }
    )

    if (!respuestaAsistencia.ok) {
      mostrarMensaje('⚠️ No se pudo añadir como asistente')
    }

    mostrarMensaje('✅ Te has registrado como asistente y añadido a preferidos')
    if (boton) {
      boton.disabled = true
      boton.textContent = 'Ya estás registrado'
    }

    callbackRecarga()
  } catch (error) {
    console.error('❌ Error al asistir o añadir preferido:', error)
    mostrarMensaje('Error al registrar asistencia o preferido')
  }
}


export const borrarPreferidoYAsistencia = async (idEvento, callbackRecarga) => {
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
      body: JSON.stringify({ preferidos: nuevosPreferidos })
    })

    
    await fetch(`http://localhost:3000/api/v1/eventos/${idEvento}/asistentes`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ asistente: user._id })
    })

    user.preferidos = nuevosPreferidos
    localStorage.setItem('user', JSON.stringify(user))

    if (nuevosPreferidos.length === 0) {
      callbackRecarga()
      return
    }

    mostrarMensaje('❌ Evento eliminado de tus preferidos y de asistencia')
    callbackRecarga()
  } catch (error) {
    console.error('Error al quitar de preferidos y asistencia:', error)
    mostrarMensaje('Error al eliminar evento de tus datos')
  }
}

