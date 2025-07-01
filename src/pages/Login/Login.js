import { Header } from '../../components/Header/Header.js'
import { Home } from '../Home/Home.js'
import { fetchData } from '../../utils/api.js'

export const Login = () => {
  const main = document.querySelector('main')
  main.innerHTML = ''

  const loginDiv = document.createElement('div')
  loginDiv.id = 'login'
  createLoginForm(loginDiv)
  main.append(loginDiv)
}

const createLoginForm = (elementoPadre) => {
  const form = document.createElement('form')

  const inputEmail = document.createElement('input')
  inputEmail.type = 'email'
  inputEmail.placeholder = 'Email'

  const inputPassword = document.createElement('input')
  inputPassword.type = 'password'
  inputPassword.placeholder = 'Contraseña'

  const button = document.createElement('button')
  button.type = 'submit'
  button.className = 'button'
  button.textContent = 'Iniciar Sesión'

  const statusMessage = document.createElement('p')
  statusMessage.classList.add('status-message')
  statusMessage.style.display = 'none'

  const registerLink = document.createElement('p')
  registerLink.style.textAlign = 'center'
  registerLink.style.marginTop = '15px'

  
  const anchor = document.createElement('a')
  anchor.href = '#/register'
  anchor.textContent = 'Regístrate aquí si no tienes cuenta'
  anchor.addEventListener('click', async (e) => {
    e.preventDefault()
    const module = await import('../Register/Register.js')
    module.Register()
  })

  registerLink.innerHTML = '¿No tienes cuenta? '
  registerLink.appendChild(anchor)

  form.append(inputEmail, inputPassword, button, statusMessage, registerLink)
  elementoPadre.appendChild(form)

  form.addEventListener('submit', (e) => {
    e.preventDefault()
    
    handleLogin(inputEmail.value, inputPassword.value, statusMessage)
  })
}

const handleLogin = async (email, password, statusMessage) => {
  try {
    statusMessage.style.display = 'none'

    const userData = { email, password }

    const userData_res = await fetchData({
      url: 'http://localhost:3000/api/v1/users/login',
      method: 'POST',
      body: userData
    })
    console.log('Usuario recibido del login:', userData_res.user)
    console.log('¿Tiene preferidos?', userData_res.user.preferidos)

    localStorage.setItem('token', userData_res.token)
    localStorage.setItem('user', JSON.stringify(userData_res.user))

    statusMessage.textContent = '¡Bienvenido de vuelta!'
    statusMessage.style.color = '#28a745'
    statusMessage.style.display = 'block'

    setTimeout(() => {
      Home()
      Header()
    }, 1000)
  } catch (error) {
    console.error('Error en login:', error)
    statusMessage.textContent = 'Email o contraseña incorrectos'
    statusMessage.style.color = 'red'
    statusMessage.style.display = 'block'
  }
}
