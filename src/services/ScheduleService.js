import StorageService from './StorageService'
import utils          from '../utils'
import async          from 'async'
import _              from 'lodash'
const ipcRenderer = window.require('electron').ipcRenderer

module.exports = {
  createSchedule: createSchedule,
  checkSchedules: checkSchedules
}

function checkSchedules (done) {
  ipcRenderer.on('check-schedules-reply-err', (event, err) => done(err))
  ipcRenderer.on('check-schedules-reply', (event, files) => {
    files.forEach((file) => {
      console.log(file)
    })

    StorageService.getSchedules((err, schedules) => {
      if (err) return done(err)
      if (!schedules.length) return done()

      async.each(schedules, (schedule, next) => {
        if (_.findIndex(files, (file) => file === schedule.filename) === -1) {
          console.log('remove: ' + schedule.filename)
          StorageService.deleteSchedule(schedule.filename, next)
        } else {
          next()
        }
      }, (err) => {
        if (err) return done(err)

        return done()
      })
    })
  })

  ipcRenderer.send('check-schedules', null)
}

function createSchedule (options, done) {
  const daysInMonth   = new Date(options.year, utils.monthToNum(options.month), 0).getDate()
  options.daysInMonth = daysInMonth

  StorageService.prepareScheduleDocument(options, (err, scheduleDocument) => {
    if (err) return done(err)

    console.log('schedule document prepared successfully')
    // console.log(scheduleDocument)

    _createScheduleTable(scheduleDocument, (err, scheduleTable, scheduleDocument) => {
      if (err) return done(err)

      const pdfName = 'grafik-' + options.year + '-' + options.month + '.pdf'
      scheduleDocument.filename = pdfName

      console.log('schedule table created successfully')
      StorageService.addSchedule(scheduleDocument, (err, scheduleDocument) => {
        if (err) return done(err)
      
        const colsWidth     = []

        // set columns width to 'auto'
        for (let i = 0; i < daysInMonth + 1; i++) {
          colsWidth.push('auto')
        }

        const pdfDefinition = {
          pageMargins: [ 20, 5, 20, 5 ],
          content:     [
            {
              style: 'custom',
              table: {
                widths: colsWidth,
                body:   scheduleTable
              }
            },
            {
              text:     options.message,
              fontSize: 8,
              bold:     true,
              margin:   [0, 10, 0, 0]
            }
          ],
          styles: {
            custom: {
              fontSize: 6,
              bold:     true
            }
          }
        }

        ipcRenderer.on('generate-schedule-reply', (event, arg) => done())
        console.log('generate-schedule')
        ipcRenderer.send('generate-schedule', pdfDefinition, pdfName)
      })
    })
  })
}

