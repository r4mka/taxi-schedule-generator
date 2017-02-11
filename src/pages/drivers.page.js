import React  from 'react'
import Driver from '../components/Driver'

export default class DriversPage extends React.Component {
  render () {
    return (
      <div id='driversPage'>
        <Driver />        
        <div id='footer' />
      </div>
    )
  }
}
