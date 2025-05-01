import './Loading.css'

export function createLoadingElement() {
  if (document.getElementById('loading')) {
    return;
  }
  
  const loadingElement = document.createElement('div');
  loadingElement.id = 'loading';
  loadingElement.innerHTML = 'Cargando...';
  
  document.body.appendChild(loadingElement);
}
createLoadingElement();

function showLoading() {
  createLoadingElement(); 
  document.getElementById('loading').style.display = 'block';
}

function hideLoading() {
  document.getElementById('loading').style.display = 'none';
}

export { showLoading, hideLoading };