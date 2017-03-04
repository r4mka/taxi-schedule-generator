import React      from 'react'
import AppActions from '../actions/AppActions'

export default class DutySelector extends React.Component {
  render () {
    return (
      <div className='selector'>
        <h3>
          {this.props.header}
        </h3>
        <div style={{marginTop: 12}}>
          <label style={{marginRight: 12}}>
            dyżury dzienne
          </label>
          <div className='select inline'>
            <input
              type='number'
              min='0'
              className='text-input'
              value={this.props.numberOfDriversPerAllDays}
              onChange={(e) => AppActions.setNumberOfDriversPerAllDays(e.target.value)}
              placeholder='Cały tydzień' />
          </div>
        </div>

        <div style={{marginTop: 12}}>
          <label style={{marginRight: 24}}>
            dyżury nocne
          </label>
          <div className='select inline' style={{marginRight: 12}}>
            <input
              type='number'
              min='0'
              className='text-input'
              value={this.props.numberOfDriversPerFridayNight}
              onChange={(e) => AppActions.setNumberOfDriversPerFridayNight(e.target.value)}
              placeholder='W piątki' />
          </div>
          <div className='select inline' style={{marginRight: 12}}>
            <input
              type='number'
              min='0'
              className='text-input'
              value={this.props.numberOfDriversPerSaturdayNight}
              onChange={(e) => AppActions.setNumberOfDriversPerSaturdayNight(e.target.value)}
              placeholder='W soboty' />
          </div>
          <div className='select inline'>
            <input
              type='number'
              min='0'
              className='text-input'
              value={this.props.numberOfDriversPerOtherNights}
              onChange={(e) => AppActions.setNumberOfDriversPerOtherNights(e.target.value)}
              placeholder='W tygodniu' />
          </div>
        </div>
      </div>
    )
  }
}
