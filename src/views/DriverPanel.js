import React             from 'react'
import DriverTogglePanel from './DriverTogglePanel'

export default class DriverPanel extends React.Component {
  render () {
    return (
      <div className='driver-panel'>
        <div className='left'>
          <span className='number'>001</span>
        </div>
        <div className='right'>
          <DriverTogglePanel />
        </div>
      </div>
    )
  }
}
