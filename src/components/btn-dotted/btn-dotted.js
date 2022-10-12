import React, { Component } from 'react'

export default class BtnDott extends Component {
  render() {
    return (
      <button
        className="movies-item__btn-dotted"
        onClick={() => {
          this.props.toggleOverview()
        }}
      >
        ...
      </button>
    )
  }
}
