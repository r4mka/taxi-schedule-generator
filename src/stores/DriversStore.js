import AppActionTypes from '../constants/AppActionTypes'
import BaseStore      from './BaseStore'
import _              from 'lodash'

class DriversStore extends BaseStore {
  constructor () {
    super()
    this.subscribe(() => this._registerToActions.bind(this))
    this._drivers = []
    this._selectedDriverId = null
    this._showDriverDetails = false
  }

  _addDriver (driver) {
    this._drivers.push(driver)
  }

  _updateDriver (updatedDriver) {
    const driver = _.find(this._drivers, {id: updatedDriver.id})
    if (driver) {
      for (let property in updatedDriver) {
        if (driver.hasOwnProperty(property) &&
            updatedDriver.hasOwnProperty(property)) {
          driver[property] = updatedDriver[property]
        }
      }
    }
  }
  
  _deleteDriver (id) {
    this._drivers = _.remove(this._drivers, {id: id})
  }

  _registerToActions (action) {
    switch (action.actionType) {
      case AppActionTypes.LOAD_DRIVERS:
        this._drivers = action.drivers
        break
      
      case AppActionTypes.ADD_DRIVER:
        this._addDriver(action.driver)
        break
      
      case AppActionTypes.UPDATE_DRIVER:
        this._updateDriver(action.driver)
        break
      
      case AppActionTypes.DELETE_DRIVER:
        this._deleteDriver(action.driverId)
        break

      case AppActionTypes.SHOW_DRIVER_DETAILS:
        this._selectedDriverId = action.driverId
        this._showDriverDetails = true
        break

      case AppActionTypes.HIDE_DRIVER_DETAILS:
        this._selectedDriverId = null
        this._showDriverDetails = false
        break

      default:
        return
    }
    this.emitChange()
  }

  getUniqueId () {
    this._drivers = _.sortBy(this._drivers, ['id'])
    if (this._drivers.length) {
      let id = this._drivers[this._drivers.length - 1].id
      return (parseInt(id) + 1)
    } else {
      return 1
    }
  }

  isIdUnique (id) {
    let driver = _.find(this._drivers, {id: parseInt(id)})
    if (driver && driver.id !== this._selectedDriverId) {
      return false
    } else {
      return true
    }
  }

  get drivers () {
    return (this._drivers = _.sortBy(this._drivers, ['id']))
  }

  get selectedDriverId () {
    return this._selectedDriverId
  }

  get showDriverDetails () {
    return this._showDriverDetails
  }
}

export default new DriversStore()
