import { Header } from '../../components/Header/Header'
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

  const submit = (email, password) => console.log(email, password)
  

