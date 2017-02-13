import React         from 'react'
import DriverPanel   from '../views/DriverPanel'
import DriverDetails from '../views/DriverDetails'
import DriverFooter  from '../views/DriverFooter'

export default class DriversContainer extends React.Component {
  render () {
    return (
      <div id='driversPage'>
        <DriverPanel />
        <DriverDetails />
        <DriverFooter />
      </div>
    )
  }
}
