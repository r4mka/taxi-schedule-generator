import React             from 'react'
import DriverTogglePanel from './DriverTogglePanel'

export default class DriverPanel extends React.Component {
  padNumber (num) {
    if (num < 100) {
      if (num < 10) {
        return '00' + num
      } else {
        return '0' + num
      }
    } else {
      return num
    }
  }

  render () {
    return (
      <div className='driver-panel'>
        <div
          className='left'
          onClick={() => this.props.onClick()}>
          <span className='number'>{this.padNumber(this.props.driver.id)}</span>
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
  driver:  React.PropTypes.object.isRequired,
  onClick: React.PropTypes.func
}

DriverPanel.defaultProps = {
  onClick: () => {}
}
