import React, { Component } from 'react'
import 'antd/dist/antd.css'
import { Input, Pagination } from 'antd'

import MoviesList from '../moviesList/moviesList'
import getResource from '../../utils/GetResource'
import Load from '../load/load'

import './style.scss'

export default class App extends Component {
  constructor() {
    super()
    this.movies = new getResource()
  }
  state = {
    moviesArr: [],
    imgUrl: null,
    loading: false,
    error: false,
  }

  componentDidMount() {
    this.movies.getConfig().then((item) => {
      const result = `${item.images.base_url}${item.images.poster_sizes[2]}`
      this.setState({
        imgUrl: result,
      })
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
          moviesArr: newMovies,
          loading: false,
        })
      })
      .catch(this.onError)
  }

  render() {
    const { moviesArr, imgUrl, loading, error } = this.state
    const spinner = loading ? <Load /> : null
    return (
      <div className="movies-container">
        <Input
          placeholder="Type to search..."
          onPressEnter={(e) => {
            this.getMovies(e.target.value)
          }}
          allowClear
          autoFocus
        />
        {spinner}
        <MoviesList moviesList={moviesArr} imgUrl={imgUrl} />
        <Pagination responsive={true} />
      </div>
    )
  }
}
