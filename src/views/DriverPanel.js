import React             from 'react'
import DriverTogglePanel from './DriverTogglePanel'

export default class DriverPanel extends React.Component {
  render () {
    return (
      <div className='driverPane'>
        <div className='driverPaneLeft'>
          <span className='driverNumber'>001</span>
        </div>
        <div className='driverPaneRight'>
          <DriverTogglePanel />
        </div>
      </div>
    )
  }
}
