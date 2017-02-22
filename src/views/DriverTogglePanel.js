import React      from 'react'
import Toggle     from './Toggle'
// import AppActions from '../actions/AppActions'

export default class DriverTogglePanel extends React.Component {
  render () {
    return (
      <div className='toggle-panel-container'>
        <Toggle
          on={this.props.generalActivity}
          onClick={this.props.onToggle} />
        <label className='control'>
          <input
            type='checkbox'
            name='dailyActivity'
            checked={this.props.dailyActivity}
            onChange={(e) => this.props.onToggle(e)} />
          <img
            className='control_indicator_img'
            src='app/assets/sunny.svg' />
        </label>
        <label className='control'>
          <input
            type='checkbox'
            name='nocturnalActivity'
            checked={this.props.nocturnalActivity}
            onChange={(e) => this.props.onToggle(e)} />
          <img
            style={{marginBottom: 2}}
            className='control_indicator_img'
            src='app/assets/moon.svg' />
        </label>

      </div>
    )
  }
}

DriverTogglePanel.propTypes = {
  generalActivity:   React.PropTypes.bool,
  dailyActivity:     React.PropTypes.bool,
  nocturnalAcitivty: React.PropTypes.bool,
  deleteBtn:         React.PropTypes.bool,
  infoBtn:           React.PropTypes.bool,
  onToggle:          React.PropTypes.func.isRequired
}

DriverTogglePanel.defaultProps = {
  generalActivity:   true,
  dailyActivity:     true,
  nocturnalAcitivty: true,
  deleteBtn:         false,
  infoBtn:           true
}
