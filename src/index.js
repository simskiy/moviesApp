import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './components/app/app'
import SearchMovies from './components/app/utils/SearchMovies'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

const movies = new SearchMovies()
movies.findMovies('Джек Ричер').then((movies) => {
  movies.forEach((movie) => console.log(movie.title))
})
