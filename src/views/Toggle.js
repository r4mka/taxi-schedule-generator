import React from 'react'

export default class Toggle extends React.Component {
  constructor (props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick (event) {
    event.preventDefault()
    this.props.onClick()
  }

  render () {
    const className = [
      'switch',
      (this.props.on ? 'on ' : '')
    ].join(' ')
    
    return (
      <div className={className} onClick={this.handleClick}>
        <div className='switch-toggle' />
      </div>
    )
  }
}

Toggle.propTypes = {
  on:      React.PropTypes.bool,
  onClick: React.PropTypes.func
}

Toggle.defaultProps = {
  on:      true,
  onClick: () => {}
}
