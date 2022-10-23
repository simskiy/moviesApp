import React from 'react'
import { Input } from 'antd'
import { debounce } from 'lodash'

import ErrorIndicator from '../errorIndikator/errorIndicator'
import Load from '../load/load'
import MoviesList from '../moviesList/moviesList'

const SearchPage = (props) => {
  const { moviesArr, imgUrl, loading, error, minIndex, maxIndex, firstSearch, changeRate, getMovies } = props

  const hasData = !(error || loading)
  const errorMessage = error ? <ErrorIndicator /> : null
  const spinner = loading ? <Load /> : null
  const contentSearch = hasData ? (
    <MoviesList
      moviesList={moviesArr.slice(minIndex, maxIndex)}
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
    </>
  )
}

export default SearchPage
