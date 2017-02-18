import React from 'react'

export default class CommonSelector extends React.Component {
  render () {
    return (
      <div className='selector'>
        <h3>
          {this.props.header}
        </h3>
        <div className='select'>
          <select required>
            <option disabled selected hidden
              value=''>
              {this.props.placeholder}
            </option>
            <option>First select</option>
            <option>Option</option>
            <option>Option</option>
          </select>
          <img src='./app/assets/strzalki.svg' className='select-arrow' />
        </div>
      </div>
    )
  }
}