function _createScheduleTable (scheduleDocument, done) {
  const year        = parseInt(scheduleDocument.date.year)
  const month       = utils.monthToNum(scheduleDocument.date.month)
  const daysInMonth = scheduleDocument.date.daysInMonth
  const days        = ['PT', 'SO', 'ND', 'PN', 'WT', 'SR', 'CZ']

  console.log('year: ' + year)
  console.log('month: ' + month)
  console.log('daysInMonth: ' + daysInMonth)
  console.log('scheduledocument.schedule: ')
  // console.log(scheduleDocument.schedule)

  const body = _createScheduleHeader(year, month, daysInMonth)
  scheduleDocument.schedule.forEach((_schedule) => {
    const schedule = _.cloneDeep(_schedule)
    schedule.driverSchedule.unshift(schedule.driverId)
    body.push(schedule.driverSchedule)
  })

  // internal counters
  let fromIndex     = 0
  let assignedNs    = 0
  let nightsNum     = 0
  let dayOfTheMonth = -1

  // start from spiecified driver
  // todo: find real index on document list
  let startFromIndex
  const previousDriverId = scheduleDocument.options.previousDriver

  for (let i = 4; i < body.length; i++) {
    console.log(body[i][0])
    if (body[i][0] == previousDriverId) {
      startFromIndex = i
      break
    }
  }
  
  console.log('startFromIndex: ' + startFromIndex)
  console.log(body)

  // populate schedule with Ns (nights)
  days.forEach((day, id) => {
    console.log('search day: ' + day)
    fromIndex = 0
    dayOfTheMonth = 0
    assignedNs = 0
    nightsNum = 0
    
    // the number of drivers per nights
    switch (day) {
      case 'PT':
        nightsNum = scheduleDocument.options.fridayNightNum
        break
      case 'SO':
        nightsNum = scheduleDocument.options.saturdayNightNum
        break
      default:
        nightsNum = scheduleDocument.options.otherNightsNum
    }

    nightsNum = parseInt(nightsNum)
    console.log('nightsNum: ' + nightsNum)
    
    while (true) {
      console.log('dayOfTheMonth: ' + dayOfTheMonth)
      if (assignedNs === 0) {
        // find index of selected day in days row (body[3])
        dayOfTheMonth = _.indexOf(body[3], day, fromIndex)
        if (dayOfTheMonth === -1) break

        fromIndex = dayOfTheMonth + 1
      } else {
        // start from first driver in table
        startFromIndex = 4
      }
      // iterate over all drivers in specified column (day)
      // and add N to pdf document
      for (let i = startFromIndex; i < body.length; i++) {
        // find schedule table for given driver in db
        let driverSchedule = _.find(scheduleDocument.schedule, {driverId: body[i][0]})
        if (driverSchedule && driverSchedule.nocturnalActivity) {
          // add N to specified driver schedule
          driverSchedule.driverSchedule[dayOfTheMonth - 1] = 'N'
        } else {
          continue
        }
        
        body[i][dayOfTheMonth] = 'N'

        assignedNs++
        if (assignedNs === nightsNum) {
          assignedNs = 0
          startFromIndex = i
          startFromIndex++
          if (startFromIndex === body.length) {
            startFromIndex = 4
          }
          break
        }
      }
    }
  })

  const daysNum  = parseInt(scheduleDocument.options.allDaysNum)
  let assignedDs = 0
  startFromIndex = 4
  dayOfTheMonth = 0
  
  while (dayOfTheMonth < daysInMonth) {
    if (assignedDs === 0) {
      dayOfTheMonth++
    } else {
      startFromIndex = 4
    }

    for (let i = startFromIndex; i < body.length; i++) {
      const currentDriverId = parseInt(body[i][0])

      let driverSchedule = _.find(scheduleDocument.schedule, {driverId: currentDriverId})
      if (driverSchedule && driverSchedule.dailyActivity) {
        if (dayOfTheMonth === 0) {
          // check last day from previous month
        } else {
          // check if the current or previous day is not 'N'
          // and if is, skip to next driver
          if (body[i][dayOfTheMonth] === 'N' || body[i][dayOfTheMonth - 1] === 'N') {
            continue
          } else {
            driverSchedule.driverSchedule[dayOfTheMonth - 1] = 'D'
            body[i][dayOfTheMonth] = 'D'
          }
        }
      } else {
        continue
      }

      assignedDs++
      if (assignedDs === daysNum) {
        assignedDs = 0
        startFromIndex = i
        startFromIndex++
        if (startFromIndex === body.length) {
          startFromIndex = 4
        }
        break
      }
    }
  }

  done(null, body, scheduleDocument)
}

function _createScheduleHeader (year, month, daysInMonth) {
  let header = []

  let infoBar = [
    {
      colSpan:   8,
      text:      'HARMONOGRAM DYŻURÓW:\n' + utils.monthToString(month - 1) + ' ' + year,
      alignment: 'center',
      fontSize:  6
    }, '', '', '', '', '', '', '', '', {
      colSpan:   (daysInMonth - 17),
      text:      'Dyżury niedzielne: parzyste 06:00-06:15, nieparzyste: 10:00-10:15',
      alignment: 'center',
      fontSize:  6
    }]
    
  for (let i = 0; i < (daysInMonth - 17); i++) {
    infoBar.push('')
  }
  
  infoBar = infoBar.concat([{
    colSpan:   8,
    text:      'Kontakt z dyspozytornią:\n508 550 111',
    alignment: 'center',
    fontSize:  6
  }, '', '', '', '', '', '', '' ])

  let title = [{
    colSpan:   (daysInMonth + 1),
    text:      'HARMONOGRAM',
    alignment: 'center',
    fontSize:  7
  }]
  let daysNums = []
  let daysNames = []

  for (let i = 0; i < daysInMonth; i++) {
    title.push('')
  }
  for (let i = 1; i < daysInMonth + 1; i++) {
    daysNums.push(i.toString())
  }
  daysNums.unshift({
    rowSpan: 2,
    text:    'NR WYW.'
  })
  for (let i = 0; i < daysInMonth; i++) {
    daysNames.push(utils.numToDay(new Date(year, (month - 1), i).getDay()))
  }
  daysNames.unshift('')
  
  header.push(infoBar, title, daysNums, daysNames)
  return header
}
