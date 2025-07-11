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
export function mostrarConfirmacion(mensaje) {
  return new Promise((resolve) => {
    const modalFondo = document.createElement('div');
    modalFondo.className = 'modal-fondo';

    const modalMensaje = document.createElement('div');
    modalMensaje.className = 'modal-mensaje';

    const mensajeTexto = document.createElement('p');
    mensajeTexto.textContent = mensaje;
    modalMensaje.appendChild(mensajeTexto);

    const contenedorBotones = document.createElement('div');
    contenedorBotones.className = 'contenedor-botones';

    const botonAceptar = document.createElement('button');
    botonAceptar.textContent = 'Aceptar';
    botonAceptar.className = 'boton-confirmacion';
    botonAceptar.onclick = () => {
      modalFondo.remove();
      resolve(true); 
    };
    contenedorBotones.appendChild(botonAceptar);

    const botonCancelar = document.createElement('button');
    botonCancelar.textContent = 'Cancelar';
    botonCancelar.className = 'boton-confirmacion cancelar';
    botonCancelar.onclick = () => {
      modalFondo.remove();
      resolve(false); 
    };
    contenedorBotones.appendChild(botonCancelar);

    modalMensaje.appendChild(contenedorBotones);
    modalFondo.appendChild(modalMensaje);

    document.body.appendChild(modalFondo);
  });
}