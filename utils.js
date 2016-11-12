
"use strict"

module.exports = {
	numToDay: function (num) {
		let day = ''
		switch (num) {
			case 0:
				day = 'PN'
				break
			case 1:
				day = 'WT'
				break
			case 2:
				day = 'SR'
				break
			case 3:
				day = 'CZ'
				break
			case 4:
				day = 'PT'
				break
			case 5:
				day = 'SO'
				break
			case 6:
				day = 'ND'
				break
			default:
				return undefined
		}
		return day
	},

	addDriver: function (driver, db, cb) {
	  if (!cb) return
	  let document = {}
	  document.docType = 'driver'
	  document.id = driver.id
	  document.scheduleHistory = []

	  db.insert(document, (err, doc) => {
	    if (err) {
	      console.log(err)
	      cb(null)
	    } else {
	      if (doc !== null) {
	        console.log('driver added')
	        cb(doc)
	      } else {
	      	console.log('can not add driver')
	        cb(null)
	      }
	    }
	  })
	},

	updateDriver: function (id, data, db, cb) {
		if (!cb) return
	  db.update({docType: 'driver', id: id}, {$set: data}, {returnUpdatedDocs: true}, function (err, numReplaced, affectedDocument) {
	  	if (err) {
	  		console.log(err)
	  		cb(null)
	  	} else {
	  		if (numReplaced > 0) {
	  			// console.log('driver (id: ' + id + ') updated')
	  			// console.log(affectedDocument.scheduleHistory[0].schedule)
	  			cb(affectedDocument)
	  		} else {
	  			cb(null)
	  		}
	  	}
	  })
	},

	getDrivers: function (db, cb) {
	  if (!cb) return
	  db.find({docType: 'driver'}, function (err, doc) {
	    if (err) {
	    	console.log('err')
	      cb(null)
	    } else {
	    	cb(doc)
	    }
	  })
	}
}