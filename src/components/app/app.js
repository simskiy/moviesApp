import React, { Component } from 'react'
import 'antd/dist/antd.css'
import { Input } from 'antd'

import MoviesList from '../moviesList/moviesList'
import getResource from '../../utils/GetResource'

export default class App extends Component {
  constructor() {
    super()
    this.movies = new getResource()
    this.state = {
      moviesArr: [],
      imgUrl: null,
    }
  }

  componentDidMount() {
    this.movies.getConfig().then((item) => {
      const result = `${item.images.base_url}${item.images.poster_sizes[2]}`
      this.setState(() => {
        return {
          imgUrl: result,
        }
      })
    })
  }

  getMovies = (str) => {
    this.movies.findMovies(str).then((movies) => {
      const newMovies = []
      movies.forEach((movie) => {
        newMovies.push(movie)
      })
      this.setState({
        moviesArr: newMovies,
      })
    })
  }

  render() {
    console.log(this.state)
    return (
      <div className="container">
        <Input placeholder="Type to search..." onPressEnter={(e) => this.getMovies(e.target.value)} />
        <MoviesList moviesList={this.state.moviesArr} config={this.state} imgUrl={this.state.imgUrl} />
      </div>
    )
  }
}
