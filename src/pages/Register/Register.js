import { Header } from '../../components/Header/Header.js'
import { Home } from '../Home/Home.js'
import { fetchData } from '../../utils/api.js'
import '../../components/StatusMessage/StatusMessage.css'

export const Register = () => {
  const main = document.querySelector('main')
  main.innerHTML = ''

  const container = document.createElement('div')
  container.className = 'auth-form-container'

  createRegisterForm(container)
  main.appendChild(container)
}

const createRegisterForm = (parentElement) => {
  const form = document.createElement('form')
  form.className = 'auth-form'

  const title = document.createElement('h2')
  title.textContent = 'Registro'

  const inputName = document.createElement('input')
  inputName.type = 'text'
  inputName.placeholder = 'Nombre'
  

  const inputEmail = document.createElement('input')
  inputEmail.type = 'email'
  inputEmail.placeholder = 'Email'
  

  const inputPassword = document.createElement('input')
  inputPassword.type = 'password'
  inputPassword.placeholder = 'Contraseña'
 

  const statusMessage = document.createElement('div')
  statusMessage.classList.add('status-message')
  statusMessage.style.display = 'none'

  const button = document.createElement('button')
  button.type = 'submit'
  button.className = 'button'
  button.textContent = 'Registrarse'

  const loginLink = document.createElement('p')
  loginLink.innerHTML = `¿Ya tienes cuenta? <a href="#/login">Inicia sesión</a>`

  loginLink.querySelector('a').addEventListener('click', async (e) => {
    e.preventDefault()
    const module = await import('../Login/Login.js')
    module.Login()
  })

  form.append(title, inputName, inputEmail, inputPassword, statusMessage, button, loginLink)
  parentElement.appendChild(form)

  form.addEventListener('submit', (e) => {
    e.preventDefault()
    handleRegister(inputName.value, inputEmail.value, inputPassword.value, statusMessage)
  })
}

const handleRegister = async (nombre, email, password, statusMessage) => {
 
    statusMessage.style.display = 'none'

    if (!nombre || !email || !password) {
      statusMessage.textContent = 'Por favor, rellena todos los campos'
      statusMessage.className = 'status-message error'
      statusMessage.style.display = 'block'
      return
    }

    try {
      
      const newUser = { nombre, email, password }
  
      const userData_res = await fetchData({
        url: 'http://localhost:3000/api/v1/users/register',
        method: 'POST',
        body: newUser
      })

    localStorage.setItem('token', userData_res.token)
    localStorage.setItem('user', JSON.stringify(userData_res.user))

    statusMessage.textContent = '¡Registro exitoso!'
    statusMessage.className = 'status-message success'
    statusMessage.style.display = 'block'

    setTimeout(() => {
      Home()
      Header()
    }, 1000)
  } catch (error) {
    console.error('Error en registro:', error)
    statusMessage.textContent = error.message || 'Ocurrió un error en el registro'
    statusMessage.className = 'status-message error'
    statusMessage.style.display = 'block'
  }
}

