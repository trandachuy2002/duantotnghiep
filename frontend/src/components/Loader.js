import React from 'react'

const Loader = () => {
  return (
    <div
      className="loader"
      style={ {
        width: '3vw',
        height: '3vw',
        margin: 'auto',
        display: 'block',
        position: 'fixed',
        top: '50%',
        left: '50%',
        zIndex: '10000',
      } }></div>
  )
}

export default Loader
