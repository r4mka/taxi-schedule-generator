import AppActionTypes from '../constants/AppActionTypes'
import BaseStore      from './BaseStore'
import Storage        from '../services/StorageService'
import _              from 'lodash'

class ScheduleStore extends BaseStore {
  constructor () {
    super()
    this.subscribe(() => this._registerToActions.bind(this))
    this._year = ''
    this._month = ''
    this._message = ''
    this._numberOfDriversPerAllDays = 20
    this._numberOfDriversPerFridayNight = 20
    this._numberOfDriversPerSaturdayNight = 28
    this._numberOfDriversPerOtherNights = 10
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

  get message () {
    return this._message
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
}

export default new ScheduleStore()
