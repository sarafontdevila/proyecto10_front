import './Home.css'
import { fetchData } from '../../utils/api'
import { pintarEventos } from '../../components/PintarEventos/pintarEventos'

export const Home = async () => {
  const main = document.querySelector('main')
  main.innerHTML = ''

  const eventos = await fetchData({
    url: 'https://proyecto10-full-stack-js-gwfa.vercel.app/api/v1/eventos'
  })

  pintarEventos(eventos, main, false)
}
