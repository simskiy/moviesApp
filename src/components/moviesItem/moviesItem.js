import React, { Component } from 'react'
import { Image, Rate, Spin } from 'antd'
import { parse, format } from 'date-fns'

import { GenreConsumer } from '../genre-context/genre-context'
import Overview from '../overview/overview'
import BtnDott from '../btn-dotted/btn-dotted'

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
    const { opt, rate, changeRate } = this.props
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
        <GenreConsumer>
          {(genresList) => {
            const genreTags = []
            opt.genre_ids.forEach((item) => {
              item in genresList ? genreTags.push(genresList[item]) : genreTags.push('none')
            })
            const list = genreTags.map((item, ind) => (
              <li className="movies-item__genre-item" key={ind}>
                {item}
              </li>
            ))
            return <ul className="movies-item__genre">{list}</ul>
          }}
        </GenreConsumer>
        <Overview text={opt.overview} numWords={35} />
        <Rate
          className="movies-item__vote-average"
          count={10}
          allowHalf={true}
          value={rate}
          onChange={(value) => changeRate(opt.id, value)}
        />
        <p className="movies-item__popularity">{opt.vote_average}</p>
      </li>
    )
  }
}
