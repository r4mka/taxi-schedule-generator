import React      from 'react'
import Toggle     from './Toggle'
import AppActions from '../actions/AppActions'

export default class DriverTogglePanel extends React.Component {
  constructor (props) {
    super(props)
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  handleInputChange (event) {
    const target = event.target
    const name   = target.name

    switch (name) {
      case 'dailyAcitivty':
        console.log('dailyActivity: ' + target.checked)
        AppActions.toggleDriverDailyActivity(this.props.driverId)
        break

      case 'nocturnalActivity':
        console.log('nocturnalActivity: ' + target.checked)
        AppActions.toggleDriverNocturnalActivity(this.props.driverId)
        break

      case 'remove':
        console.log('removeActivity: ' + target.checked)
        // not specified how should work
        break
    }
  }

  render () {
    return (
      <div className='toggle-panel-container'>
        <Toggle
          on={this.props.generalActivity}
          onClick={() => AppActions.toggleGeneralActivity(this.props.driverId)} />
        <label className='control'>
          <input
            type='checkbox'
            name='dailyAcitivty'
            checked={this.props.dailyAcitivty}
            onChange={this.handleInputChange} />
          <img
            className='control_indicator_img'
            src='app/assets/sunny.svg' />
        </label>
        <label className='control'>
          <input
            type='checkbox'
            name='nocturnalActivity'
            checked={this.props.nocturnalActivity}
            onChange={this.handleInputChange} />
          <img
            style={{marginBottom: 2}}
            className='control_indicator_img'
            src='app/assets/moon.svg' />
        </label>
        <label
          style={this.props.deleteBtn ? {} : {display: 'none'}}
          className='control'>
          <input
            type='checkbox'
            name='delete'
            onChange={this.handleInputChange} />
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

DriverTogglePanel.propTypes = {
  driverId:          React.PropTypes.number.isRequired,
  generalActivity:   React.PropTypes.bool,
  dailyAcitivty:     React.PropTypes.bool,
  nocturnalAcitivty: React.PropTypes.bool,
  deleteBtn:         React.PropTypes.bool,
  infoBtn:           React.PropTypes.bool
}

DriverTogglePanel.defaultProps = {
  generalActivity:   true,
  dailyAcitivty:     true,
  nocturnalAcitivty: true,
  deleteBtn:         false,
  infoBtn:           true
}
