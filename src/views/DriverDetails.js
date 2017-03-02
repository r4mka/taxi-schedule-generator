import React             from 'react'
import DriverRadioPanel  from './DriverRadioPanel'
import NotePad           from './NotePad'
import ToggleSwitch      from './ToggleSwitch'
import ToggleBtn         from './ToggleBtn'
import IconBtn           from './IconBtn'
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
    this.handleDriverRemoval = this.handleDriverRemoval.bind(this)
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

  handleDriverRemoval (event) {
    const that = this
    event.preventDefault()
    AppActions.showPopup({
      header:          'Uwaga!',
      description:     'Czy na pewno usunąć kierowcę o numerze ' + this.state.id,
      submitBtnLabel:  'tak',
      handleSubmitBtn: () => deleteDriver(),
      cancelBtnLabel:  'nie',
      handleCancelBtn: AppActions.hidePopup
    })

    function deleteDriver () {
      AppActions.deleteDriver(that.state._id)
      AppActions.hidePopup()
      AppActions.hideDriverDetails()
    }
  }

  handleFormChange (event) {
    const target = event.target
    const name   = target.name
    const value  = target.type === 'checkbox' ? target.checked : target.value

    this.setState({
      [name]: value
    })
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
            <div
              style={{padding: '20px 40px 20px 39px'}}
              className='toggle-panel-container'>
              <ToggleSwitch
                toggle={this.state.generalActivity}
                onToggle={() => {
                  this.setState(prevState => (
                    {generalActivity: !prevState.generalActivity}
                  ))
                }} />
              <ToggleBtn
                name='dailyActivity'
                icon='app/assets/sunny.svg'
                toggle={this.state.dailyActivity}
                onToggle={this.handleFormChange} />
              <ToggleBtn
                name='nocturnalActivity'
                icon='app/assets/moon.svg'
                toggle={this.state.nocturnalActivity}
                onToggle={this.handleFormChange} />
              <IconBtn
                icon='app/assets/delete.svg'
                onClick={this.handleDriverRemoval} />
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
