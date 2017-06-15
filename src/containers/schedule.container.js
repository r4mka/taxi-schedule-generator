import React                from 'react'
import utils                from '../utils'
import ScheduleStore        from '../stores/ScheduleStore'
import StorageService       from '../services/StorageService'
import ScheduleService      from '../services/ScheduleService'
import DriversStore         from '../stores/DriversStore'
import AppActions           from '../actions/AppActions'
import CommonSelector       from '../views/CommonSelector'
import PreviousMonthDrivers from '../views/PreviousMonthDrivers'

const ipcRenderer = window.require('electron').ipcRenderer

export default class ScheduleContainer extends React.Component {
  constructor (props) {
    super(props)

    this.overrideSchedulePopup = {
      header:          'Uwaga!',
      description:     'Grafik na podany miesiąc już istnieje. Czy chcesz go nadpisać?',
      handleCancelBtn: AppActions.hidePopup,
      cancelBtnLabel:  'nie',
      handleSubmitBtn: () => {
        this.createSchedule(this.state)
        AppActions.hidePopup()
      },
      submitBtnLabel: 'tak'
    }

    this.validationPopup = {
      header:         'Uwaga!',
      description:    '',
      submitBtnLabel: 'zamknij'
    }

    this.state = this.getScheduleState()
    this._onChange = this._onChange.bind(this)
    this.prepareSchedule = this.prepareSchedule.bind(this)
    this.createSchedule = this.createSchedule.bind(this)
  }

  componentWillMount () {
    ScheduleService.checkSchedules((err) => {
      if (err) {
        console.log(err)
        // show popup
        return
      }
    })

    const year  = this.state.year
    const month = this.state.month

    // get driver who will start new schedule
    StorageService.getNightDriversFromPreviousMonth(year, month, (err, drivers) => {
      if (err) {
        console.log(err)
        // show popup
        return
      }

      if (!drivers || drivers.length === 0) {
        // No previous schedule
        AppActions.setPreviousScheduleDriver('')
      } else {
        const lastDriver = drivers[drivers.length - 1]
        AppActions.setPreviousScheduleDriver(lastDriver.toString())
      }
    })
  }

  componentDidMount () {
    ScheduleStore.addChangeListener(this._onChange)
    DriversStore.addChangeListener(this._onChange)
  }

  componentWillUnmount () {
    ScheduleStore.removeChangeListener(this._onChange)
    DriversStore.removeChangeListener(this._onChange)
  }

