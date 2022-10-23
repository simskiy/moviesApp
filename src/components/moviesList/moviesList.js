import React from 'react'

import MoviesItem from '../moviesItem/moviesItem'

import './style.scss'

const MoviesList = (props) => {
  if (props.moviesList.length === 0 && !props.firstSearch) {
    return <p className="movies-list--empty">К сожалению ничего не найдено</p>
  } else
    return (
      <ul className="movies-list">
        {props.moviesList.map((movieItem, ind) => (
          <MoviesItem
            key={movieItem.id}
            opt={movieItem}
            imgUrl={props.imgUrl}
            rate={movieItem.rate}
            changeRate={props.changeRate}
            ind={ind}
          />
        ))}
      </ul>
    )
}

export default MoviesList
