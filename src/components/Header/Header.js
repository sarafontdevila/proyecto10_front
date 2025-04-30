import { Preferidos } from '../../pages/MisEventos/preferidos'
import { Home } from '../../pages/Home/Home'
import { LoginRegister } from '../../pages/LoginRegister/LoginRegister'
import { CrearEvento } from '../../pages/CrearEvento/CrearEvento'
import { ListaAsistentes } from '../../pages/Listas/ListaAsistentes'
import './Header.css'

const routes = [
  {
    texto: 'Home',
    funcion: Home
  },
  {
    texto: 'Mis Eventos',
    funcion: Preferidos
  },
  { 
    texto: 'Listas',
    funcion: ListaAsistentes
  },
  {
    texto: "Crear Evento",
    funcion: CrearEvento
  },
  {
    texto: 'Login',
    funcion: LoginRegister
  }
]


export const Header = () => {
  const header = document.querySelector('header')
  header.innerHTML = ''
  const nav = document.createElement('nav')
  nav.classList.add( 'nav-links')
 

  const hamburger = document.createElement('button')
  hamburger.className = 'hamburger'
  hamburger.innerHTML = '&#9776;' 
  header.appendChild(hamburger)

  hamburger.addEventListener('click', () => {
    nav.classList.toggle('open') 
  })

  const token = localStorage.getItem('token')

  
  for (const route of routes) {
    const a = document.createElement('a')
    a.href = '#'

    if (route.texto === 'Login' && token){
      a.textContent = 'Logout'
      a.addEventListener('click', () => {
        localStorage.clear()
        Header()
        Home()
      })
    
      } else {
       
        if (!token && ['Crear Evento', 'Mis Eventos', 'Listas'].includes(route.texto))
         {
          continue
        }
      
        a.textContent = route.texto
        a.addEventListener('click', route.funcion)
      }
      nav.appendChild(a)
    }
    header.append(nav)
  }




  /*} else {
      if (!localStorage.getItem('token') && route.texto === 'Crear Evento') {
  
      } else if (!localStorage.getItem('token') && route.texto === 'Mis Eventos') {
      } else {
        a.textContent = route.texto
        a.addEventListener('click', route.funcion)
      }*/

