import { Preferidos } from '../../pages/MisEventos/preferidos'
import { Home } from '../../pages/Home/Home'
import { LoginRegister } from '../../pages/LoginRegister/LoginRegister'
import { CrearEvento } from '../../pages/CrearEvento/CrearEvento'
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

  for (const route of routes) {
    const a = document.createElement('a')
    a.href = '#'

    if (route.texto === 'Login' && localStorage.getItem('token')) {
      a.textContent = 'Logout'
      a.addEventListener('click', () => {
        localStorage.clear()
        Header()
        Home()
      })
    } else {
      if (!localStorage.getItem('token') && route.texto === 'Crear Evento') {
  
      } else if (!localStorage.getItem('token') && route.texto === 'Mis Eventos') {
      } else {
        a.textContent = route.texto
        a.addEventListener('click', route.funcion)
        /*a.addEventListener('click', () => {
          const main = document.querySelector('main')
          main.innerHTML = ''
          route.funcion()
        })*/

      }
    }
    nav.append(a)
  }
  header.append(nav)
}
