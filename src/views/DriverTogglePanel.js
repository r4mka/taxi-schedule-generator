import React                     from 'react'
import Toggle                    from './Toggle'
import {Tooltip, OverlayTrigger} from 'react-bootstrap'

export default class DriverTogglePanel extends React.Component {
  render () {
    let tip         = null
    let infoTooltip = null
    let deleteBtn   = null

    if (this.props.infoTooltip) {
      tip = (
        <Tooltip id='tooltip'>{this.props.driverNotes}</Tooltip>
      )
      if (this.props.driverNotes.trim().length > 0) {
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
    }

    if (this.props.deleteBtn) {
      deleteBtn = (
        <label className='control'>
          <input
            type='button'
            name='deleteDriver'
            onChange={(e) => this.props.onToggle(e)} />
          <img
            className='control_indicator_img'
            src='app/assets/delete.svg' />
        </label>
      )
    }

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
        {infoTooltip}
        {deleteBtn}
      </div>
    )
  }
}

DriverTogglePanel.propTypes = {
  generalActivity:   React.PropTypes.bool.isRequired,
  dailyActivity:     React.PropTypes.bool.isRequired,
  nocturnalAcitivty: React.PropTypes.bool.isRequired,
  onToggle:          React.PropTypes.func.isRequired,
  deleteBtn:         React.PropTypes.bool,
  infoTooltip:       React.PropTypes.bool,
  driverNotes:       React.PropTypes.string
}

DriverTogglePanel.defaultProps = {
  generalActivity:   true,
  dailyActivity:     true,
  nocturnalAcitivty: true,
  deleteBtn:         false,
  infoTooltip:       false
}
