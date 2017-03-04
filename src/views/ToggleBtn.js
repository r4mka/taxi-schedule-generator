import React from 'react'

export default class ToggleBtn extends React.PureComponent {
  render () {
    return (
      <label className='control'>
        <input
          type='checkbox'
          name={this.props.name}
          disabled={this.props.disabled}
          checked={this.props.toggle}
          onChange={(e) => this.props.onToggle(e)} />
        <img
          className='control_indicator_img'
          src={this.props.icon} />
      </label>
    )
  }
}

ToggleBtn.propTypes = {
  name:     React.PropTypes.string,
  icon:     React.PropTypes.string,
  disabled: React.PropTypes.bool,
  toggle:   React.PropTypes.bool,
  onToggle: React.PropTypes.func
}

ToggleBtn.defaultProps = {
  disabled: false,
  toggle:   true,
  onToggle: () => {}
}
