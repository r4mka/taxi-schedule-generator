import AppDispatcher  from '../dispatcher/AppDispatcher'
import AppActionTypes from '../constants/AppActionTypes'

const Actions = {
  loadDrivers (drivers) {
    console.log('emit LOAD_DRIVERS action')
    console.log(drivers)
    AppDispatcher.dispatch({
      type:    AppActionTypes.LOAD_DRIVERS,
      drivers: drivers
    })
  }
}

export default Actions
