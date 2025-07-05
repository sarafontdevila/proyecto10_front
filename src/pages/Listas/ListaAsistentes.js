import './ListaAsistentes.css';
import { fetchData } from '../../utils/api';
import { mostrarMensaje } from '../../components/Message/Message';


export const ListaAsistentes = async () => {
  const main = document.querySelector("main");
  main.innerHTML = "";
  main.textContent = "";

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  const header = document.createElement("div");
  header.className = "lista-header";

  const icon = document.createElement("span");
  icon.className = "user-icon";
  icon.innerHTML = "👤";

  const title = document.createElement("h1");
  title.textContent = "Eventos - Lista de Asistentes";

  header.append(icon, title);
  main.append(header);

  try {
    const preferidos = await fetchData({
      url: `http://localhost:3000/api/v1/eventos`,
      method: 'GET',
      token
      
    });
    console.log("📦 Datos crudos recibidos:", preferidos)
    console.log("📋 Eventos recibidos:", preferidos);
    console.log("🔢 Número de eventos:", preferidos?.length);

    const eventosContainer = document.createElement("div");
    eventosContainer.className = "eventos-container";

    for (const evento of preferidos) {
      console.log("🗂 Evento:", evento)
      const eventoCard = document.createElement("div");
      eventoCard.className = "evento-card";

      
      const nombreEvento = document.createElement("h2");
      nombreEvento.textContent = evento.nombre;

      const fechaContainer = document.createElement("div");
      fechaContainer.className = "fecha-container";
      const calendarIcon = document.createElement("span");
      calendarIcon.className = "calendar-icon";
      calendarIcon.innerHTML = "📅";

      const fechaEvento = document.createElement("p");
      fechaEvento.textContent = new Date(evento.fecha).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });

      fechaContainer.append(calendarIcon, fechaEvento);

      
      const lugarContainer = document.createElement("div");
      lugarContainer.className = "lugar-container";
      
      const locationIcon = document.createElement("span");
      locationIcon.innerHTML = "📍";
      
      const lugarEvento = document.createElement("p");
      lugarEvento.textContent = evento.lugar;
      
      lugarContainer.append(locationIcon, lugarEvento);

      
      const creadorContainer = document.createElement("div");
      creadorContainer.className = "creador-container";
      
      const creadorIcon = document.createElement("span");
      creadorIcon.innerHTML = "👨‍💼";
      
      const creadorEvento = document.createElement("p");
      creadorEvento.textContent = `Organizado por: ${evento.creadorId?.nombre || 'Organizador desconocido'}`;
      
      creadorContainer.append(creadorIcon, creadorEvento);

      const precioContainer = document.createElement("div");
      precioContainer.className = "precio-container";
      
      const precioIcon = document.createElement("span");
      precioIcon.innerHTML = "💰";
      
      const precioEvento = document.createElement("p");
      precioEvento.textContent = evento.precio === 0 ? 'Gratis' : `${evento.precio}€`;
      
      precioContainer.append(precioIcon, precioEvento);

      
      const asistentesContainer = document.createElement("div");
      asistentesContainer.className = "asistentes-container";

      const asistentesHeader = document.createElement("div");
      asistentesHeader.className = "asistentes-header";

      const userIcon = document.createElement("span");
      userIcon.className = "user-icon";
      userIcon.innerHTML = "👥";

      const asistentesTitle = document.createElement("h3");
      const numAsistentes = evento.asistentes?.length || 0;
      asistentesTitle.textContent = `Asistentes (${numAsistentes})`;

      asistentesHeader.append(userIcon, asistentesTitle);

    
      const asistentesLista = document.createElement("div");
      asistentesLista.className = "asistentes-lista";

        if (evento.asistentes && evento.asistentes.length > 0) {
          const nombresAsistentes = evento.asistentes
            .map(asistente => asistente.nombre || 'Usuario sin nombre')
            .join(', ');
        
          const asistentesTexto = document.createElement("p");
          asistentesTexto.className = "asistentes-nombres";
          asistentesTexto.textContent = nombresAsistentes;
        
          asistentesLista.append(asistentesTexto);
         
      } else {
        const sinAsistentes = document.createElement("p");
        sinAsistentes.className = "sin-asistentes";
        sinAsistentes.textContent = "No hay otros asistentes registrados.";
        asistentesLista.append(sinAsistentes);
      }

      asistentesContainer.append(asistentesHeader, asistentesLista);
      
      eventoCard.append(
        nombreEvento, 
        fechaContainer, 
        lugarContainer, 
        creadorContainer,
        precioContainer,
        asistentesContainer
      );
      
      eventosContainer.append(eventoCard);
    }

    main.append(eventosContainer);

  } catch (error) {
    console.error("Error al cargar mis eventos:", error);
    mostrarMensaje("Error al cargar tus eventos. Por favor, inténtalo de nuevo más tarde.", "error");
  }
};