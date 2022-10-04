import React from 'react'
import { Image, Rate } from 'antd'

import getGenre from './getGenre'
import './style.scss'

const MoviesItem = (props) => {
  const opt = props.opt
  // console.log(opt)
  return (
    <li className="movies-item">
      <h2 className="movies-item__title">{opt.title}</h2>
      <Image className="movies-item__img" src={`${props.imgUrl}${opt.poster_path}`} />
      <p className="movies-item__overview">{opt.overview}</p>
      <p className="movies-item__release-date">{opt.release_date}</p>
      {/* <p className="movies-item__vote-average">{opt.vote_average}</p> */}
      <Rate className="movies-item__vote-avegare" disabled value={opt.vote_average} count={10} allowHalf={true} />
      <p className="movies-item__popularity">{opt.popularity}</p>
      <p className="movies-item__genre">{getGenre(opt.genre_ids).join(' ')}</p>
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
