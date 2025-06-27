import { Header } from '../../components/Header/Header'
import { Home } from '../Home/Home'
import '../LoginRegister/LoginRegister.css'
import { fetchData } from '../../utils/api'

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

  const title = document.createElement('h2')
  title.textContent = 'Registro'
  title.style.textAlign = 'center'
  title.style.marginBottom = '20px'

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

  const loginLink = document.createElement('p')
  loginLink.style.textAlign = 'center'
  loginLink.style.marginTop = '15px'

  
  const anchor = document.createElement('a')
  anchor.href = '#/login'
  anchor.textContent = 'Inicia sesión aquí si ya tienes cuenta'
  anchor.addEventListener('click', async (e) => {
    e.preventDefault()
    const module = await import('../Login/Login.js')
    module.Login()
  })

  loginLink.innerHTML = '¿Ya tienes cuenta? '
  loginLink.appendChild(anchor)

  form.append(title, inputName, inputEmail, inputPassword, button, statusMessage, loginLink)
  elementoPadre.appendChild(form)

  form.addEventListener('submit', (e) => {
    e.preventDefault()
    handleRegister(inputName.value, inputEmail.value, inputPassword.value, statusMessage)
  })
}

const handleRegister = async (name, email, password, statusMessage) => {
  try {
    statusMessage.style.display = 'none'

    const newUser = { name, email, password }

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
