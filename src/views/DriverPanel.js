import React             from 'react'
import DriverTogglePanel from './DriverTogglePanel'

export default class DriverPanel extends React.Component {
  render () {
    return (
      <div className='driver-panel'>
        <div className='left'>
          <span className='number'>{this.props.driver.id}</span>
        </div>
        <div className='right'>
          <DriverTogglePanel
            driverId={this.props.driver.id}
            generalActivity={this.props.driver.generalActivity}
            dailyActivity={this.props.driver.dailyActivity}
            nocturnalActivity={this.props.driver.nocturnalActivity} />
        </div>
      </div>
    )
  }
}

// maybe better object validation is required here?
DriverPanel.propTypes = {
  driver: React.PropTypes.object.isRequired
}
