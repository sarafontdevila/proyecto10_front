// src/utils/authCheck.js
import { Home } from '../pages/Home/Home.js'
import { Header } from '../components/Header/Header.js'

export const checkAuth = () => {
  const token = localStorage.getItem('token')
  const user = localStorage.getItem('user')

  if (token && user) {
   
    console.log('Sesión detectada:', JSON.parse(user))
    Home()
    Header()
  } else {
    console.log('No hay sesión activa.')
    Home()
  }
}
