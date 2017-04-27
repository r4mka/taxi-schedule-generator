import React         from 'react'
import DriverPanel   from '../views/DriverPanel'
import DriverDetails from '../views/DriverDetails'
import DriverFooter  from '../views/DriverFooter'
import DriversStore  from '../stores/DriversStore'
import AppActions    from '../actions/AppActions'

export default class DriversContainer extends React.Component {
  constructor (props) {
    super(props)
  
    this.state = this.getDriversState()
    this._onChange = this._onChange.bind(this)
  }

  componentDidMount () {
    DriversStore.addChangeListener(this._onChange)
  }

  componentWillUnmount () {
    DriversStore.removeChangeListener(this._onChange)
  }

  _onChange () {
    this.setState(this.getDriversState())
  }

  getDriversState () {
    return {
      drivers:       DriversStore.drivers,
      driverDetails: DriversStore.driverDetails,
      isDriverNew:   DriversStore.isDriverNew,
      driverFilters: DriversStore.driverFilters
    }
  }

  render () {
    return (
      <div id='drivers-page'>
        <button
          className='round-btn'
          onClick={() => AppActions.showDriverDetails(null)}>
          <img src='app/assets/icon_dodaj.svg' />
        </button>
        <div
          className='centered-div'
          style={{flexWrap: 'wrap'}}>
          {
            this.state.drivers.map((driver) =>
              <DriverPanel
                key={driver._id}
                driver={driver}
                onClick={() => AppActions.showDriverDetails(driver)} />
            )
          }
        </div>
        {
          this.state.driverDetails
          ? <DriverDetails
            isDriverNew={this.state.isDriverNew}
            driver={this.state.driverDetails} />
          : null
        }
        <DriverFooter filters={this.state.driverFilters} />
      </div>
    )
  }
}
