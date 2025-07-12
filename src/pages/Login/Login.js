import { Header } from '../../components/Header/Header.js'
import { Home } from '../Home/Home.js'
import { fetchData } from '../../utils/api.js'
import '../../components/Form/authForm.css'
import '../../components/StatusMessage/StatusMessage.css'

export const Login = () => {
  const main = document.querySelector('main')
  main.innerHTML = ''

  const container = document.createElement('div')
  container.className = 'auth-form-container'

  createLoginForm(container)

  main.appendChild(container)
}

const createLoginForm = (parentElement) => {
  const form = document.createElement('form')
  form.className = 'auth-form'

  const title = document.createElement('h2')
  title.textContent = 'Iniciar Sesión'

  const inputEmail = document.createElement('input')
  inputEmail.type = 'email'
  inputEmail.placeholder = 'Correo electrónico'

  const inputPassword = document.createElement('input')
  inputPassword.type = 'password'
  inputPassword.placeholder = 'Contraseña'

  const statusMessage = document.createElement('div')
  statusMessage.classList.add('status-message')
  statusMessage.style.display = 'none'

  const button = document.createElement('button')
  button.type = 'submit'
  button.className = 'button'
  button.textContent = 'Iniciar Sesión'

  const registerLink = document.createElement('p')
  registerLink.innerHTML = `¿No tienes cuenta? <a href="#/register">Regístrate</a>`

  registerLink.querySelector('a').addEventListener('click', async (e) => {
    e.preventDefault()
    const module = await import('../Register/Register.js')
    module.Register()
  })

  form.append(title, inputEmail, inputPassword, statusMessage, button, registerLink)
  parentElement.appendChild(form)

  form.addEventListener('submit', (e) => {
    e.preventDefault()
    handleLogin(inputEmail.value, inputPassword.value, statusMessage)
  })
}

const handleLogin = async (email, password, statusMessage) => {
  if (!email || !password) {
    statusMessage.textContent = 'Por favor, rellena todos los campos'
    statusMessage.className = 'status-message error'
    statusMessage.style.display = 'block'
    return
  }

  try {
    statusMessage.style.display = 'none'

    const userData = { email, password }

    const userData_res = await fetchData({
      url: 'http://localhost:3000/api/v1/users/login',
      method: 'POST',
      body: userData
    })

    localStorage.setItem('token', userData_res.token)
    localStorage.setItem('user', JSON.stringify(userData_res.user))

    statusMessage.textContent = '¡Bienvenido de vuelta!'
    statusMessage.className = 'status-message success'
    statusMessage.style.display = 'block'

    setTimeout(() => {
      Home()
      Header()
    }, 1000)
  } catch (error) {
    console.error('Error en login:', error)
    statusMessage.textContent = 'Email o contraseña incorrectos'
    statusMessage.className = 'status-message error'
    statusMessage.style.display = 'block'
  }
}
