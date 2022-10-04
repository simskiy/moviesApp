import React from 'react'

import MoviesItem from '../moviesItem/moviesItem'

import './style.scss'

const MoviesList = (props) => {
  // const getImg = props.getImg
  return (
    <ul className="movies-list">
      {props.moviesList.map((movieItem, ind) => (
        <MoviesItem key={ind} opt={movieItem} imgUrl={props.imgUrl} />
      ))}
    </ul>
  )
}

export default MoviesList
