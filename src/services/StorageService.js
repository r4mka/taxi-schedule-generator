const Datastore = require('nedb')
import config from 'config'

class StorageService {
  constructor () {
    console.log('open database connection')
    this.database = new Datastore({
      filename: config.db.filename,
      autoload: config.db.autoload
    })
    console.log(this.database)
  }

  addDriver (driver, cb) {
    console.log('addDriver()')
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
      if (err) {
        console.log(err)
        return cb(err)
      } else {
        // console.log('Driver added')
        cb(null, doc)
      }
    })
  }

  updateDriver (id, data, cb) {
    console.log('updateDriver()')
    this.database.update(
    {docType: 'driver', id: id},
    {$set: data},
    {returnUpdatedDocs: true},
    (err, numReplaced, doc) => {
      if (err) {
        console.log(err)
        return cb(err)
      }
      console.log('Driver updated')
      cb(null, doc)
    })
  }

  getDrivers (cb) {
    console.log('getDrivers()')
    this.database.find({docType: 'driver'}, (err, doc) => {
      if (err) {
        return cb(err)
      }
      cb(null, doc)
    })
  }
}

export default new StorageService()
