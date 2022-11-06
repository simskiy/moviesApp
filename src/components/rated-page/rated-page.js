import React, { Component } from 'react'
import { Pagination } from 'antd'

import MoviesList from '../moviesList/moviesList'

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
    console.log(moviesArr)
    return (
      <>
        <MoviesList
          moviesList={moviesArr.slice(this.state.minIndex, this.state.maxIndex)}
          imgUrl={this.props.imgUrl}
          // firstSearch={firstSearch}
          // changeRate={changeRate}
          // setGuestRate={setGuestRate}
          guestId={this.props.guestId}
        />
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
