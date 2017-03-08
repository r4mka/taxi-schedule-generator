import React          from 'react'
import ScheduleStore  from '../stores/ScheduleStore'
import DriversStore   from '../stores/DriversStore'
import AppActions     from '../actions/AppActions'
import CommonSelector from '../views/CommonSelector'

export default class ScheduleContainer extends React.Component {
  constructor (props) {
    super(props)

    this.state = this.getScheduleState()
    this._onChange = this._onChange.bind(this)
  }

  componentDidMount () {
    ScheduleStore.addChangeListener(this._onChange)
  }

  componentWillUnmount () {
    ScheduleStore.removeChangeListener(this._onChange)
  }

  _onChange () {
    this.setState(this.getScheduleState())
  }

  getScheduleState () {
    return {
      year:                            ScheduleStore.year,
      month:                           ScheduleStore.month,
      message:                         ScheduleStore.message,
      previousScheduleDriver:          ScheduleStore.previousScheduleDriver,
      numberOfDriversPerAllDays:       ScheduleStore.numberOfDriversPerAllDays,
      numberOfDriversPerFridayNight:   ScheduleStore.numberOfDriversPerFridayNight,
      numberOfDriversPerSaturdayNight: ScheduleStore.numberOfDriversPerSaturdayNight,
      numberOfDriversPerOtherNights:   ScheduleStore.numberOfDriversPerOtherNights,
      selectableMonths:                ScheduleStore.selectableMonths,
      selectableDriversIds:            DriversStore.selectableDriversIds
    }
  }

  render () {
    return (
      <div id='schedule-page'>
        <form id='schedule-form'>
          <h3>Miesiąc na który ma zostać utworzony grafik</h3>
          <input
            type='number'
            min='0'
            style={{width: 125, marginRight: 12}}
            className='text-input'
            value={this.state.year}
            onChange={(e) => AppActions.setScheduleYear(e.target.value)}
            placeholder='Wybierz rok' />
          <CommonSelector
            placeholder='Wybierz miesiąc'
            value={this.state.month}
            onChange={AppActions.setScheduleMonth}
            options={this.state.selectableMonths} />
          <hr />
          
          <h3>Kierowca który zamykał grafik w ubiegłym miesiącu</h3>
          <CommonSelector
            placeholder='Wybierz kierowcę'
            value={this.state.previousScheduleDriver}
            onChange={AppActions.setPreviousScheduleDriver}
            options={this.state.selectableDriversIds} />
          <hr />
          
          <h3>Liczba kierowców na poszczególnych dyżurach</h3>
          <div style={{marginTop: 12}}>
            <label style={{marginRight: 12}}>
              dyżury dzienne
            </label>
            <input
              type='number'
              min='0'
              style={{width: 140}}
              className='text-input'
              value={this.state.numberOfDriversPerAllDays}
              onChange={(e) => AppActions.setNumberOfDriversPerAllDays(e.target.value)}
              placeholder='Cały tydzień' />
          </div>
          <div style={{marginBottom: 11}}>
            <label style={{marginRight: 24}}>
              dyżury nocne
            </label>
            <input
              type='number'
              min='0'
              style={{width: 120, marginRight: 12}}
              className='text-input'
              value={this.state.numberOfDriversPerOtherNights}
              onChange={(e) => AppActions.setNumberOfDriversPerOtherNights(e.target.value)}
              placeholder='W tygodniu' />
            <input
              type='number'
              min='0'
              style={{width: 100, marginRight: 12}}
              className='text-input'
              value={this.state.numberOfDriversPerFridayNight}
              onChange={(e) => AppActions.setNumberOfDriversPerFridayNight(e.target.value)}
              placeholder='W piątki' />
            <input
              type='number'
              min='0'
              style={{width: 108}}
              className='text-input'
              value={this.state.numberOfDriversPerSaturdayNight}
              onChange={(e) => AppActions.setNumberOfDriversPerSaturdayNight(e.target.value)}
              placeholder='W soboty' />
          </div>
          <hr />

          <h3>Wiadomość dla kierowców</h3>
          <textarea
            style={{width: 488, height: 142}}
            value={this.state.message}
            onChange={(e) => AppActions.setScheduleMsg(e.target.value)}
            placeholder='Maksymalnie 220 znaków' />
        </form>
        <button
          className='round-btn'
          onClick={() => AppActions.showDriverDetails(null)}>
          <img src='app/assets/icon_drukuj.svg' />
        </button>
      </div>
    )
  }
}
