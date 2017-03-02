import React from 'react'

export default class ToggleSwitch extends React.Component {
  render () {
    const className = [
      'switch',
      (this.props.toggle ? 'on ' : '')
    ].join(' ')
    
    return (
      <div className={className} onClick={() => this.props.onToggle()}>
        <div className='switch-toggle' />
      </div>
    )
  }
}

ToggleSwitch.propTypes = {
  toggle:   React.PropTypes.bool,
  onToggle: React.PropTypes.func
}

ToggleSwitch.defaultProps = {
  toggle:   true,
  onToggle: () => {}
}
