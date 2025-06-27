import { Header } from '../../components/Header/Header'
import { Home } from '../Home/Home'
import '../LoginRegister/LoginRegister.css'
import { fetchData } from '../../utils/api'

export const Register = () => {
  const main = document.querySelector('main')
  main.innerHTML = ''

  const registerDiv = document.createElement('div')
  createRegisterForm(registerDiv)
  registerDiv.id = 'register'
  main.append(registerDiv)
}

const createRegisterForm = (elementoPadre) => {
  const form = document.createElement('form')

  const title = document.createElement('h2')
  title.textContent = 'Crear Cuenta'
  title.style.textAlign = 'center'
  title.style.marginBottom = '20px'

  const inputNombre = document.createElement('input')
  const inputEmail = document.createElement('input')
  const inputPassword = document.createElement('input')
  const button = document.createElement('button')

  const statusMessage = document.createElement('p')
  statusMessage.classList.add('status-message')
  statusMessage.style.display = 'none'

  
  const loginLink = document.createElement('p')
  loginLink.innerHTML = '¿Ya tienes cuenta? <a href="#/login" id="go-to-login">Inicia sesión aquí</a>'
  loginLink.style.textAlign = 'center'
  loginLink.style.marginTop = '15px'

  inputNombre.type = 'text'
  inputNombre.placeholder = 'Nombre'
  inputPassword.type = 'password'
  inputPassword.placeholder = 'Contraseña'
  inputEmail.type = 'email'
  inputEmail.placeholder = 'Email'
  button.textContent = 'Registrarse'
  button.className = 'button'
  button.type = 'submit'

  elementoPadre.append(form)
  form.append(title, inputNombre, inputEmail, inputPassword, button, statusMessage, loginLink)

  
  document.getElementById('go-to-login').addEventListener('click', (e) => {
    e.preventDefault()
   
    import('../Login/Login.js').then(module => {
      module.Login()
    })
  })

  form.addEventListener('submit', (e) => {
    e.preventDefault()
    handleRegister(inputNombre.value, inputEmail.value, inputPassword.value, form, statusMessage)
  })
}

const handleRegister = async (nombre, email, password, form, statusMessage) => {
  try {
    statusMessage.style.display = 'none'

    
    if (!nombre || !email || !password) {
      statusMessage.textContent = 'Por favor completa todos los campos'
      statusMessage.style.color = 'red'
      statusMessage.style.display = 'block'
      return
    }

    const userData = { nombre, email, password }
    
    const registerData = await fetchData({
      url: 'http://localhost:3000/api/v1/users/register',
      method: 'POST',
      body: userData
    })

   
    form.innerHTML = ''
    
    const successDiv = document.createElement('div')
    successDiv.classList.add('success-container')
    successDiv.style.textAlign = 'center'

    const successMessage = document.createElement('p')
    successMessage.classList.add('success-message')
    successMessage.textContent = '¡Bienvenido! Te has registrado correctamente'
    successMessage.style.color = "#28a745"
    successMessage.style.fontSize = '18px'
    successMessage.style.marginBottom = '20px'

    const continueButton = document.createElement('button')
    continueButton.textContent = 'Continuar'
    continueButton.className = 'button'

    successDiv.appendChild(successMessage)
    successDiv.appendChild(continueButton)
    form.appendChild(successDiv)

    
    localStorage.setItem('token', registerData.token)
    localStorage.setItem('user', JSON.stringify(registerData.user))

    continueButton.addEventListener('click', () => {
      Home()
      Header()
    })

  } catch (error) {
    console.error('Error en registro:', error)
    statusMessage.textContent = 'Error al registrar usuario. Puede que el email ya esté en uso.'
    statusMessage.style.color = 'red'
    statusMessage.style.display = 'block'
  }
}