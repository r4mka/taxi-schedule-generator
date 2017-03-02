import React from 'react'

export default class IconBtn extends React.Component {
  render () {
    return (
      <button
        style={{
          background: 'transparent',
          border:     'none',
          padding:    0
        }}
        className='icon-btn'
        disabled={this.props.disabled}
        onClick={this.props.onClick} >
        <img
          style={{verticalAlign: 'middle'}}
          src={this.props.icon} />
      </button>
    )
  }
}

IconBtn.propTypes = {
  icon:     React.PropTypes.string,
  onClick:  React.PropTypes.func,
  disabled: React.PropTypes.bool
}

IconBtn.defaultProps = {
  icon:     null,
  disabled: false,
  onClick:  () => {}
}
