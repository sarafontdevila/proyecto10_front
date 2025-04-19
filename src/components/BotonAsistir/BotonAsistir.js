

function logueado() {
  const token = localStorage.getItem('authToken'); 
  return !!token; 
}

export function BotonesAsistir() {
  document.addEventListener('DOMContentLoaded', function() {
    const botonesAsistir = document.querySelectorAll('.Asistir, button:contains("Asistir")');
    
    botonesAsistir.forEach(boton => {
      boton.addEventListener('click', function(e) {
        if (!logueado()) {
         
          e.preventDefault();
          const notificacion = document.createElement('p');
          notificacion.textContent = "Inicia sesión para asistir";
          notificacion.classList.add('notificacion-asistir'); 
          document.body.appendChild(notificacion);
          notificacion.style.color = 'red';
          setTimeout(() => {
            notificacion.remove();
          }, 3000);
          window.location.href = 'login.html'; 
        }
      });
    });
  });
}
