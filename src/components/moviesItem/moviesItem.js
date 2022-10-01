import React from 'react'
import { Image } from 'antd'

import getGenre from './getGenre'

const MoviesItem = (props) => {
  const opt = props.opt
  return (
    <li className="movies-item">
      <h2>{opt.title}</h2>
      <Image src={`${props.imgUrl}${opt.poster_path}`} />
      <p>{opt.overview}</p>
      <p>{opt.release_date}</p>
      <p>{opt.vote_average}</p>
      <p>{opt.popularity}</p>
      <p>{getGenre(opt.genre_ids).join(' ')}</p>
    </li>
  )
}

export default MoviesItem

/*
adult: false
backdrop_path: "/8rojfDL9ZzDEvt6ppCpan3WK3iy.jpg"
genre_ids: [53, 18]
id: 714676
original_language: "en"
original_title: "Alice"
overview: "Alice spends her days enslaved on a rural Georgia plantation restlessly yearning for freedom. After a violent clash with plantation owner Paul, Alice flees through the neighboring woods and stumbles onto the unfamiliar sight of a highway, soon discovers a shocking reality that lies beyond the tree line."
popularity: 62.734
poster_path: "/7akDcAHfp7Lkmuq2ygzNzOhWq8M.jpg"
release_date: "2022-03-18"
title: "Alice"
video: false
vote_average: 5.5
vote_count: 18
*/
