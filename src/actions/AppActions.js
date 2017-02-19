import AppDispatcher  from '../dispatcher/AppDispatcher'
import AppActionTypes from '../constants/AppActionTypes'

const Actions = {
  loadDrivers (drivers) {
    AppDispatcher.dispatch({
      actionType: AppActionTypes.LOAD_DRIVERS,
      drivers:    drivers
    })
  },
  toggleDriverGeneralActivity (driverId) {
    AppDispatcher.dispatch({
      actionType: AppActionTypes.TOGGLE_GENERAL_ACTIVITY,
      driverId:   driverId
    })
  },
  toggleDriverDailyActivity (driverId) {
    AppDispatcher.dispatch({
      actionType: AppActionTypes.TOGGLE_DAILY_ACTIVITY,
      driverId:   driverId
    })
  },
  toggleDriverNocturnalActivity (driverId) {
    AppDispatcher.dispatch({
      actionType: AppActionTypes.TOGGLE_NOCTURNAL_ACTIVITY,
      driverId:   driverId
    })
  }
}

export default Actions
