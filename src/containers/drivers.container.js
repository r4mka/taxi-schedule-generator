import React         from 'react'
import DriverPanel   from '../views/DriverPanel'
import DriverDetails from '../views/DriverDetails'
import DriverFooter  from '../views/DriverFooter'
import DriversStore  from '../stores/DriversStore'
import AppActions    from '../actions/AppActions'
import _             from 'lodash'

export default class DriversContainer extends React.Component {
  constructor (props) {
    super(props)
  
    this.state = this.getDriversState()
  
    this.notUniqueIdPopup = {
      header:         'Uwaga!',
      description:    'Kierowca z podanym numerem wywoławczym już istnieje',
      hint:           'Podaj unikalny numer wywoławczy',
      submitBtnLabel: 'zamknij'
    }
    this.idRequiredPopup = {
      header:         'Uwaga!',
      description:    'Numery wywoławczy kierowcy musi być uzupełniony',
      hint:           'Podaj unikalny numer wywoławczy',
      submitBtnLabel: 'zamknij'
    }
  
    this._onChange = this._onChange.bind(this)
    this.updateDriver = this.updateDriver.bind(this)
    this.addDriver = this.addDriver.bind(this)
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
      drivers:           DriversStore.drivers,
      selectedDriverId:  DriversStore.selectedDriverId,
      showDriverDetails: DriversStore.showDriverDetails
    }
  }

  updateDriver (driver) {
    if (!driver.id) {
      AppActions.showPopup(this.idRequiredPopup)
      return
    }

    if (DriversStore.isIdUnique(driver.id)) {
      AppActions.updateDriver(driver)
      AppActions.hideDriverDetails()
    } else {
      AppActions.showPopup(this.notUniqueIdPopup)
    }
  }

  addDriver (driver) {
    if (!driver.id) {
      AppActions.showPopup(this.idRequiredPopup)
      return
    }

    if (DriversStore.isIdUnique(driver.id)) {
      AppActions.addDriver(driver)
      AppActions.hideDriverDetails()
    } else {
      AppActions.showPopup(this.notUniqueIdPopup)
    }
  }

  render () {
    let driverDetails
    if (this.state.showDriverDetails) {
      if (this.state.selectedDriverId) {
        let driver = _.find(this.state.drivers, {id: this.state.selectedDriverId})
        driverDetails = <DriverDetails handleSaveBtn={this.updateDriver} driver={driver} />
      } else {
        driverDetails = <DriverDetails handleSaveBtn={this.addDriver} />
      }
    } else {
      driverDetails = null
    }

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
                key={driver.id}
                driver={driver}
                onClick={() => AppActions.showDriverDetails(driver.id)} />
            )
          }
        </div>
        {driverDetails}
        <DriverFooter />
      </div>
    )
  }
}
