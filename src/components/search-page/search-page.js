import React, { Component } from 'react'
import { Pagination, Input } from 'antd'
import { debounce } from 'lodash'

import ErrorIndicator from '../errorIndikator/errorIndicator'
import Load from '../load/load'
import MoviesList from '../moviesList/moviesList'

export default class SearchPage extends Component {
  state = {
    curr: 1,
    minIndex: 0,
    maxIndex: this.pageSize,
  }

  pageSize = 6

  paginationChange = (page) => {
    this.setState({
      curr: page,
      minIndex: (page - 1) * this.pageSize,
      maxIndex: page * this.pageSize,
    })
  }

  render() {
    const { moviesArr, imgUrl, loading, error, firstSearch, changeRate, getMovies } = this.props

    const hasData = !(error || loading)
    const errorMessage = error ? <ErrorIndicator /> : null
    const spinner = loading ? <Load /> : null
    const contentSearch = hasData ? (
      <MoviesList
        moviesList={moviesArr.slice(this.state.minIndex, this.state.maxIndex)}
        imgUrl={imgUrl}
        firstSearch={firstSearch}
        changeRate={changeRate}
      />
    ) : null

    return (
      <>
        <Input
          placeholder="Type to search..."
          onChange={debounce((e) => {
            getMovies(e.target.value)
          }, 500)}
          allowClear
          autoFocus
        />
        {spinner}
        {errorMessage}
        {contentSearch}
        {moviesArr.length ? (
          <Pagination
            className="movies-pagination"
            pageSize={this.pageSize}
            current={this.state.curr}
            total={moviesArr.length}
            onChange={this.paginationChange}
          />
        ) : null}
      </>
    )
  }
}
