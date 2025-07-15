import { Header } from './src/components/Header/Header'
import './style.css'
import { checkAuth } from './src/utils/authCheck'

const Main = () => {
  const app = document.querySelector("#app");
    app.innerHTML = `
      <header></header>
      <main></main>
    `
}

Main()
checkAuth()
Header()





