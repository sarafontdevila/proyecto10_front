import './ListaAsistentes.css';
import { fetchData } from '../../utils/api';
import { mostrarMensaje } from '../../components/Message/Message';

export const ListaAsistentes = async () => {
  const main = document.querySelector("main");
  main.innerHTML = "";

  const token = localStorage.getItem("token");

  const header = document.createElement("div");
  header.className = "lista-header";

  const icon = document.createElement("span");
  icon.className = "user-icon";
  icon.innerHTML = "👤";

  const title = document.createElement("h1");
  title.textContent = "Mis Eventos - Lista de Asistentes";

  header.append(icon, title);
  main.append(header);

  try {
    // Usar el endpoint específico para obtener MIS eventos
    const preferidos = await fetchData({
      url: `http://localhost:3000/api/v1/eventos/mis-eventos`,
      method: 'GET',
      token
    });

    if (!preferidos || preferidos.length === 0) {
      const noEventos = document.createElement("p");
      noEventos.className = "no-eventos";
      noEventos.textContent = "No estás inscrito en ningún evento.";
      main.append(noEventos);
      return;
    }

    const eventosContainer = document.createElement("div");
    eventosContainer.className = "eventos-container";

    for (const evento of preferidos) {
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
      const numAsistentes = evento.asistentes ? evento.asistentes.length : 0;
      asistentesTitle.textContent = `Asistentes (${numAsistentes})`;

      asistentesHeader.append(userIcon, asistentesTitle);

    
      const asistentesLista = document.createElement("div");
      asistentesLista.className = "asistentes-lista";

      if (evento.asistentes && evento.asistentes.length > 0) {
        evento.asistentes.forEach(asistente => {
          const asistenteItem = document.createElement("span");
          asistenteItem.className = "asistente-item";
          asistenteItem.textContent = asistente.nombre || 'Usuario sin nombre';
          asistentesLista.append(asistenteItem);
        });
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