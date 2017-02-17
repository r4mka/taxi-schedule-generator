import React  from 'react'
import Switch from 'react-toggle-switch'

export default class DriverTogglePanel extends React.Component {
  render () {
    return (
      <div className='togglePanelContainer'>
        <Switch
          style={{marginRight: 12}} />
        <label className='control'>
          <input
            type='checkbox' />
          <img
            className='control_indicator_img'
            src='app/assets/sunny.svg' />
        </label>
        <label className='control'>
          <input
            type='checkbox' />
          <img
            style={{marginBottom: 2}}
            className='control_indicator_img'
            src='app/assets/moon.svg' />
        </label>
        <label
          style={this.props.deleteBtn ? {} : {display: 'none'}}
          className='control'>
          <input
            type='checkbox' />
          <img
            style={{marginBottom: 2}}
            className='control_indicator_img'
            src='app/assets/delete.svg' />
        </label>
        <label
          style={this.props.infoBtn ? {} : {display: 'none'}}
          className='control'>
          <input
            type='checkbox' />
          <img
            style={{marginBottom: 1}}
            className='control_indicator_img'
            src='app/assets/info.svg' />
        </label>
      </div>
    )
  }
}

DriverTogglePanel.defaultProps = {
  deleteBtn: false,
  infoBtn:   true
}
