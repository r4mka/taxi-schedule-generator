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
    console.log('addDriver')
    AppDispatcher.dispatch({
      actionType: AppActionTypes.ADD_DRIVER,
      driver:     driver
    })
  },
  updateDriver (driver) {
    console.log('updateDriver')
    AppDispatcher.dispatch({
      actionType: AppActionTypes.UPDATE_DRIVER,
      driver:     driver
    })
  },
  deleteDriver (_id) {
    console.log('deleteDriver')
    AppDispatcher.dispatch({
      actionType: AppActionTypes.DELETE_DRIVER,
      _id:        _id
    })
  },
  updateDriverDetails (driver) {
    console.log('updateDriverDetails')
    AppDispatcher.dispatch({
      actionType: AppActionTypes.UPDATE_DRIVER_DETAILS,
      driver:     driver
    })
  },
  showDriverDetails (driver) {
    console.log('showDriverDetails')
    AppDispatcher.dispatch({
      actionType: AppActionTypes.SHOW_DRIVER_DETAILS,
      driver:     driver
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
  },
  setScheduleYear (year) {
    console.log('setScheduleYear')
    AppDispatcher.dispatch({
      actionType: AppActionTypes.SET_SCHEDULE_YEAR,
      year:       year
    })
  },
  setScheduleMonth (month) {
    console.log('setScheduleMonth')
    AppDispatcher.dispatch({
      actionType: AppActionTypes.SET_SCHEDULE_MONTH,
      month:      month
    })
  },
  setScheduleMsg (msg) {
    console.log('setScheduleMsg')
    AppDispatcher.dispatch({
      actionType: AppActionTypes.SET_SCHEDULE_MSG,
      msg:        msg
    })
  },
  setNumberOfDriversPerAllDays (number) {
    console.log('setNumberOfDriversPerAllDays')
    AppDispatcher.dispatch({
      actionType:      AppActionTypes.SET_DRIVERS_PER_ALL_DAYS,
      numberOfDrivers: number
    })
  },
  setNumberOfDriversPerFridayNight (number) {
    console.log('setNumberOfDriversPerFridayNight')
    AppDispatcher.dispatch({
      actionType:      AppActionTypes.SET_DRIVERS_PER_FRI_NIGHT,
      numberOfDrivers: number
    })
  },
  setNumberOfDriversPerSaturdayNight (number) {
    console.log('setNumberOfDriversPerSaturdayNight')
    AppDispatcher.dispatch({
      actionType:      AppActionTypes.SET_DRIVERS_PER_SAT_NIGHT,
      numberOfDrivers: number
    })
  },
  setNumberOfDriversPerOtherNights (number) {
    console.log('setNumberOfDriversPerOtherNights')
    AppDispatcher.dispatch({
      actionType:      AppActionTypes.SET_DRIVERS_PER_OTHERS_NIGHTS,
      numberOfDrivers: number
    })
  },
  setPreviousScheduleDriver (id) {
    console.log('setPreviousScheduleDriver')
    AppDispatcher.dispatch({
      actionType: AppActionTypes.SET_PREVIOUS_SCHEDULE_DRIVER,
      driverId:   id
    })
  }
}

export default Actions
