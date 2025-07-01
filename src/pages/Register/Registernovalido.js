import { Header } from '../../components/Header/Header.js'
import { Home } from '../Home/Home.js'
import { fetchData } from '../../utils/api.js'

export const Register = () => {
  const main = document.querySelector('main')
  main.innerHTML = ''

  const registerDiv = document.createElement('div')
  registerDiv.id = 'register'
  createRegisterForm(registerDiv)
  main.append(registerDiv)
}

const createRegisterForm = (elementoPadre) => {
  const form = document.createElement('form')

  const inputName = document.createElement('input')
  inputName.type = 'text'
  inputName.placeholder = 'Nombre'

  const inputEmail = document.createElement('input')
  inputEmail.type = 'email'
  inputEmail.placeholder = 'Email'

  const inputPassword = document.createElement('input')
  inputPassword.type = 'password'
  inputPassword.placeholder = 'Contraseña'

  const button = document.createElement('button')
  button.type = 'submit'
  button.className = 'button'
  button.textContent = 'Registrarse'

  const statusMessage = document.createElement('p')
  statusMessage.classList.add('status-message')
  statusMessage.style.display = 'none'
  statusMessage.style.textAlign = 'center'
  statusMessage.style.marginTop = '10px'
  statusMessage.style.width = '100%'

  // Crear <p> con <a> adentro ya centrado
  const loginLink = document.createElement('p')
  loginLink.style.textAlign = 'center'
  loginLink.style.marginTop = '15px'
  loginLink.style.width = '100%'
  loginLink.innerHTML = '¿Ya tienes cuenta? <a href="#/login">Inicia sesión aquí</a>'

  // Agregar el evento al <a>
  const anchor = loginLink.querySelector('a')
  anchor.addEventListener('click', async (e) => {
    e.preventDefault()
    const module = await import('../Login/Login.js')
    module.Login()
  })

  // Agregar elementos al formulario
  form.append(inputName, inputEmail, inputPassword, button, statusMessage, loginLink)
  elementoPadre.appendChild(form)

  form.addEventListener('submit', (e) => {
    e.preventDefault()
    handleRegister(inputName.value, inputEmail.value, inputPassword.value, statusMessage)
  })
}

const handleRegister = async (nombre, email, password, statusMessage) => {
  try {
    statusMessage.style.display = 'none'

    const newUser = { nombre, email, password }

    const userData_res = await fetchData({
      url: 'http://localhost:3000/api/v1/users/register',
      method: 'POST',
      body: newUser
    })

    localStorage.setItem('token', userData_res.token)
    localStorage.setItem('user', JSON.stringify(userData_res.user))

    statusMessage.textContent = '¡Registro exitoso!'
    statusMessage.style.color = '#28a745'
    statusMessage.style.display = 'block'

    setTimeout(() => {
      Home()
      Header()
    }, 1000)
  } catch (error) {
    console.error('Error en registro:', error)
    statusMessage.textContent = 'Error al registrarse. Intenta nuevamente.'
    statusMessage.style.color = 'red'
    statusMessage.style.display = 'block'
  }
}
