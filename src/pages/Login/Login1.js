import { Header } from '../../components/Header/Header'
import { Home } from '../Home/Home'
import '../LoginRegister/LoginRegister.css'
import { fetchData } from '../../utils/api'

export const Login = () => {
  const main = document.querySelector('main')
  main.innerHTML = ''

  const loginDiv = document.createElement('div')
  createLoginForm(loginDiv)
  loginDiv.id = 'login'
  main.append(loginDiv)
}

const createLoginForm = (elementoPadre) => {
  const form = document.createElement('form')

  const title = document.createElement('h2')
  title.textContent = 'Iniciar Sesión'
  title.style.textAlign = 'center'
  title.style.marginBottom = '20px'

  const inputEmail = document.createElement('input')
  const inputPassword = document.createElement('input')
  const button = document.createElement('button')

  const statusMessage = document.createElement('p')
  statusMessage.classList.add('status-message')
  statusMessage.style.display = 'none'

  const registerLink = document.createElement('p')
  registerLink.style.textAlign = 'center'
  registerLink.style.marginTop = '15px'

  const anchor = document.createElement('a')
  anchor.href = '#/register'
  anchor.textContent = 'Regístrate aquí'
  anchor.addEventListener('click', (e) => {
    e.preventDefault()

    import('../Register/Register.js').then(module => {
      module.Register()
    })
  })

  registerLink.innerHTML = '¿No tienes cuenta? '
  registerLink.appendChild(anchor)

  inputEmail.type = 'email'
  inputEmail.placeholder = 'Email'

  inputPassword.type = 'password'
  inputPassword.placeholder = 'Contraseña'

  button.textContent = 'Iniciar Sesión'
  button.className = 'button'
  button.type = 'submit'

  elementoPadre.append(form)
  form.append(title, inputEmail, inputPassword, button, statusMessage, registerLink)

  form.addEventListener('submit', (e) => {
    e.preventDefault()
    handleLogin(inputEmail.value, inputPassword.value, statusMessage)
  })
}

const handleLogin = async (email, password, statusMessage)
