import React             from 'react'
import DriverTogglePanel from './DriverTogglePanel'
import DriverRadioPanel  from './DriverRadioPanel'
import NotePad           from './NotePad'
import AppActions        from '../actions/AppActions'
import DriversStore      from '../stores/DriversStore'

export default class DriverDetails extends React.Component {
  constructor (props) {
    super(props)
    if (this.props.driver) {
      this.state = this.props.driver
    } else {
      this.state = this.getDefaultDetails()
    }
    this.handleFormChange = this.handleFormChange.bind(this)
  }

  getDefaultDetails () {
    return {
      id:                DriversStore.getUniqueId(),
      name:              '',
      phone:             '',
      notes:             '',
      status:            'pracuje',
      generalActivity:   true,
      dailyActivity:     true,
      nocturnalActivity: true,
      scheduleHistory:   []
    }
  }

  handleFormChange (event) {
    if (event) {
      const target = event.target
      const name   = target.name
      let value  = target.type === 'checkbox' ? target.checked : target.value

      this.setState({
        [name]: value
      })
    } else {
      // Toggle.js is not regular input element
      // and must be handled this way
      this.setState((prevState) => ({
        generalActivity: !prevState.generalActivity
      }))
    }
  }

  render () {
    return (
      <div className='modal'>
        <div style={{position: 'relative', width: '100%', height: '100%'}}>
          <form
            className='driver-details' >
            <input
              type='text'
              name='id'
              className='text-input'
              value={this.state.id}
              onChange={this.handleFormChange}
              placeholder='Numer wywoławczy' />
            <input
              type='text'
              name='name'
              className='text-input'
              value={this.state.name}
              onChange={this.handleFormChange}
              placeholder='Imię i nazwisko' />
            <input
              type='text'
              name='phone'
              className='text-input'
              style={{marginBottom: 20}}
              value={this.state.phone}
              onChange={this.handleFormChange}
              placeholder='Telefon' />
            <hr />
            <div style={{padding: '20px 40px 20px 39px'}}>
              <DriverTogglePanel
                generalActivity={this.state.generalActivity}
                dailyActivity={this.state.dailyActivity}
                nocturnalActivity={this.state.nocturnalActivity}
                onToggle={this.handleFormChange}
                deleteBtn />
            </div>
            <hr />
            <div style={{padding: '20px 10px'}}>
              <DriverRadioPanel
                status={this.state.status}
                onChange={this.handleFormChange} />
            </div>
            <NotePad
              name='notes'
              value={this.state.notes}
              onChange={this.handleFormChange}
              placeholder='Notatki' />
            <div className='centered-div' style={{marginTop: '20px'}}>
              <input
                type='button'
                className='regular-btn'
                value='ANULUJ'
                onClick={() => AppActions.hideDriverDetails()} />
              <input
                type='button'
                className='regular-btn'
                value='ZAPISZ'
                onClick={() => this.props.handleSaveBtn(this.state)} />
            </div>
          </form>
        </div>
      </div>
    )
  }
}
