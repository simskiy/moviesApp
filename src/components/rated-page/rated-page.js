import React, { Component } from 'react'
import { Pagination } from 'antd'

import MoviesList from '../moviesList/moviesList'
import ErrorIndicator from '../errorIndikator/errorIndicator'

export default class RatedPaged extends Component {
  state = {
    curr: 1,
    minIndex: 0,
    maxIndex: 0,
  }

  pageSize = 6

  componentDidMount() {
    this.setState({
      minIndex: 0,
      maxIndex: this.pageSize,
    })
  }

  paginationChange = (page) => {
    this.setState({
      curr: page,
      minIndex: (page - 1) * this.pageSize,
      maxIndex: page * this.pageSize,
    })
  }

  render() {
    const { moviesArr } = this.props
    const hasData = !(this.props.error || this.props.loading)
    const errorMessage = this.props.error ? <ErrorIndicator /> : null
    const contentRate = hasData ? (
      <MoviesList
        moviesList={moviesArr ? moviesArr.slice(this.state.minIndex, this.state.maxIndex) : null}
        imgUrl={this.props.imgUrl}
        guestId={this.props.guestId}
      />
    ) : null
    return (
      <>
        {contentRate}
        {errorMessage}
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
