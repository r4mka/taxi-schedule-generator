import React from 'react'

export default class CommonSelector extends React.Component {
  render () {
    return (
      <div
        style={{marginBottom: 23.3}}
        className='select'>
        <select
          required
          value={this.props.value}
          onChange={(e) => this.props.onChange(e.target.value)}>
          <option disabled selected hidden value=''>
            {this.props.placeholder}
          </option>
          {
            this.props.options.map((option) =>
              <option
                key={option}
                value={option}>
                {option}
              </option>
            )
          }
        </select>
        <img
          src='./app/assets/strzalki.svg'
          className='select-arrow' />
      </div>
    )
  }
}
