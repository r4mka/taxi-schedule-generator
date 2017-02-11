import React from 'react'
import Switch from 'react-toggle-switch'

export default class Driver extends React.Component {
  render () {
    return (
      <div className='driverPane'>
        <div className='driverPaneLeft'>
          <span className='driverNumber'>001</span>
        </div>
        <div className='driverPaneRight'>
          <Switch />
          <img
            src='app/assets/sunny.svg'
            className='driverPanelIcon'
            style={{marginLeft: 15}} />
          <img
            src='app/assets/moon.svg'
            className='driverPanelIcon'
            style={{marginLeft: 20, marginTop: 3, marginBottom: 3}} />
          <img
            src='app/assets/info.svg'
            className='driverPanelIcon'
            style={{marginLeft: 12, marginTop: 4, marginBottom: 4}} />
        </div>
      </div>
    )
  }
}
