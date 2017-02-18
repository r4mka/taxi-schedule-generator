import React from 'react'

export default class NotePad extends React.Component {
  render () {
    let header = null
    if (this.props.header) {
      header = <h3>{this.props.header}</h3>
    }

    return (
      <div>
        {header}
        <textarea
          style={this.props.style}
          placeholder={this.props.placeholder} />
      </div>
    )
  }
}
