import React from 'react'

export default class ToggleSwitch extends React.PureComponent {
  render () {
    const className = [
      'switch',
      (this.props.toggle ? 'on ' : '')
    ].join(' ')
    
    return (
      <div className={className} onClick={(e) => this.props.onToggle(e)}>
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
