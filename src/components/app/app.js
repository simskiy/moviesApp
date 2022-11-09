import React, { Component } from 'react'
import 'antd/dist/antd.css'
import { Tabs } from 'antd'

import SearchPage from '../search-page/search-page'
import getResource from '../../utils/GetResource'
import './style.scss'
import RatedPage from '../rated-page/rated-page'
import { GenreProvider } from '../genre-context/genre-context'

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
    firstSearch: true,
    genres: null,
    guestId: null,
  }

  componentDidMount() {
    this.movies
      .getGuestId()
      .then((id) => {
        this.setState({
          error: false,
          guestId: id,
        })
        return id
      })
      .then((id) => this.movies.getGuestRateMovies(id).then((item) => this.setState({ moviesRated: item })))
    this.movies
      .getGenres()
      .then((item) =>
        this.setState({
          error: false,
          genres: item,
          imgUrl: 'https://image.tmdb.org/t/p/w500/',
        })
      )
      .catch((err) => {
        console.log(`ошибка: ${err}`)
        this.onError(err)
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

  setGuestRate = (movieId, guestId, value) => {
    this.movies.setGuestRate(movieId, guestId, value).then((value) => value.success)
  }

  getGuestRateMovies = (guestId) => {
    return this.movies.getGuestRateMovies(guestId).then((value) => value)
  }

  changeRate = (movie) => {
    this.setState(() => {
      return {
        moviesRated: this.addRatedMovies(movie),
      }
    })
  }

  addRatedMovies(movie) {
    const newMoviesRated = this.state.moviesRated
    const ind = newMoviesRated.findIndex((item) => item.id === movie.id)
    if (ind > -1) {
      newMoviesRated[ind] = movie
    } else {
      newMoviesRated.push(movie)
    }
    return newMoviesRated
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.moviesArr !== this.state.moviesArr && this.state.error) {
      this.setState({
        firstSearch: false,
      })
    }
  }

  render() {
    const { moviesArr, imgUrl, loading, error, firstSearch } = this.state
    return (
      <div className="movies-container">
        <GenreProvider value={this.state.genres}>
          <Tabs
            defaultActiveKey="1"
            centered
            style={{ width: '100%' }}
            items={[
              {
                label: 'Search',
                key: '1',
                children: (
                  <SearchPage
                    imgUrl={imgUrl}
                    loading={loading}
                    error={error}
                    firstSearch={firstSearch}
                    moviesArr={moviesArr}
                    changeRate={this.changeRate}
                    getMovies={this.getMovies}
                    setGuestRate={this.setGuestRate}
                    guestId={this.state.guestId}
                  />
                ),
              },
              {
                label: 'Rated',
                key: '2',
                children: (
                  <RatedPage
                    imgUrl={imgUrl}
                    loading={loading}
                    error={error}
                    moviesArr={this.state.moviesRated}
                    getGuestRateMovies={this.getGuestRateMovies}
                    guestId={this.state.guestId}
                  />
                ),
              },
            ]}
          />
        </GenreProvider>
      </div>
    )
  }
}
