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
          name={this.props.name}
          style={this.props.style}
          value={this.props.value}
          onChange={(e) => this.props.onChange(e)}
          placeholder={this.props.placeholder} />
      </div>
    )
  }
}
