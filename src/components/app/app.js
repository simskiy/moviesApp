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
    this.movies.getGuestId().then((id) => {
      this.setState({
        guestId: id,
      })
    })
    this.movies.getGenres().then((item) => {
      this.setState({
        genres: item,
        imgUrl: 'https://image.tmdb.org/t/p/w500/',
        minIndex: 0,
        maxIndex: this.pageSize,
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
          error: false,
          moviesArr: newMovies,
          loading: false,
        })
      })
      .catch((error) => {
        this.onError(error)
      })
  }

  changeRate = (id, rate) => {
    const newMoviesArr = this.state.moviesArr
    this.setState(() => {
      newMoviesArr.map((item) => {
        if (item.id === id) item.rate = rate
      })
      return {
        moviesArr: newMoviesArr,
        moviesRated: this.addRatedMovies(id, rate),
      }
    })
  }

  addRatedMovies(id, rate) {
    const newMoviesRated = this.state.moviesRated
    const ind = newMoviesRated.findIndex((item) => item.id === id)
    if (ind > -1) {
      newMoviesRated[ind] = { id: id, rate: rate }
    } else {
      newMoviesRated.push({ id: id, rate: rate })
    }
    return newMoviesRated
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.moviesArr !== this.state.moviesArr) {
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
                  />
                ),
              },
              {
                label: 'Rated',
                key: '2',
                children: (
                  <RatedPage imgUrl={imgUrl} loading={loading} error={error} moviesArr={this.state.moviesRated} />
                ),
              },
            ]}
          />
        </GenreProvider>
      </div>
    )
  }
}
