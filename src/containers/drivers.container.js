import React            from 'react'
import DriverPanel      from '../views/DriverPanel'
import DriverDetails    from '../views/DriverDetails'
import DriverFooter     from '../views/DriverFooter'
import DriversStore     from '../stores/DriversStore'

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
      drivers: DriversStore.drivers
    }
  }

  render () {
    return (
      <div id='drivers-page'>
        {
          this.state.drivers.map((driver) =>
            <DriverPanel key={driver.id} driver={driver} />
          )
          // <DriverDetails />
        }
        <DriverFooter />
      </div>
    )
  }
}
