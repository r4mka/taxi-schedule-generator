import React          from 'react'
import Header         from '../views/Header'
import AppActions     from '../actions/AppActions'
import StorageService from '../services/StorageService'

export default class AppContainer extends React.Component {
  componentDidMount () {
    // load drivers from database on app start up
    StorageService.getDrivers((err, drivers) => {
      if (err) {
        console.error(err)
        return
      }
      console.log(drivers)
      AppActions.loadDrivers(drivers)
    })
  }

  render () {
    return (
      <div>
        <Header />
        <div id='content-page'>
          {this.props.children}
        </div>
      </div>
    )
  }
}
