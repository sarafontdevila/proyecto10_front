import './CrearEvento.css';
import { Home } from '../Home/Home'; 

export const CrearEvento = () => {
  const main = document.querySelector('main');
  main.innerHTML = '';

  const crearDiv = document.createElement('div');

  Crear(crearDiv);

  crearDiv.id = 'crear';

  main.append(crearDiv);
};

const Crear = (elementoPadre) => {
  const form = document.createElement('form');
  form.addEventListener('submit', handleSubmit); 

  const inputNombre = document.createElement('input');
  const inputDescripcion = document.createElement('input');
  const inputFecha = document.createElement('input');
  const inputPrecio = document.createElement('input');
  const inputLugar = document.createElement('input');
  const inputImagen = document.createElement('input');
  inputImagen.type = 'file'; // ¡Importante!
  inputImagen.accept = 'image/*';
  const button = document.createElement('button');
  button.textContent = 'Crear Evento';

  const statusMessage = document.createElement('p');
  statusMessage.classList.add('status-message');
  statusMessage.style.display = 'none';

  inputNombre.placeholder = 'Nombre del evento';
  inputFecha.placeholder = 'Fecha';
  inputDescripcion.placeholder = 'Descripcion';
  inputLugar.placeholder = 'Lugar';
  inputPrecio.placeholder = 'Precio';
  button.textContent = 'Crear Evento';

  elementoPadre.append(form);
  form.append(inputNombre);
  form.append(inputFecha);
  form.append(inputDescripcion);
  form.append(inputLugar);
  form.append(inputPrecio);
  form.append(inputImagen);
  form.append(button);
  form.append(statusMessage);

  function handleSubmit(event) {
    event.preventDefault(); // Evitar la recarga de la página

    const formData = new FormData();
    formData.append('nombre', inputNombre.value);
    formData.append('descripcion', inputDescripcion.value);
    formData.append('fecha', inputFecha.value);
    formData.append('precio', inputPrecio.value);
    formData.append('lugar', inputLugar.value);
    formData.append('imagen', inputImagen.files[0]); 

    
    fetch('http://localhost:3000/api/v1/eventos', {
      method: 'POST',
      body: formData, 
    })
      .then(response => response.json())
      .then(data => {
        statusMessage.textContent = 'Evento creado con éxito!';
        statusMessage.style.display = 'block';
        form.reset(); 

        setTimeout(() => {
          Home();
          window.location.hash = '#home'; 
        }, 1500);
      })
      .catch(error => {
        statusMessage.textContent = 'Error al crear el evento.';
        statusMessage.style.display = 'block';
        console.error('Error:', error);
      });
  }
};