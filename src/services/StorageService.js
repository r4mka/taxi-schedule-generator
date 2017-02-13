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

  updateDriver (id, data, cb) {
    if (!cb) return
    this.database.update(
    {docType: 'driver', id: id},
    {$set: data},
    {returnUpdatedDocs: true},
    (err, numReplaced, affectedDocument) => {
      if (err) {
        console.log(err)
        return cb(err)
      }
      if (numReplaced > 0) {
        // console.log('driver (id: ' + id + ') updated')
        // console.log(affectedDocument.scheduleHistory[0].schedule)
        cb(null, affectedDocument)
      } else {
        let err = new Error('No record was updated')
        cb(err)
      }
    })
  }

  getDrivers (cb) {
    if (!cb) return
    this.database.find({docType: 'driver'}, (err, doc) => {
      if (err) {
        return cb(err)
      }
      cb(null, doc)
    })
  }
}

export default new StorageService()
