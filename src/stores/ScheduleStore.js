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
    this._month = utils.monthToString(_now.getMonth()).toLowerCase()
    this._message = ''
    // how to determine ?
    this._previousScheduleDriver = ''
    this._numberOfDriversPerAllDays = ''
    this._numberOfDriversPerFridayNight = ''
    this._numberOfDriversPerSaturdayNight = ''
    this._numberOfDriversPerOtherNights = ''
    this._showPreviousMonthDrivers
    this._previousMonthDrivers = []

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
        break

      case AppActionTypes.SET_SCHEDULE_MONTH:
        this._month = action.month
        break

      case AppActionTypes.SET_SCHEDULE_MSG:
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

      default:
        return
    }
    this.emitChange()
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
}

export default new ScheduleStore()
