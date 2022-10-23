import React, { Component } from 'react'
import { Image, Rate, Spin } from 'antd'
import { parse, format } from 'date-fns'

import Overview from '../overview/overview'
import BtnDott from '../btn-dotted/btn-dotted'

import getGenre from './getGenre'
import fallback from './fallback.svg'
import './style.scss'

export default class MoviesItem extends Component {
  showOverview = (text, numWords) => {
    const textArr = text.split(' ')
    let out = text
    if (textArr.length > numWords) {
      out = `${textArr.slice(0, numWords).join(' ')}\u00A0`
      this.setState({
        isPressedText: true,
      })
    } else {
      this.setState({
        isPressedText: false,
      })
    }

    return (
      <p className="movies-item__overview">
        {out}
        {this.state.isPressedText ? <BtnDott /> : null}
      </p>
    )
  }

  convertDate(date) {
    try {
      const convertDate = parse(date, 'yyyy-MM-dd', new Date())
      return format(convertDate, 'MMMM d, yyyy')
    } catch (e) {
      return 'Неизвестно'
    }
  }

  render() {
    const { opt, rate, changeRate, ind } = this.props
    const srcImg = opt.poster_path ? `${this.props.imgUrl}${opt.poster_path}` : fallback
    return (
      <li className="movies-item">
        <h2 className="movies-item__title">{opt.title}</h2>
        <Image
          rootClassName="movies-item__img"
          className={srcImg === fallback ? 'noImage' : null}
          src={srcImg}
          loading="lazy"
          placeholder={
            <div className="spin">
              <Spin size="large" />
            </div>
          }
        />
        <p className="movies-item__release-date">{this.convertDate(opt.release_date)}</p>
        <CreateListGenre genres={opt.genre_ids} />
        <Overview text={opt.overview} numWords={35} />
        <Rate
          className="movies-item__vote-average"
          count={10}
          allowHalf={true}
          value={rate}
          onChange={(value) => changeRate(ind, value)}
        />
        <p className="movies-item__popularity">{opt.vote_average}</p>
      </li>
    )
  }
}

const CreateListGenre = (props) => {
  const genres = getGenre(props.genres)
  const list = genres.map((item, ind) => {
    return <CreateItemGenre item={item} key={ind} />
  })
  return <ul className="movies-item__genre">{list}</ul>
}

const CreateItemGenre = (props) => {
  return <li className="movies-item__genre-item">{props.item}</li>
}

// export default MoviesItem

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
