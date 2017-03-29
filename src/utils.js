'use strict'

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

  monthToString: function (num) {
    let month = ''
    switch (num) {
      case 0:
        month = 'styczeń'
        break
      case 1:
        month = 'luty'
        break
      case 2:
        month = 'marzec'
        break
      case 3:
        month = 'kwiecień'
        break
      case 4:
        month = 'maj'
        break
      case 5:
        month = 'czerwiec'
        break
      case 6:
        month = 'lipiec'
        break
      case 7:
        month = 'sierpień'
        break
      case 8:
        month = 'wrzesień'
        break
      case 9:
        month = 'pażdziernik'
        break
      case 10:
        month = 'listopad'
        break
      case 11:
        month = 'grudzień'
        break
      default:
        return undefined
    }
    return month
  },

  monthToNum: function (month) {
    let monthNum = ''
    switch (month) {
      case 'styczeń':
        monthNum = 0
        break
      case 'luty':
        monthNum = 1
        break
      case 'marzec':
        monthNum = 2
        break
      case 'kwiecień':
        monthNum = 3
        break
      case 'maj':
        monthNum = 4
        break
      case 'czerwiec':
        monthNum = 5
        break
      case 'lipiec':
        monthNum = 6
        break
      case 'sierpień':
        monthNum = 7
        break
      case 'wrzesień':
        monthNum = 8
        break
      case 'październik':
        monthNum = 9
        break
      case 'listopad':
        monthNum = 10
        break
      case 'grudzień':
        monthNum = 11
        break
      default:
        return undefined
    }
    return (monthNum)
  },
  
  padNumber (num) {
    if (num < 100) {
      if (num < 10) {
        return '00' + num
      } else {
        return '0' + num
      }
    } else {
      return num
    }
  }
}
