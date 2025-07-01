import './Home.css'
import { fetchData } from '../../utils/api'
import { pintarEventos } from '../../components/pintarEventos'

export const Home = async () => {
  const main = document.querySelector('main')
  main.innerHTML = ''

  const eventos = await fetchData({
    url: 'http://localhost:3000/api/v1/eventos'
  })

  pintarEventos(eventos, main, false)
}
