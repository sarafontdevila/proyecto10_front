/*import { Header } from '../../components/Header/Header'
import { Home } from '../Home/Home'
import "./LoginRegister.css"

export const LoginRegister =() => {
  const main= document.querySelector("main")
  main.innerHTML = "";

  const loginDiv = document.createElement("div")

  Login(loginDiv)

  loginDiv.id = "login"

  main.append(loginDiv)
}

const Login = (elementoPadre) => { 
  const form = document.createElement("form")
  const inputEmail = document.createElement("input")
  const inputPassword = document.createElement("input")
  const button = document.createElement("button")

  inputPassword.type = "password"
  inputEmail.placeholder = "Email"
  inputPassword.placeholder = "Contraseña"
  button.textContent = "Login"

  elementoPadre.append(form)
  form.append(inputEmail)
  form.append(inputPassword)
  form.append(button)

  form.addEventListener("submit", () => submit(inputEmail.value, inputPassword.value, form));
  }

  const submit = async (email, password, form) => {

    const objetoFinal = JSON.stringify({
      email, 
      password
    })
    
    const opciones = {
      method: "POST",
      body: objetoFinal,
      headers: {
        "Content-Type": "application/json"
      }
    }

    const res = await fetch("http://localhost:3000/api/v1/users/login", opciones)

    if (res.status === 400) {
      const errorLogin = document.createElement("p")
      errorLogin.classList.add("error")
      errorLogin.textContent = "Credenciales incorrectas"
      errorLogin.style.color = "red"
      form.append(errorLogin)
      return
    }
    const errorLogin = document.querySelector(".error")
    if (errorLogin) {
      errorLogin.remove()
    }
    const respuestaFinal = await res.json()

    localStorage.setItem("token", respuestaFinal.token)
    localStorage.setItem("user", JSON.stringify(respuestaFinal.user));

    Home()
    Header()
    
    }

  /*http://localhost:3000/api/v1/users/login */
  

