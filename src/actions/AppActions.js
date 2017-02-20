import AppDispatcher  from '../dispatcher/AppDispatcher'
import AppActionTypes from '../constants/AppActionTypes'

const Actions = {
  loadDrivers (drivers) {
    AppDispatcher.dispatch({
      actionType: AppActionTypes.LOAD_DRIVERS,
      drivers:    drivers
    })
  },
  toggleDriverGeneralActivity (id) {
    AppDispatcher.dispatch({
      actionType: AppActionTypes.TOGGLE_GENERAL_ACTIVITY,
      driverId:   id
    })
  },
  toggleDriverDailyActivity (id) {
    AppDispatcher.dispatch({
      actionType: AppActionTypes.TOGGLE_DAILY_ACTIVITY,
      driverId:   id
    })
  },
  toggleDriverNocturnalActivity (id) {
    AppDispatcher.dispatch({
      actionType: AppActionTypes.TOGGLE_NOCTURNAL_ACTIVITY,
      driverId:   id
    })
  }
}

export default Actions
