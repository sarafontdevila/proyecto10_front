import "./Header.css"
import { Home } from '../../pages/Home/Home'
import { LoginRegister } from '../../pages/LoginRegister/LoginRegister'

export const Header =() => { 
  const header = document.querySelector("header")

  header.innerHTML = "<h1>Header</h1>"
}