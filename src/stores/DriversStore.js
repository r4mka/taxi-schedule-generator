import AppActionTypes from '../constants/AppActionTypes'
import BaseStore      from './BaseStore'
import _              from 'lodash'

class DriversStore extends BaseStore {
  constructor () {
    super()
    this.subscribe(() => this._registerToActions.bind(this))
    this._drivers = []
  }

  _toggleDriverProperty (id, property) {
    const driver = _.find(this._drivers, {id: id})
    driver[property] = !driver[property]
  }

  _registerToActions (action) {
    switch (action.actionType) {
      case AppActionTypes.LOAD_DRIVERS:
        this._drivers = action.drivers
        this.emitChange()
        break
      
      case AppActionTypes.TOGGLE_GENERAL_ACTIVITY:
        this._toggleDriverProperty(action.driverId, 'generalActivity')
        this.emitChange()
        break

      case AppActionTypes.TOGGLE_DAILY_ACTIVITY:
        this._toggleDriverProperty(action.driverId, 'dailyActivity')
        this.emitChange()
        break

      case AppActionTypes.TOGGLE_NOCTURNAL_ACTIVITY:
        this._toggleDriverProperty(action.driverId, 'nocturnalActivity')
        this.emitChange()
        break

      default:
        break
    }
  }

  get drivers () {
    return this._drivers
  }
}

export default new DriversStore()
