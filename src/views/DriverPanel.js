import React             from 'react'
import DriverTogglePanel from './DriverTogglePanel'
import AppActions        from '../actions/AppActions'

export default class DriverPanel extends React.Component {
  constructor (props) {
    super(props)
    this.handleInputChange = this.handleInputChange.bind(this)
  }

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

  handleInputChange (event) {
    if (event) {
      const target = event.target
      const name   = target.name

      switch (name) {
        case 'dailyActivity':
          console.log('dailyActivity: ' + target.checked)
          AppActions.toggleDriverDailyActivity(this.props.driver.id)
          break

        case 'nocturnalActivity':
          console.log('nocturnalActivity: ' + target.checked)
          AppActions.toggleDriverNocturnalActivity(this.props.driver.id)
          break

        case 'remove':
          console.log('removeActivity: ' + target.checked)
          // not specified how should work
          break
      }
    } else {
      AppActions.toggleDriverGeneralActivity(this.props.driver.id)
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
            generalActivity={this.props.driver.generalActivity}
            dailyActivity={this.props.driver.dailyActivity}
            nocturnalActivity={this.props.driver.nocturnalActivity}
            onToggle={this.handleInputChange} />
        </div>
      </div>
    )
  }
}

// maybe better object validation is required here?
DriverPanel.propTypes = {
  driver:  React.PropTypes.object.isRequired,
  onClick: React.PropTypes.func.isRequired
}

DriverPanel.defaultProps = {
  onClick: () => {}
}
