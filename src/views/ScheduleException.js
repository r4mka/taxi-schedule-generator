import React   from 'react'
import utils   from '../utils'
import IconBtn from './IconBtn'

export default class ScheduleException extends React.Component {
  constructor (props) {
    super(props)
    const _month = utils.monthToNum(this.props.month)
    const date = new Date(this.props.year, _month, this.props.day)

    let dayString = ''
    console.log(date)
    switch (date.getDay()) {
      case 0:
        dayString = 'niedziela'
        break
      case 1:
        dayString = 'poniedziałek'
        break
      case 2:
        dayString = 'wtorek'
        break
      case 3:
        dayString = 'środa'
        break
      case 4:
        dayString = 'czwartek'
        break
      case 5:
        dayString = 'piątek'
        break
      case 6:
        dayString = 'sobota'
        break
    }
    this.dayString = dayString
    console.log(dayString)
  }
  render () {
    return (
      <div style={{position: 'relative', marginBottom: 12}}>
        <div style={styles.dayContainer}>
          <span style={styles.day}>
            {this.props.day}
          </span>
          <br/>
          <span style={{fontSize: 14}}>
            {this.dayString}
          </span>
        </div>
        <div style={styles.container}>
          <div style={{display: 'inline-block', marginRight: 24}}>
            <label style={{marginRight: 12}}>
              d. dzienne
            </label>
            <input
              disabled
              style={styles.input}
              className='text-input'
              value={this.props.dayDrivers} />
          </div>
          <div style={{display: 'inline-block'}}>
            <label style={{marginRight: 12}}>
              d. nocne
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
            disabled={this.props.isDriverNew}
            onClick={this.handleDriverRemoval} />
        </div>
      </div>
    )
  }
}

ScheduleException.propTypes = {
  status:   React.PropTypes.oneOf(['pracuje', 'urlop', 'awaria']).isRequired,
  onChange: React.PropTypes.func.isRequired
}

const styles = {
  dayContainer: {
    display:         'inline-block',
    color:           '#D0011B',
    border:          '1px solid #D0011B',
    textAlign:       'center',
    padding:         3,
    marginRight:     44,
    borderRadius:    2,
    width:           80
  },
  day: {
    fontSize:  18
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

