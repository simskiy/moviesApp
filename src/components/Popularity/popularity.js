/* eslint-disable indent */
/* eslint-disable prettier/prettier */
import React from 'react'

const Popularity = (props) => {
  let color = null
  const vote = props.vote
  switch (true) {
    case vote >= 0 && vote < 3: color = '#E90000'; break
    case vote >= 3 && vote < 5: color = '#E97E00'; break
    case vote >= 5 && vote < 7: color = '#E9D100'; break
    case vote >= 7: color = '#66E900'; break
    default: color = 'black'; break
  }

  return (
    <p className="movies-item__popularity" style={{borderColor: color}} >
      {vote}
    </p>
  )
}

export default Popularity
