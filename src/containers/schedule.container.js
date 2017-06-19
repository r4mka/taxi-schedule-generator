import React                   from 'react'
import utils                   from '../utils'
import ScheduleStore           from '../stores/ScheduleStore'
import StorageService          from '../services/StorageService'
import ScheduleService         from '../services/ScheduleService'
import DriversStore            from '../stores/DriversStore'
import AppActions              from '../actions/AppActions'
import CommonSelector          from '../views/CommonSelector'
import PreviousMonthDrivers    from '../views/PreviousMonthDrivers'
import ScheduleException       from '../views/ScheduleException'
import CreateScheduleException from '../views/CreateScheduleException'

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
    this.addScheduleException = this.addScheduleException.bind(this)
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
      selectableDriversIds:            DriversStore.selectableDriversIds,
      showCreateScheduleException:     ScheduleStore.showCreateScheduleException,
      selectableDays:                  ScheduleStore.selectableDays,
      scheduleException:               ScheduleStore.scheduleException,
      scheduleExceptions:              ScheduleStore.scheduleExceptions
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

  setScheduleException (event) {
    const name   = event.target.name
    const value  = event.target.value

    console.log('name: ' + name)
    console.log('value: ' + value)

    AppActions.setScheduleException({ [name]: value })
  }

  addScheduleException (exception) {
    const validationResult = this._validateScheduleExceptionInput(exception)
    if (!validationResult.success) {
      this.validationPopup.description = validationResult.message
      return AppActions.showPopup(this.validationPopup)
    }

    AppActions.addScheduleException(exception)
    AppActions.hideCreateScheduleException()
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
        {
          this.state.showCreateScheduleException
          ? <CreateScheduleException
            dayDate={this.state.scheduleException.dayDate}
            dayDrivers={this.state.scheduleException.dayDrivers}
            nocturnalDrivers={this.state.scheduleException.nocturnalDrivers}
            selectableDays={this.state.selectableDays}
            hideWindow={AppActions.hideCreateScheduleException}
            setScheduleException={this.setScheduleException}
            addScheduleException={this.addScheduleException} />
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
            onChange={(e) => AppActions.setScheduleMonth(e.target.value)}
            options={this.state.selectableMonths} />
          <hr />

          <h3>Kierowca który zamykał grafik na nocnej zmianie w ubiegłym miesiącu</h3>
          <CommonSelector
            placeholder='Wybierz kierowcę'
            value={this.state.previousScheduleDriver}
            onChange={(e) => AppActions.setPreviousScheduleDriver(e.target.value)}
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

          <h3>Wyjątki</h3>
          {
            this.state.scheduleExceptions.map((exception) => (
              <ScheduleException
                key={exception.dayDate}
                day={exception.dayDate}
                month={this.state.month}
                year={this.state.year}
                dayDrivers={exception.dayDrivers}
                nocturnalDrivers={exception.nocturnalDrivers}
                deleteException={() => AppActions.deleteScheduleException(exception.dayDate)} />
            ))
          }
          <p style={this.state.scheduleExceptions.length
            ? {display: 'none'}
            : {fontWeight: '100', color: 'rgba(0,0,0,0.4)', fontSize: 15}}>
            Brak dodanych wyjątków
          </p>
          <hr style={{marginTop: 23.3}} />

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
        <button
          className='round-btn'
          style={{width: 42, height: 42, margin: '125px 27px 0'}}
          onClick={AppActions.showCreateScheduleException}>
          <img src='app/assets/icon_dodaj.svg' />
        </button>
      </div>
    )
  }

  _validateScheduleInputs () {
    let isValid = true
    let message = ''
    let state   = this.state

    const empty    = 'Uzupełnij wszystkie pola.'
    const negative = 'Liczba kierowców nie może być ujemna'

    // Validate year
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

    // Validate month
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

    if (state.numberOfDriversPerAllDays < 0) {
      isValid = false
      message = negative
    }

    if (state.numberOfDriversPerFridayNight.trim().length === 0) {
      isValid = false
      message = empty
    }

    if (state.numberOfDriversPerFridayNight < 0) {
      isValid = false
      message = negative
    }

    if (state.numberOfDriversPerSaturdayNight.trim().length === 0) {
      isValid = false
      message = empty
    }

    if (state.numberOfDriversPerSaturdayNight < 0) {
      isValid = false
      message = negative
    }

    if (state.numberOfDriversPerOtherNights.trim().length === 0) {
      isValid = false
      message = empty
    }

    if (state.numberOfDriversPerOtherNights < 0) {
      isValid = false
      message = negative
    }

    return {
      success: isValid,
      message: message
    }
  }

  _validateScheduleExceptionInput ({ dayDrivers, nocturnalDrivers }) {
    let isValid    = true
    let message    = ''
    const empty    = 'Uzupełnij wszystkie pola.'
    const negative = 'Liczba kierowców nie może być ujemna'

    if (dayDrivers.trim().length === 0) {
      isValid = false
      message = empty
    } else if (dayDrivers < 0) {
      isValid = false
      message = negative
    }

    if (nocturnalDrivers.trim().length === 0) {
      isValid = false
      message = empty
    } else if (nocturnalDrivers < 0) {
      isValid = false
      message = negative
    }

    return {
      success: isValid,
      message: message
    }
  }
}
