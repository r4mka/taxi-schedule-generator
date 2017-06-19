import AppActionTypes from '../constants/AppActionTypes'
import BaseStore      from './BaseStore'
import utils          from '../utils'
import _              from 'lodash'

class ScheduleStore extends BaseStore {
  constructor () {
    super()
    const _now = new Date()
    this.subscribe(() => this._registerToActions.bind(this))
    this._year = _now.getFullYear().toString()
    this._month = utils.monthToString(_now.getMonth() + 1).toLowerCase()
    this._message = ''
    this._previousScheduleDriver = ''
    this._numberOfDriversPerAllDays = ''
    this._numberOfDriversPerFridayNight = ''
    this._numberOfDriversPerSaturdayNight = ''
    this._numberOfDriversPerOtherNights = ''
    this._showPreviousMonthDrivers = false
    this._showCreateScheduleException = false
    this._previousMonthDrivers = []
    this._scheduleExceptions = []
    this._scheduleException = {
      dayDate:          '',
      dayDrivers:       '',
      nocturnalDrivers: ''
    }

    this._selectableDays = this._populateSelectableDays(_now.getFullYear(), _now.getMonth() + 1)
    this._selectableMonths = [
      'styczeń', 'luty', 'marzec',
      'kwiecień', 'maj', 'czerwiec',
      'lipiec', 'sierpień', 'wrzesień',
      'październik', 'listopad', 'grudzień'
    ]
  }

  _registerToActions (action) {
    switch (action.actionType) {
      case AppActionTypes.SET_SCHEDULE_YEAR:
        this._year = action.year
        console.log(this._year)
        break

      case AppActionTypes.SET_SCHEDULE_MONTH:
        this._month = action.month
        console.log(this._month)
        break

      case AppActionTypes.SET_SCHEDULE_MSG:
        if (action.msg.length > 220) return
        this._message = action.msg
        break

      case AppActionTypes.SET_PREVIOUS_SCHEDULE_DRIVER:
        this._previousScheduleDriver = action.driverId
        break

      case AppActionTypes.SET_DRIVERS_PER_ALL_DAYS:
        this._numberOfDriversPerAllDays = action.numberOfDrivers
        break

      case AppActionTypes.SET_DRIVERS_PER_FRI_NIGHT:
        this._numberOfDriversPerFridayNight = action.numberOfDrivers
        break

      case AppActionTypes.SET_DRIVERS_PER_SAT_NIGHT:
        this._numberOfDriversPerSaturdayNight = action.numberOfDrivers
        break

      case AppActionTypes.SET_DRIVERS_PER_OTHERS_NIGHTS:
        this._numberOfDriversPerOtherNights = action.numberOfDrivers
        break

      case AppActionTypes.SHOW_PREVIOUS_MONTH_DRIVERS:
        this._showPreviousMonthDrivers = true
        break

      case AppActionTypes.HIDE_PREVIOUS_MONTH_DRIVERS:
        this._showPreviousMonthDrivers = false
        break

      case AppActionTypes.TOGGLE_PREVIOUS_MONTH_DRIVER:
        const index = _.findIndex(this._previousMonthDrivers, (driver) => driver === action.driverId)
        if (index !== -1) {
          this._previousMonthDrivers.splice(index, 1)
        } else {
          this._previousMonthDrivers.push(action.driverId)
        }
        break

      case AppActionTypes.CLEAR_PREVIOUS_MONTH_DRIVERS:
        this._previousMonthDrivers.splice(0, this._previousMonthDrivers.length)
        break

      case AppActionTypes.SHOW_CREATE_SCHEDULE_EXCEPTION:
        this._showCreateScheduleException = true
        break

      case AppActionTypes.HIDE_CREATE_SCHEDULE_EXCEPTION:
        this._showCreateScheduleException = false
        break

      case AppActionTypes.SET_SCHEDULE_EXCEPTION:
        this._setScheduleException(action.exception)
        break

      case AppActionTypes.ADD_SCHEDULE_EXCEPTION:
        this._scheduleExceptions.push(action.exception)
        break

      case AppActionTypes.DELETE_SCHEDULE_EXCEPTION:
        _.remove(this._scheduleExceptions, {dayDate: action.dayDate})
        break

      default:
        return
    }
    this.emitChange()
  }

  _setScheduleException (exception) {
    for (let property in exception) {
      if (this._scheduleException.hasOwnProperty(property) &&
          exception.hasOwnProperty(property)) {
        this._scheduleException[property] = exception[property]
      }
    }
  }

  _populateSelectableDays (year, month) {
    const daysInMonth    = new Date(year, month + 1, 0).getDate()
    const selectableDays = []

    console.log('year: ' + year)
    console.log('month: ' + month)
    console.log('days: ' + daysInMonth)

    for (let i = 1; i <= daysInMonth; i++) {
      selectableDays.push(i)
    }

    console.log(selectableDays)
    return selectableDays
  }

  get year () {
    return this._year
  }

  get month () {
    return this._month
  }

  get selectableMonths () {
    return this._selectableMonths
  }

  get message () {
    return this._message
  }

  get previousScheduleDriver () {
    return this._previousScheduleDriver
  }

  get numberOfDriversPerAllDays () {
    return this._numberOfDriversPerAllDays
  }

  get numberOfDriversPerFridayNight () {
    return this._numberOfDriversPerFridayNight
  }

  get numberOfDriversPerSaturdayNight () {
    return this._numberOfDriversPerSaturdayNight
  }

  get numberOfDriversPerOtherNights () {
    return this._numberOfDriversPerOtherNights
  }

  get showPreviousMonthDrivers () {
    return this._showPreviousMonthDrivers
  }

  get previousMonthDrivers () {
    return this._previousMonthDrivers
  }

  get showCreateScheduleException () {
    return this._showCreateScheduleException
  }

  get selectableDays () {
    return this._selectableDays
  }

  get scheduleException () {
    return this._scheduleException
  }

  get scheduleExceptions () {
    return this._scheduleExceptions
  }
}

export default new ScheduleStore()
