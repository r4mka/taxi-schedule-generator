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
        month = 'STYCZEŃ'
        break
      case 1:
        month = 'LUTY'
        break
      case 2:
        month = 'MARZEC'
        break
      case 3:
        month = 'KWIECIEŃ'
        break
      case 4:
        month = 'MAJ'
        break
      case 5:
        month = 'CZERWIEC'
        break
      case 6:
        month = 'LIPIEC'
        break
      case 7:
        month = 'SIERPIEŃ'
        break
      case 8:
        month = 'WRZESIEŃ'
        break
      case 9:
        month = 'PAŻDZIERNIK'
        break
      case 10:
        month = 'LISTOPAD'
        break
      case 11:
        month = 'GRUDZIEŃ'
        break
      default:
        return undefined
    }
    return month
  }
}
