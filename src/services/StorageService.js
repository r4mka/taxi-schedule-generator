import config         from 'config'
import AppDispatcher  from '../dispatcher/AppDispatcher'
import AppActionTypes from '../constants/AppActionTypes'
const Datastore = require('nedb')

class StorageService {
  constructor () {
    console.log('open database connection')
    this.dispatchToken = AppDispatcher.register(this.registerToActions.bind(this))
    this.database = new Datastore({
      filename: config.db.filename,
      autoload: config.db.autoload
    })
    console.log(this.database)
  }

  addDriver (driver, cb) {
    // driver data model:
    const document = {
      docType:           'driver',
      id:                driver.id,
      name:              driver.name,
      phone:             driver.phone,
      notes:             driver.notes,
      status:            driver.status,
      generalActivity:   driver.generalActivity,
      dailyActivity:     driver.dailyActivity,
      nocturnalActivity: driver.nocturnalActivity,
      scheduleHistory:   []
    }

    this.database.insert(document, (err, doc) => {
      if (err) return cb(err)
      cb(null, doc)
    })
  }

  updateDriver (driver, cb) {
    this.database.update(
    {docType: 'driver', _id: driver._id},
    {$set: driver},
    {returnUpdatedDocs: true},
    (err, numReplaced, doc) => {
      if (err) return cb(err)
      if (!doc) return cb(new Error('Cannot update driver ' + JSON.stringify(driver)))
      cb(null, doc)
    })
  }

  deleteDriver (id, cb) {
    this.database.remove({docType: 'driver', _id: id}, {}, (err) => {
      if (err) return cb(err)
      cb(null)
    })
  }

  getDrivers (cb) {
    this.database.find({docType: 'driver'}, (err, doc) => {
      if (err) return cb(err)
      if (!doc) return cb(new Error('Cannot retrieve drivers from database'))
      cb(null, doc)
    })
  }

  registerToActions (action) {
    switch (action.actionType) {
      case AppActionTypes.ADD_DRIVER:
        this.addDriver(action.driver, (err) => {
          if (err) {
            console.error('An error occurred while adding driver to database: ' + err)
          }
        })
        break

      case AppActionTypes.UPDATE_DRIVER:
        this.updateDriver(action.driver, (err) => {
          if (err) {
            console.error('An error occurred while updating driver to database ' + err)
          }
        })
        break

      case AppActionTypes.DELETE_DRIVER:
        this.deleteDriver(action.driverId, (err) => {
          if (err) {
            console.error('An error occurred while deleting driver from database ' + err)
          }
        })
        break
    }
  }
}

export default new StorageService()
