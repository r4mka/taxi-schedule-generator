import React from 'react'
import CommonSelector from './CommonSelector'

export default class CreateScheduleException extends React.Component {
  render () {
    return (
      <div className='modal'>
        <div style={styles.container}>
          <h3 style={{marginBottom: 30}}>
            Dodaj wyjątek
          </h3>

          <CommonSelector
            placeholder='Wybierz dzień'
            name='dayDate'
            value={this.props.dayDate}
            onChange={this.props.setScheduleException}
            options={this.props.selectableDays} />

          <div>
            <label style={{marginRight: 12}}>
              dyżury dzienne
            </label>
            <input
              type='number'
              min='0'
              name='dayDrivers'
              style={{width: 80}}
              className='text-input'
              value={this.props.dayDrivers}
              onChange={this.props.setScheduleException} />
          </div>

          <div style={{marginBottom: 20}}>
            <label style={{marginRight: 24}}>
              dyżury nocne
            </label>
            <input
              type='number'
              min='0'
              name='nocturnalDrivers'
              style={{width: 80}}
              className='text-input'
              value={this.props.nocturnalDrivers}
              onChange={this.props.setScheduleException} />
          </div>

          <input
            type='button'
            className='regular-btn'
            value='ANULUJ'
            onClick={this.props.hideWindow} />
          <input
            type='button'
            className='regular-btn'
            value='DODAJ'
            onClick={() => this.props.addScheduleException({
              dayDate:          this.props.dayDate,
              dayDrivers:       this.props.dayDrivers,
              nocturnalDrivers: this.props.nocturnalDrivers
            })} />
        </div>
      </div>
    )
  }
}

const styles = {
  container: {
    position:        'absolute',
    top:             '50%',
    left:            '50%',
    transform:       'translate(-50%, -50%)',
    padding:         40,
    borderRadius:    2,
    backgroundColor: '#FFF'
  }
}
