import React            from 'react'
import DriverPanel      from '../views/DriverPanel'
import DriverDetails    from '../views/DriverDetails'
import DriverFooter     from '../views/DriverFooter'
import DriversStore     from '../stores/DriversStore'
import AppActions       from '../actions/AppActions'

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
      drivers:           DriversStore.drivers,
      selectedDriver:    DriversStore.selectedDriver,
      showDriverDetails: DriversStore.showDriverDetails
    }
  }

  renderDriverDetails () {
    if (this.state.showDriverDetails) {
      return <DriverDetails driver={this.state.selectedDriver} />
    } else {
      return null
    }
  }

  render () {
    return (
      <div id='drivers-page'>
        {
          this.state.drivers.map((driver) =>
            <DriverPanel
              key={driver.id}
              driver={driver}
              onClick={() => AppActions.showDriverDetails(driver)} />
          )
        }
        {this.renderDriverDetails()}
        <DriverFooter />
      </div>
    )
  }
}
