import '../../components/Form/Form.css';
import { Home } from '../Home/Home';
import { pintarEventos } from "../Home/Home" 


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
  inputNombre.placeholder = 'Nombre del evento';
  const inputDescripcion = document.createElement('input');
  inputDescripcion.placeholder = 'Descripcion';
  const inputFecha = document.createElement('input');
  inputFecha.placeholder = 'Fecha';
  const inputPrecio = document.createElement('input');
  inputPrecio.placeholder = 'Precio';
  const inputLugar = document.createElement('input');
  inputLugar.placeholder = 'Lugar';

  const inputImagen = document.createElement('input');
  inputImagen.type = 'file'; 
  inputImagen.className = 'file';
  inputImagen.accept = 'image/*';

  const button = document.createElement('button');
  button.className = 'button';
  button.textContent = 'Crear Evento';
  button.type = 'submit';
  
  const statusMessage = document.createElement('p');
  statusMessage.classList.add('status-message');
  statusMessage.style.display = 'none';
  

  form.append(inputNombre);
  form.append(inputFecha);
  form.append(inputDescripcion);
  form.append(inputLugar);
  form.append(inputPrecio);
  form.append(inputImagen);
  form.append(button);
  form.append(statusMessage);

  elementoPadre.append(form);

  function handleSubmit(event) {
    event.preventDefault(); 

    if (!inputNombre.value || !inputFecha.value || !inputDescripcion.value || 
      !inputLugar.value || !inputPrecio.value || !inputImagen.files[0]) {
    statusMessage.textContent = 'Por favor complete todos los campos';
    statusMessage.style.display = 'block';
    return;
  }
    
    const formData = new FormData();
    formData.append('nombre', inputNombre.value);
    formData.append('fecha', inputFecha.value);
    formData.append('descripcion', inputDescripcion.value);
    formData.append('lugar', inputLugar.value);
    formData.append('precio', inputPrecio.value);
    formData.append('imagen', inputImagen.files[0]); 

    
    fetch('http://localhost:3000/api/v1/eventos/', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
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