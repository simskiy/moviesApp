import React, { Component } from 'react'

import BtnDott from '../btn-dotted/btn-dotted'

export default class Overview extends Component {
  state = {
    isPressedText: false,
  }

  componentDidMount() {
    if (this.props.text.split(' ').length > this.props.numWords) {
      this.setState({
        isPressedText: true,
      })
    }
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

    if (this.state.isPressedText) {
      out = `${textArr.slice(0, numWords).join(' ')}\u00A0`
    }

    return (
      <p className="movies-item__overview">
        {out}
        {this.state.isPressedText ? <BtnDott toggleOverview={this.toggleOverview} /> : null}
      </p>
    )
  }
}
