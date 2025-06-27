import './Loading.css'

function loading(show = true) {
  let loadingElement = document.getElementById('loading');

 
  if (!loadingElement) {
    loadingElement = document.createElement('div');
    loadingElement.id = 'loading';
    loadingElement.innerHTML = 'Cargando...';
    document.body.appendChild(loadingElement);
  }
  
  loadingElement.style.display = show ? 'block' : 'none';
}

export { loading };