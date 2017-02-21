import React                 from 'react'
import DriverTogglePanel     from './DriverTogglePanel'
import DriverRadioPanel      from './DriverRadioPanel'
import NotePad               from './NotePad'
import AppActions            from '../actions/AppActions'

export default class DriverDetails extends React.Component {
  constructor (props) {
    super(props)
    if (this.props.driver) {
      this.state = {
        driver: this.props.driver
      }
    } else {
      this.state = {
        driver: this.getDefaultDetails()
      }
    }
    this.handleFormChange = this.handleFormChange.bind(this)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
  }

  getDefaultDetails () {
    // generate default driver details
  }

  handleFormChange (event) {
    const target = event.target
    const name   = target.name

    this.setState({
      driver: {
        [name]: target.value
      }
    })
  }

  handleFormSubmit (event) {
    event.preventDefault()
    AppActions.saveDriverDetails(this.state.driver)
    AppActions.hideDriverDetails()
  }

  render () {
    return (
      <form
        className='driver-details' >
        <input
          type='text'
          name='id'
          className='text-input'
          value={this.state.driver.id}
          onChange={this.handleFormChange}
          placeholder='Numer wywoławczy' />
        <input
          type='text'
          name='name'
          className='text-input'
          value={this.state.driver.name}
          onChange={this.handleFormChange}
          placeholder='Imię i nazwisko' />
        <input
          type='text'
          name='phone'
          className='text-input'
          style={{marginBottom: 20}}
          value={this.state.driver.phone}
          onChange={this.handleFormChange}
          placeholder='Telefon' />
        <hr />
        <div style={{padding: '20px 40px 20px 39px'}}>
          <DriverTogglePanel
            driverId={this.state.driver.id}
            generalActivity={this.state.driver.generalActivity}
            dailyActivity={this.state.driver.dailyActivity}
            nocturnalActivity={this.state.driver.nocturnalActivity}
            infoBtn={false}
            deleteBtn={true} />
        </div>
        <hr />
        <div style={{padding: '20px 10px'}}>
          <DriverRadioPanel />
        </div>
        <NotePad
          name='notes'
          value={this.state.driver.notes}
          onChange={this.handleFormChange}
          placeholder='Notatki' />
        <div style={{padding: '20px 32px 0 32px'}}>
          <input
            type='button'
            style={{marginRight: 12}}
            className='regular-btn'
            value='ANULUJ'
            onClick={() => AppActions.hideDriverDetails()} />
          <input
            type='button'
            className='regular-btn'
            value='ZAPISZ'
            onClick={() => this.handleFormSubmit} />
        </div>
      </form>
    )
  }
}

DriverDetails.propTypes = {
  driver: React.PropTypes.object
}
