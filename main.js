import { Header } from './src/components/Header/Header'
import { Home } from './src/pages/Home/Home'
import { CrearEvento } from './src/pages/CrearEvento/CrearEvento'
import { BotonesAsistir } from './src/components/BotonAsistir/BotonAsistir'
import './style.css'

const Main = () => {
  const app = document.querySelector("#app");
    app.innerHTML = `
      <header></header>
      <main></main>
    `
}
Main()
Header()
Home()
CrearEvento()
BotonesAsistir()

