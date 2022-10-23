import React, { Component } from 'react'
import 'antd/dist/antd.css'
import { Input, Pagination } from 'antd'
import { debounce } from 'lodash'

import MoviesList from '../moviesList/moviesList'
import getResource from '../../utils/GetResource'
import Load from '../load/load'
import './style.scss'
import ErrorIndicator from '../errorIndikator/errorIndicator'

export default class App extends Component {
  constructor() {
    super()
    this.movies = new getResource()
  }
  state = {
    moviesArr: [],
    moviesRated: [],
    imgUrl: null,
    loading: false,
    error: false,
    totalPage: 0,
    curr: 1,
    minIndex: 0,
    maxIndex: 0,
    firstSearch: true,
  }

  pageSize = 6

  componentDidMount() {
    this.setState({
      imgUrl: 'https://image.tmdb.org/t/p/w500/',
      minIndex: 0,
      maxIndex: this.pageSize,
    })
  }

  onError = () => {
    this.setState({
      error: true,
    })
  }

  getMovies = (str) => {
    this.setState({
      loading: true,
    })

    this.movies
      .findMovies(str)
      .then((movies) => {
        const newMovies = []
        movies.forEach((movie) => {
          newMovies.push(movie)
        })
        this.setState({
          error: false,
          moviesArr: newMovies,
          loading: false,
        })
      })
      .catch((error) => {
        this.onError(error)
      })
  }
  changeRate = (ind, value) => {
    const newMoviesArr = this.state.moviesArr
    this.setState(() => {
      newMoviesArr.map((item, index) => {
        if (index === ind) item.rate = value
      })
      return newMoviesArr
    })
  }

  handleChange = (page) => {
    this.setState({
      curr: page,
      minIndex: (page - 1) * this.pageSize,
      maxIndex: page * this.pageSize,
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.moviesArr !== this.state.moviesArr) {
      this.setState({
        firstSearch: false,
      })
    }
  }

  render() {
    const { moviesArr, imgUrl, loading, error, curr, minIndex, maxIndex, firstSearch } = this.state
    const hasData = !(error || loading)
    const errorMessage = error ? <ErrorIndicator /> : null
    const spinner = loading ? <Load /> : null
    const content = hasData ? (
      <MoviesList
        moviesList={moviesArr.slice(minIndex, maxIndex)}
        imgUrl={imgUrl}
        firstSearch={firstSearch}
        changeRate={this.changeRate}
      />
    ) : null
    return (
      <div className="movies-container">
        <Input
          placeholder="Type to search..."
          onChange={debounce((e) => {
            this.getMovies(e.target.value)
          }, 500)}
          allowClear
          autoFocus
        />
        {spinner}
        {errorMessage}
        {content}
        {moviesArr.length ? (
          <Pagination
            className="movies-pagination"
            pageSize={this.pageSize}
            current={curr}
            total={moviesArr.length}
            onChange={this.handleChange}
          />
        ) : null}
      </div>
    )
  }
}
