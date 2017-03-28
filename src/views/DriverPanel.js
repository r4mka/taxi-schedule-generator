import React                     from 'react'
import {Tooltip, OverlayTrigger} from 'react-bootstrap'
import AppActions                from '../actions/AppActions'
import ToggleSwitch              from './ToggleSwitch'
import ToggleBtn                 from './ToggleBtn'
import utils                     from '../utils'

export default class DriverPanel extends React.Component {
  constructor (props) {
    super(props)
    this.handleToggleSwitch = this.handleToggleSwitch.bind(this)
    this.handleToggleBtn = this.handleToggleBtn.bind(this)
  }

  handleToggleSwitch (event) {
    event.preventDefault()
    const driver = {
      _id:             this.props.driver._id,
      generalActivity: !this.props.driver.generalActivity
    }
    AppActions.updateDriver(driver)
  }

  handleToggleBtn (event) {
    event.preventDefault()
    const target = event.target
    const name   = target.name
    const driver = {
      _id: this.props.driver._id
    }
    switch (name) {
      case 'dailyActivity':
        driver.dailyActivity = !this.props.driver.dailyActivity
        break

      case 'nocturnalActivity':
        driver.nocturnalActivity = !this.props.driver.nocturnalActivity
        break
    }

    AppActions.updateDriver(driver)
  }

  render () {
    const tip = <Tooltip id='tooltip'>{this.props.driver.notes}</Tooltip>
    let infoTooltip

    if (this.props.driver.notes.trim().length > 0) {
      infoTooltip = (
        <OverlayTrigger placement='right' overlay={tip}>
          <img
            className=''
            src='app/assets/info.svg' />
        </OverlayTrigger>
      )
    } else {
      infoTooltip = (
        <img
          style={{opacity: '0.2'}}
          src='app/assets/info.svg' />
      )
    }

    return (
      <div className='driver-panel'>
        <div
          className='left'
          onClick={() => this.props.onClick()}>
          <span
            className='number'
            style={this.props.driver.generalActivity === false ? {color: '#9B9B9B'} : {}}>
            {utils.padNumber(this.props.driver.id)}
          </span>
          <div
            className='driver-status'
            style={this.props.driver.status !== 'pracuje'
            ? {}
            : {display: 'none'}}>
            {this.props.driver.status}
          </div>
        </div>
        <div className='right toggle-panel-container'>
          <ToggleSwitch
            toggle={this.props.driver.generalActivity}
            onToggle={this.handleToggleSwitch} />
          <ToggleBtn
            name='dailyActivity'
            icon='app/assets/sunny.svg'
            toggle={this.props.driver.dailyActivity}
            onToggle={this.handleToggleBtn} />
          <ToggleBtn
            name='nocturnalActivity'
            icon='app/assets/moon.svg'
            toggle={this.props.driver.nocturnalActivity}
            onToggle={this.handleToggleBtn} />
          {infoTooltip}
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
