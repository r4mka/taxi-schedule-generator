import React      from 'react'
import AppActions from '../actions/AppActions'
import utils      from '../utils'
import Checkbox   from './Checkbox'

export default class PreviousMonthDrivers extends React.Component {
  render () {
    if (!this.props.drivers) return null
    return (
      <div className='modal'>
        <div style={{
          position: 'relative',
          width:    '100%',
          height:   '100%'
        }}>
          <form
            className='driver-details'
            style={{height: 'initial', width: 'initial'}}>
            <h3>
              Zaznacz którzy kierowcy mieli nocki w ostatnim
              dniu poprzedniego miesiąca:
            </h3>
            {
              this.props.drivers.map((driver) =>
                <Checkbox
                  key={driver.id}
                  label={utils.padNumber(driver.id).toString()}
                  handleCheckboxChange={AppActions.togglePreviousMonthDriver} />
              )
            }
            <div className='centered-div' style={{marginTop: '20px'}}>
              <input
                type='button'
                className='regular-btn'
                value='ANULUJ'
                onClick={() => AppActions.hidePreviousMonthDrivers()} />
              <input
                type='button'
                className='regular-btn'
                value='GENERUJ'
                onClick={this.props.onSubmit} />
            </div>
          </form>
        </div>
      </div>
    )
  }
}
