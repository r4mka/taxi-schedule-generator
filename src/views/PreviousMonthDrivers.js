import React      from 'react'
import AppActions from '../actions/AppActions'

export default class PreviousMonthDrivers extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <div className='modal'>
        <div style={{
          position: 'relative',
          width:    '100%',
          height:   '100%'
        }}>
          <form className='driver-details'>
            <h1>Tu będą checkboxy</h1>
            <div className='centered-div' style={{marginTop: '20px'}}>
              <input
                type='button'
                className='regular-btn'
                value='ANULUJ'
                onClick={() => AppActions.hidePreviousMonthDrivers()} />
            </div>
          </form>
        </div>
      </div>
    )
  }
}
