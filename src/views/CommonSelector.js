import React from 'react'

export default class CommonSelector extends React.Component {
  render () {
    return (
      <div
        style={{marginBottom: 23.3}}
        className='select'>
        <select
          required
          name={this.props.name}
          value={this.props.value}
          onChange={this.props.onChange}>
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
