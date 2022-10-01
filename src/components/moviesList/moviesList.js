import React from 'react'
// import { List } from 'antd'

import MoviesItem from '../moviesItem/moviesItem'

const MoviesList = (props) => {
  // const getImg = props.getImg
  return (
    <ul>
      {props.moviesList.map((movieItem, ind) => (
        <MoviesItem key={ind} opt={movieItem} imgUrl={props.imgUrl} />
      ))}
    </ul>
  )
}

export default MoviesList
