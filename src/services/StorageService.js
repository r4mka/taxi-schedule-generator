import config from 'config'
import _      from 'lodash'
import utils  from '../utils'

const Datastore = require('nedb')

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
    // driver data model:
    const driverDoc = {
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

    this.database.insert(driverDoc, (err, doc) => {
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
      if (!numReplaced) return cb(null, null)
      cb(null, doc)
    })
  }

  deleteDriver (_id, cb) {
    this.database.remove({docType: 'driver', _id: _id}, {}, (err) => {
      if (err) return cb(err)
      cb(null)
    })
  }

  getDrivers (cb) {
    this.database.find({docType: 'driver'}, (err, doc) => {
      if (err) return cb(err)
      if (!doc) return cb(null, [])
      cb(null, doc)
    })
  }

  deleteSchedule (filename, done) {
    const query = {
      docType:  'schedule',
      filename: filename
    }
    
    this.database.remove(query, {}, (err) => {
      if (err) return done(err)
      done()
    })
  }

  getSchedules (done) {
    this.database.find({docType: 'schedule'}, (err, doc) => {
      if (err) return done(err)
      done(null, doc)
    })
  }

  getScheduleByDate (year, month, done) {
    const query = {
      'docType':    'schedule',
      'date.year':  year,
      'date.month': month
    }
    
    this.database.find(query, (err, doc) => {
      if (err) return done(err)
      if (!doc.length) return done(null, null)
      done(null, doc[0])
    })
  }

  getPreviousScheduleByDate (year, month, done) {
    month = utils.monthToNum(month)

    if (month === 0) {
      // If january 2017 back to december 2016
      month = utils.monthToString(11)
      year = (year - 1).toString()
    } else {
      month = utils.monthToString(month - 1)
    }
    
    this.getScheduleByDate(year, month, done)
  }

  updateSchedule (schedule, cb) {
    this.database.update(
      {
        'docType':    'schedule',
        'date.year':  schedule.date.year,
        'date.month': schedule.date.month
      },
      {$set: schedule},
      {returnUpdatedDocs: true},
      (err, numReplaced, doc) => {
        if (err) return cb(err)
        if (!numReplaced) return cb(null, null)
        cb(null, doc)
      })
  }

  prepareScheduleDocument (options, done) {
    const scheduleDoc = {}
    scheduleDoc.docType = 'schedule'
    scheduleDoc.filename = options.filename
    scheduleDoc.date = {
      year:        options.year,
      month:       options.month,
      daysInMonth: options.daysInMonth
    }
    scheduleDoc.options = {
      previousDriver:   options.previousScheduleDriver,
      allDaysNum:       options.numberOfDriversPerAllDays,
      fridayNightNum:   options.numberOfDriversPerFridayNight,
      saturdayNightNum: options.numberOfDriversPerSaturdayNight,
      otherNightsNum:   options.numberOfDriversPerOtherNights
    }
    scheduleDoc.schedule = []
    
    // get active drivers
    this.database.find({
      docType:         'driver',
      generalActivity: true,
      status:          'pracuje'
    }, (err, drivers) => {
      if (err) return done(err)
      if (!drivers) {
        return done(new Error('Cannot retrieve drivers from database'))
      }
      
      // add schedule table for each driver
      const driverSchedule = []
      for (let i = 0; i < options.daysInMonth; i++) {
        driverSchedule.push('')
      }

      drivers = _.sortBy(drivers, ['id'])
      drivers.forEach((driver) => {
        const schedule = {
          driverId:          driver.id,
          dailyActivity:     driver.dailyActivity,
          nocturnalActivity: driver.nocturnalActivity,
          driverSchedule:    _.cloneDeep(driverSchedule)
        }

        scheduleDoc.schedule.push(schedule)
      })
      
      if (options.previousMonthDrivers &&
          _.isArray(options.previousMonthDrivers) &&
          options.previousMonthDrivers.length !== 0) {
        scheduleDoc.options.previousMonthDrivers = options.previousMonthDrivers
        console.log('from checkboxes')
        console.log(scheduleDoc)
        return done(null, scheduleDoc)
      } else {
        const previousMonthDrivers = []
        const year  = scheduleDoc.date.year
        const month = scheduleDoc.date.month
        this.getPreviousScheduleByDate(year, month, (err, prevSchedule) => {
          if (err) return done(err)
          if (!prevSchedule) return done(new Error('Previous schedule doesn\'t exist in database'))

          console.log(prevSchedule)

          const lastDay = prevSchedule.date.daysInMonth - 1
          prevSchedule.schedule.forEach((schedule) => {
            if (schedule.driverSchedule[lastDay] === 'N') {
              previousMonthDrivers.push(schedule.driverId)
            }
          })

          scheduleDoc.options.previousMonthDrivers = previousMonthDrivers
          console.log('from database')
          console.log(scheduleDoc)
          return done(null, scheduleDoc)
        })
      }
    })
  }

  addSchedule (schedule, done) {
    // check if schedule for given month exists
    this.database.find({
      'docType':    'schedule',
      'date.year':  schedule.year,
      'date.month': schedule.month
    }, (err, docs) => {
      if (err) return done(err)
      // if there is no schedule - add new one
      if (_.isEmpty(docs)) {
        this.database.insert(schedule, (err, doc) => {
          if (err) return done(err)
          return done(null, doc)
        })
      } else { // if there is already schedule - update it
        this.database.update({
          'docType':    'schedule',
          'date.year':  schedule.year,
          'date.month': schedule.month
        },
        {$set: schedule},
        {returnUpdatedDocs: true},
        (err, numReplaced, doc) => {
          if (err) return done(err)
          if (!numReplaced) return done(null, null)
          return done(null, doc)
        })
      }
    })
  }
}

export default new StorageService()
