import { mostrarMensaje } from "../Message/Message"

export const manejarAsistencia = async (idEvento) => {
  const user = JSON.parse(localStorage.getItem("user"))
  const token = localStorage.getItem("token")

  if (user.preferidos.includes(idEvento)) {
    mostrarMensaje("Este evento ya está en tus preferidos")
    return
  }

  try {
    const nuevosPreferidos = [...user.preferidos, idEvento]

    await fetch(`https://proyecto10-full-stack-js-gwfa.vercel.app/api/v1/users/${user._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ preferidos: nuevosPreferidos }),
    })

    user.preferidos = nuevosPreferidos
    localStorage.setItem("user", JSON.stringify(user))

    const respuestaAsistencia = await fetch(`https://proyecto10-full-stack-js-gwfa.vercel.app/api/v1/eventos/${idEvento}/asistentes`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ asistente: user._id }),
    })

    if (!respuestaAsistencia.ok) {
      mostrarMensaje("⚠️ No se pudo añadir como asistente")
    }
    mostrarMensaje("✅ Te has registrado como asistente y añadido a preferidos")

  } catch (error) {
    console.error("❌ Error al asistir o añadir preferido:", error)
    mostrarMensaje("Error al registrar asistencia o preferido")
  }
}

export const borrarPreferidoYAsistencia = async (idEvento) => {
  try {
    const user = JSON.parse(localStorage.getItem("user"))
    const token = localStorage.getItem("token")

    if (!user || !token) {
      mostrarMensaje("Debes iniciar sesión")
      return
    }
    const eventoExiste = await verificarExistenciaEvento(idEvento, token)
    
    if (!eventoExiste) {
      console.log(`⚠️ El evento ${idEvento} ya no existe, solo limpiando preferidos locales`)
      const nuevosPreferidos = user.preferidos.filter((id) => id !== idEvento)
      user.preferidos = nuevosPreferidos
      localStorage.setItem("user", JSON.stringify(user))
      mostrarMensaje("❌ Evento eliminado de tus preferidos (evento ya no disponible)")
      return
    }

    const nuevosPreferidos = user.preferidos.filter((id) => id !== idEvento)

    await fetch(`https://proyecto10-full-stack-js-gwfa.vercel.app/api/v1/users/${user._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ preferidos: nuevosPreferidos }),
    })

    await fetch(`https://proyecto10-full-stack-js-gwfa.vercel.app/api/v1/eventos/${idEvento}/asistentes`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ asistente: user._id })
    })

    user.preferidos = nuevosPreferidos
    localStorage.setItem("user", JSON.stringify(user))

    mostrarMensaje("❌ Evento eliminado de tus preferidos y de asistencia")

  } catch (error) {
    console.error("Error al quitar de preferidos y asistencia:", error)
    mostrarMensaje("Error al eliminar evento de tus datos")

    try {
      const user = JSON.parse(localStorage.getItem("user"))
      if (user) {
        const nuevosPreferidos = user.preferidos.filter((id) => id !== idEvento)
        user.preferidos = nuevosPreferidos
        localStorage.setItem("user", JSON.stringify(user))
        mostrarMensaje("❌ Evento eliminado de preferidos (con errores en el servidor)")
      }
    } catch (localError) {
      mostrarMensaje("Error al eliminar evento de tus datos")
    }
  }
  }
  const verificarExistenciaEvento = async (idEvento, token) => {
    try {
      const respuesta = await fetch(`https://proyecto10-full-stack-js-gwfa.vercel.app/api/v1/eventos/${idEvento}`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      })
      return respuesta.ok
    } catch (error) {
      console.error("Error al verificar existencia del evento:", error)
      return false
    }
  }
