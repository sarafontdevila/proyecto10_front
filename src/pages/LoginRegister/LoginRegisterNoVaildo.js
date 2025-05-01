/*import { Header } from '../../components/Header/Header'
import { Home } from '../Home/Home'
import { Preferidos } from '../MisEventos/Preferidos'
import { CrearEvento } from '../CrearEvento/CrearEvento'
import './LoginRegister.css'

export const LoginRegister = () => {
  const main = document.querySelector('main')
  main.innerHTML = ''

  const loginDiv = document.createElement('div')

  Login(loginDiv)

  loginDiv.id = 'login'

  main.append(loginDiv)
}

const Login = (elementoPadre) => {
  const form = document.createElement('form')

  const inputNombre = document.createElement('input')
  const inputEmail = document.createElement('input')
  const inputPassword = document.createElement('input')
  const button = document.createElement('button')

  const statusMessage = document.createElement('p')
  statusMessage.classList.add('status-message')
  statusMessage.style.display = 'none'

  inputNombre.type = 'text'
  inputNombre.placeholder = 'Nombre'
  inputPassword.type = 'password'
  inputPassword.placeholder = 'Contraseña'
  inputEmail.type = 'Email' 
  inputEmail.placeholder = 'Email'
  button.textContent = 'Entrar'
  button.className = 'button'

  elementoPadre.append(form)
  form.append(inputNombre)
  form.append(inputEmail)
  form.append(inputPassword)
  form.append(button)
  form.append(statusMessage)

  form.addEventListener('submit', (e) => {
    e.preventDefault()
    submit( inputNombre.value,inputEmail.value, inputPassword.value, form, statusMessage)
  })
}

const submit = async (nombre, email, password, form, statusMessage) => {
  try {
    const errorLogin = document.querySelector('.error')
    if (errorLogin) {
      errorLogin.remove()
    }

    const userData = {
      nombre,
      email,
      password
    }

    let loginSuccess = false
    let userData_res = null

    try {
      const loginOptions = {
        method: 'POST',
        body: JSON.stringify(userData),
        headers: {
          'Content-Type': 'application/json'
        }
      }

      const loginRes = await fetch(
        'http://localhost:3000/api/v1/users/login',
        loginOptions
      )

      if (loginRes.ok) {
        userData_res = await loginRes.json()
        loginSuccess = true
      } else {
        loginSuccess = false
      }
    } catch (error) {
      console.error('Error en el intento de login:', error)
    }

    if (loginSuccess) {
      localStorage.setItem('token', userData_res.token)
      localStorage.setItem('user', JSON.stringify(userData_res.user))

      Home()
      Header()
     
    } else {
      try {
        const registerOptions = {
          method: 'POST',
          body: JSON.stringify(userData),
          headers: {
            'Content-Type': 'application/json'
          }
        }

        const registerRes = await fetch(
          'http://localhost:3000/api/v1/users/register',
          registerOptions
        )

        if (registerRes.ok) {
          const registerData = await registerRes.json()

          form.innerHTML = ''

          const successDiv = document.createElement('div')
          successDiv.classList.add('success-container')

          const successMessage = document.createElement('p')
          successMessage.classList.add('success-message')
          successMessage.textContent =
            '¡Bienvenido ya estás registrado correctamente!'
          successMessage.style.color = "#bb8218"
          successMessage.style.fontSize = '18px'
          successMessage.style.marginBottom = '20px'

          const continueButton = document.createElement('button')
          continueButton.textContent = 'Continuar'
          continueButton.className = "button"; 

          successDiv.appendChild(successMessage)
          successDiv.appendChild(continueButton)
          form.appendChild(successDiv)

          localStorage.setItem('token', registerData.token)
          localStorage.setItem('user', JSON.stringify(registerData.user))


          continueButton.addEventListener('click', () => {
            const main = document.querySelector('main')
            main.innerHTML = ''
            Home()
            Header()
          })
        } else {
          const errorRegister = document.createElement('p')
          errorRegister.classList.add('error')
          errorRegister.textContent = 'Error al registrar usuario'
          errorRegister.style.color = 'red'
          form.append(errorRegister)
        }
      } catch (registerError) {
        console.error('Error en el intento de registro:', registerError)
        const errorMsg = document.createElement('p')
        errorMsg.classList.add('error')
        errorMsg.textContent = 'Error de conexión al registrar'
        errorMsg.style.color = 'red'
        form.append(errorMsg)
      }
    }
  } catch (error) {
    console.error('Error general:', error)
    const errorGeneral = document.createElement('p')
    errorGeneral.classList.add('error')
    errorGeneral.textContent = 'Error de conexión'
    errorGeneral.style.color = 'red'
    form.append(errorGeneral)
  }
}*/
