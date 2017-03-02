import AppDispatcher  from '../dispatcher/AppDispatcher'
import AppActionTypes from '../constants/AppActionTypes'

const Actions = {
  loadDrivers (drivers) {
    console.log('loadDrivers')
    AppDispatcher.dispatch({
      actionType: AppActionTypes.LOAD_DRIVERS,
      drivers:    drivers
    })
  },
  addDriver (driver) {
    driver.id = parseInt(driver.id)
    console.log('addDriver')
    AppDispatcher.dispatch({
      actionType: AppActionTypes.ADD_DRIVER,
      driver:     driver
    })
  },
  updateDriver (driver) {
    driver.id = parseInt(driver.id)
    console.log('updateDriver')
    AppDispatcher.dispatch({
      actionType: AppActionTypes.UPDATE_DRIVER,
      driver:     driver
    })
  },
  deleteDriver (id) {
    // id = parseInt(id)
    console.log('deleteDriver ' + id)
    AppDispatcher.dispatch({
      actionType: AppActionTypes.DELETE_DRIVER,
      driverId:   id
    })
  },
  showDriverDetails (id) {
    console.log('showDriverDetails')
    AppDispatcher.dispatch({
      actionType: AppActionTypes.SHOW_DRIVER_DETAILS,
      driverId:   id
    })
  },
  hideDriverDetails () {
    console.log('hideDriverDetails')
    AppDispatcher.dispatch({
      actionType: AppActionTypes.HIDE_DRIVER_DETAILS
    })
  },
  showPopup (popup) {
    console.log('showPopup')
    AppDispatcher.dispatch({
      actionType: AppActionTypes.SHOW_POPUP,
      popup:      popup
    })
  },
  hidePopup () {
    console.log('hidePopup')
    AppDispatcher.dispatch({
      actionType: AppActionTypes.HIDE_POPUP
    })
  }
}

export default Actions
