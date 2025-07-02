import './Message.css'
export function mostrarMensaje(mensaje) {
  const modalFondo = document.createElement('div')
  modalFondo.className = 'modal-fondo'

  const modalMensaje = document.createElement('div')
  modalMensaje.className = 'modal-mensaje'
  modalMensaje.textContent = mensaje

  modalFondo.appendChild(modalMensaje)

  modalFondo.addEventListener('click', () => {
    modalFondo.remove()
  })

  document.body.appendChild(modalFondo)
}
