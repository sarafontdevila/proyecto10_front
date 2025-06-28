import '../../components/Form/Form.css';
import { Home } from '../Home/Home';
import { fetchData } from '../../utils/api';
import { loading } from '../../components/Loading/Loading';
import { pintarEventos } from '../../utils/pintarEventos';

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
  statusMessage.style.color = "#bb8218";
  statusMessage.style.fontSize = '18px';
  statusMessage.style.marginBottom = '20px';
  statusMessage.style.display = 'none';

  form.append(inputNombre, inputFecha, inputDescripcion, inputLugar, inputPrecio, inputImagen, button, statusMessage);
  elementoPadre.append(form);

  async function handleSubmit(event) {
    event.preventDefault();
    loading(true);

    if (!inputNombre.value || !inputFecha.value || !inputDescripcion.value ||
      !inputLugar.value || !inputPrecio.value || !inputImagen.files[0]) {

      setTimeout(() => {
        loading(false); 
        statusMessage.textContent = 'Por favor complete todos los campos';
        statusMessage.style.display = 'block';
      }, 500);
      return;
    }

    const formData = new FormData();
    formData.append('nombre', inputNombre.value);
    formData.append('fecha', inputFecha.value);
    formData.append('descripcion', inputDescripcion.value);
    formData.append('lugar', inputLugar.value);
    formData.append('precio', inputPrecio.value);
    formData.append('imagen', inputImagen.files[0]);

    try {
      await fetchData({
        url: 'http://localhost:3000/api/v1/eventos/',
        method: 'POST',
        body: formData,
        token: localStorage.getItem('token'),
      });

      statusMessage.textContent = 'Evento creado con éxito!';
      statusMessage.style.display = 'block';
      form.reset();
      Home();
    } catch (error) {
      statusMessage.textContent = 'Error al crear el evento.';
      statusMessage.style.display = 'block';
      console.error('Error:', error);
    } finally {
      loading(false); 
    }
  }
};