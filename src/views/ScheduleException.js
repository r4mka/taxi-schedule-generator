import React   from 'react'
import utils   from '../utils'
import IconBtn from './IconBtn'

export default class ScheduleException extends React.Component {
  render () {
    const { year, month, day } = this.props
    let dayName

    if (year && month && day) {
      dayName = this._findDayName(year, month, day)
    }

    return (
      <div style={{position: 'relative', marginBottom: 12}}>
        <div style={styles.dayContainer}>
          <span style={styles.day}>
            {this.props.day}
          </span>
          <br />
          <span style={{fontSize: 14}}>
            {dayName}
          </span>
        </div>
        <div style={styles.container}>
          <div style={{display: 'inline-block', marginRight: 18}}>
            <label style={{marginRight: 8}}>
              dyżury dzienne
            </label>
            <input
              disabled
              style={styles.input}
              className='text-input'
              value={this.props.dayDrivers} />
          </div>
          <div style={{display: 'inline-block'}}>
            <label style={{marginRight: 8}}>
              dyżury nocne
            </label>
            <input
              disabled
              style={styles.input}
              className='text-input'
              value={this.props.nocturnalDrivers} />
          </div>
        </div>
        <div style={styles.btnContainer}>
          <IconBtn
            icon='app/assets/icon_delete.svg'
            onClick={this.props.deleteException} />
        </div>
      </div>
    )
  }

  _findDayName (year, month, day) {
    const date  = new Date(year, utils.monthToNum(month), day)
    let dayName = ''

    switch (date.getDay()) {
      case 0:
        dayName = 'niedziela'
        break
      case 1:
        dayName = 'poniedziałek'
        break
      case 2:
        dayName = 'wtorek'
        break
      case 3:
        dayName = 'środa'
        break
      case 4:
        dayName = 'czwartek'
        break
      case 5:
        dayName = 'piątek'
        break
      case 6:
        dayName = 'sobota'
        break
    }
    return dayName
  }
}

const styles = {
  dayContainer: {
    display:      'inline-block',
    color:        '#D0011B',
    border:       '1px solid #D0011B',
    textAlign:    'center',
    padding:      3,
    marginRight:  18,
    borderRadius: 2,
    width:        90
  },
  day: {
    fontSize: 18
  },
  input: {
    textAlign:       'center',
    backgroundColor: 'rgba(0,0,0,0.04)',
    width:           36,
    padding:         7,
    margin:          0
  },
  btnContainer: {
    display:   'inline-block',
    position:  'absolute',
    top:       '50%',
    right:     0,
    transform: 'translateY(-50%)'
  },
  container: {
    display:   'inline-block',
    position:  'absolute',
    top:       '50%',
    transform: 'translateY(-50%)'
  }
}
