import React, { Component } from 'react'

import BtnDott from '../btn-dotted/btn-dotted'

export default class Overview extends Component {
  state = {
    isPressedText: false,
  }

  toggleOverview = () => {
    const newValue = !this.state.isPressedText
    this.setState(() => {
      return {
        isPressedText: newValue,
      }
    })
  }

  render() {
    const { text, numWords } = this.props
    const textArr = text.split(' ')
    let out = text

    if (this.props.text.split(' ').length > this.props.numWords) {
      out = (
        <>
          `${textArr.slice(0, numWords).join(' ')}` <BtnDott toggleOverview={this.toggleOverview} />
        </>
      )
    }

    return <p className="movies-item__overview">{out}</p>
  }
}