  componentWillUpdate (nextProps, nextState) {
    if (nextState.year !== this.state.year ||
        nextState.month !== this.state.month) {
      const year  = nextState.year
      const month = nextState.month
      // console.log('get driver who will start schedule for: ' + month + ' in ' + year)

      // get driver who will start new schedule
      StorageService.getNightDriversFromPreviousMonth(year, month, (err, drivers) => {
        if (err) {
          console.log(err)
          // show popup
          return
        }

        if (!drivers || drivers.length === 0) {
          // No previous schedule
          AppActions.setPreviousScheduleDriver('')
        } else {
          const lastDriver = drivers[drivers.length - 1]
          AppActions.setPreviousScheduleDriver(lastDriver.toString())
        }
      })
    }
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
      showPreviousMonthDrivers:        ScheduleStore.showPreviousMonthDrivers,
      selectableDriversIds:            DriversStore.selectableDriversIds
    }
  }

  prepareSchedule (e) {
    const validationResult = this._validateScheduleInputs()
    if (!validationResult.success) {
      this.validationPopup.description = validationResult.message
      return AppActions.showPopup(this.validationPopup)
    }

    // console.log('check if schedule for selected date exists')
    const year  = this.state.year
    const month = this.state.month

    StorageService.getScheduleByDate(year, month, (err, schedule) => {
      if (err) {
        console.log(err)
        // show error popup
        return
      }
      if (schedule) {
        // ask user if he want to override existing schedule
        AppActions.showPopup(this.overrideSchedulePopup)
      } else {
        // check if previous schedule exists
        StorageService.getPreviousScheduleByDate(year, month, (err, schedule) => {
          if (err) {
            console.log(err)
            // show error popup
            return
          }

          if (!schedule) {
            // get list of users who performed night duty in last day of previous month
            AppActions.clearPreviousMonthDrivers()
            AppActions.showPreviousMonthDrivers()
          } else {
            this.createSchedule(this.state)
          }
        })
      }
    })
  }

  createSchedule (options) {
    const previousMonthDrivers = ScheduleStore.previousMonthDrivers

    if (previousMonthDrivers) {
      options.previousMonthDrivers = previousMonthDrivers
    }

    ScheduleService.createSchedule(options, (err) => {
      if (err) console.log(err)
    })
  }

  _validateScheduleInputs () {
    let isValid = true
    let message = ''
    let state   = this.state

    const empty = 'Uzupełnij wszystkie pola.'

    if (state.year.trim().length === 0) {
      isValid = false
      message = empty
    } else {
      const _now = new Date()
      if (_now.getFullYear() > parseInt(state.year)) {
        isValid = false
        message = 'Wybrany rok jest niepoprawny'
      }
    }

    if (state.month.trim().length === 0) {
      isValid = false
      message = empty
    } else {
      const _now = new Date()
      if (_now.getMonth() > utils.monthToNum(state.month)) {
        isValid = false
        message = 'Wybrany miesiąc jest niepoprawny'
      }
    }

    if (!state.previousScheduleDriver) {
      isValid = false
      message = empty
    }

    if (state.numberOfDriversPerAllDays.trim().length === 0) {
      isValid = false
      message = empty
    }

    if (state.numberOfDriversPerFridayNight.trim().length === 0) {
      isValid = false
      message = empty
    }

    if (state.numberOfDriversPerSaturdayNight.trim().length === 0) {
      isValid = false
      message = empty
    }

    if (state.numberOfDriversPerOtherNights.trim().length === 0) {
      isValid = false
      message = empty
    }

    return {
      success: isValid,
      message: message
    }
  }

  browseSchedules () {
    ipcRenderer.once('browse-schedules-reply', (event) => {
      ScheduleService.checkSchedules((err) => {
        if (err) {
          console.log(err)
          // show popup
          return
        }
      })
    })

    ipcRenderer.send('browse-schedules')
  }

  render () {
    return (
      <div id='schedule-page'>
        {
          this.state.showPreviousMonthDrivers
          ? <PreviousMonthDrivers
            drivers={DriversStore.drivers}
            onSubmit={() => {
              this.createSchedule(this.state)
              AppActions.hidePreviousMonthDrivers()
            }} />
          : null
        }
        <form id='schedule-form'>
          <h3>Miesiąc na który ma zostać utworzony grafik</h3>
          <input
            type='number'
            min={new Date().getFullYear().toString()}
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

          <h3>Kierowca który zamykał grafik na nocnej zmianie w ubiegłym miesiącu</h3>
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
              onChange={(e) =>
                AppActions.setNumberOfDriversPerAllDays(e.target.value)}
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
              onChange={(e) =>
                AppActions.setNumberOfDriversPerOtherNights(e.target.value)}
              placeholder='W tygodniu' />
            <input
              type='number'
              min='0'
              style={{width: 100, marginRight: 12}}
              className='text-input'
              value={this.state.numberOfDriversPerFridayNight}
              onChange={(e) =>
                AppActions.setNumberOfDriversPerFridayNight(e.target.value)}
              placeholder='W piątki' />
            <input
              type='number'
              min='0'
              style={{width: 108}}
              className='text-input'
              value={this.state.numberOfDriversPerSaturdayNight}
              onChange={(e) =>
                AppActions.setNumberOfDriversPerSaturdayNight(e.target.value)}
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
          onClick={this.prepareSchedule}>
          <img src='app/assets/icon_drukuj.svg' />
        </button>
        <button
          className='round-btn'
          style={{width: 42, height: 42, margin: '70px 27px 0'}}
          onClick={this.browseSchedules}>
          <img src='app/assets/icon_folder.svg' />
        </button>
      </div>
    )
  }
}
