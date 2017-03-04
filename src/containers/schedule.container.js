import React          from 'react'
import ScheduleStore  from '../stores/ScheduleStore'
import DriversStore   from '../stores/DriversStore'
import AppActions     from '../actions/AppActions'
import CommonSelector from '../views/CommonSelector'
import DutySelector   from '../views/DutySelector'
import NotePad        from '../views/NotePad'

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
        <form>
          <h3>Miesiąc na który ma zostać utworzony grafik</h3>
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
          <DutySelector
            header='Liczba kierowców na poszczególnych dyżurach'
            numberOfDriversPerAllDays={this.state.numberOfDriversPerAllDays}
            numberOfDriversPerFridayNight={this.state.numberOfDriversPerFridayNight}
            numberOfDriversPerSaturdayNight={this.state.numberOfDriversPerSaturdayNight}
            numberOfDriversPerOtherNights={this.state.numberOfDriversPerOtherNights} />
          <hr />
          <NotePad
            style={{width: 488, height: 142}}
            header='Wiadomość dla kierowców'
            placeholder='Maksymalnie 220 znaków' />
        </form>
      </div>
    )
  }
}
