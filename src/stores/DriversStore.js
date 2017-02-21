import AppActionTypes from '../constants/AppActionTypes'
import BaseStore      from './BaseStore'
import _              from 'lodash'

class DriversStore extends BaseStore {
  constructor () {
    super()
    this.subscribe(() => this._registerToActions.bind(this))
    this._drivers = []
    this._selectedDriver = {}
    this._showDriverDetails = false
  }

  _toggleDriverProperty (id, property) {
    const driver = _.find(this._drivers, {id: id})
    driver[property] = !driver[property]
  }

  _saveDriverDetails (updatedDriver) {
    const driver = _.find(this._drivers, {id: updatedDriver.id})
    for (let property in driver) {
      if (driver.hasOwnProperty(property) &&
          updatedDriver.hasOwnProperty(property)) {
        driver[property] = updatedDriver[property]
      }
    }
  }

  _registerToActions (action) {
    switch (action.actionType) {
      case AppActionTypes.LOAD_DRIVERS:
        this._drivers = _.sortBy(action.drivers, ['id'])
        break

      case AppActionTypes.TOGGLE_GENERAL_ACTIVITY:
        this._toggleDriverProperty(action.driverId, 'generalActivity')
        break

      case AppActionTypes.TOGGLE_DAILY_ACTIVITY:
        this._toggleDriverProperty(action.driverId, 'dailyActivity')
        break

      case AppActionTypes.TOGGLE_NOCTURNAL_ACTIVITY:
        this._toggleDriverProperty(action.driverId, 'nocturnalActivity')
        break

      case AppActionTypes.SHOW_DRIVER_DETAILS:
        console.log('!!!!!!!!!')
        this._selectedDriver = action.driver
        this._showDriverDetails = true
        break

      case AppActionTypes.HIDE_DRIVER_DETAILS:
        this._selectedDriver = {}
        this._showDriverDetails = false
        break

      case AppActionTypes.SAVE_DRIVER_DETAILS:
        this._saveDriverDetails(action.driver)
        break

      default:
        return
    }
    console.log('emit change')
    this.emitChange()
  }

  get drivers () {
    return this._drivers
  }

  get selectedDriver () {
    return this._selectedDriver
  }

  get showDriverDetails () {
    return this._showDriverDetails
  }
}

export default new DriversStore()
