import { Spin } from 'antd'
import React from 'react'
import './style.scss'

const Load = () => {
  return (
    <div className="movies-load">
      <Spin size="large" tip="loading..." />
    </div>
  )
}

export default Load
