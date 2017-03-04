import React             from 'react'
import DriverRadioPanel  from './DriverRadioPanel'
import NotePad           from './NotePad'
import ToggleSwitch      from './ToggleSwitch'
import ToggleBtn         from './ToggleBtn'
import IconBtn           from './IconBtn'
import AppActions        from '../actions/AppActions'
import DriversStore  from '../stores/DriversStore'

export default class DriverDetails extends React.Component {
  constructor (props) {
    super(props)
    
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
    this.idMustBePositive = {
      header:         'Uwaga!',
      description:    'Numery wywoławczy musi być większy od 0',
      hint:           'Podaj dodatni numer wywoławczy',
      submitBtnLabel: 'zamknij'
    }

    this.handleDetailsChange = this.handleDetailsChange.bind(this)
    this.handleDetailsSubmit = this.handleDetailsSubmit.bind(this)
    this.handleToggleSwitch = this.handleToggleSwitch.bind(this)
    this.handleDriverRemoval = this.handleDriverRemoval.bind(this)
  }

  handleDriverRemoval (event) {
    const that = this
    event.preventDefault()
    AppActions.showPopup({
      header:          'Uwaga!',
      description:     'Czy na pewno usunąć tego kierowcę?',
      submitBtnLabel:  'tak',
      handleSubmitBtn: () => deleteDriver(),
      cancelBtnLabel:  'nie',
      handleCancelBtn: AppActions.hidePopup
    })

    function deleteDriver () {
      AppActions.deleteDriver(that.props.driver._id)
      AppActions.hidePopup()
      AppActions.hideDriverDetails()
    }
  }

  handleToggleSwitch () {
    const driver = {
      generalActivity: !this.props.driver.generalActivity
    }
    AppActions.updateDriverDetails(driver)
  }

  handleDetailsChange (event) {
    const target = event.target
    const name   = target.name
    let value  = target.type === 'checkbox' ? target.checked : target.value
    
    if (name === 'id' && value) {
      value = parseInt(value)
    }

    const driver = {
      [name]: value
    }
    AppActions.updateDriverDetails(driver)
  }

  handleDetailsSubmit () {
    if (!this.props.driver.id && this.props.driver.id !== 0) {
      return AppActions.showPopup(this.idRequiredPopup)
    }

    if (this.props.driver.id < 1) {
      return AppActions.showPopup(this.idMustBePositive)
    }

    if (!DriversStore.isIdUnique(this.props.driver.id)) {
      return AppActions.showPopup(this.notUniqueIdPopup)
    }

    if (this.props.isDriverNew) {
      AppActions.addDriver(this.props.driver)
    } else {
      AppActions.updateDriver(this.props.driver)
    }

    AppActions.hideDriverDetails()
  }

  render () {
    return (
      <div className='modal'>
        <div style={{position: 'relative', width: '100%', height: '100%'}}>
          <form
            className='driver-details' >
            <input
              type='number'
              min='1'
              name='id'
              className='text-input'
              value={this.props.driver.id}
              onChange={this.handleDetailsChange}
              placeholder='Numer wywoławczy' />
            <input
              type='text'
              name='name'
              className='text-input'
              value={this.props.driver.name}
              onChange={this.handleDetailsChange}
              placeholder='Imię i nazwisko' />
            <input
              type='text'
              name='phone'
              className='text-input'
              style={{marginBottom: 20}}
              value={this.props.driver.phone}
              onChange={this.handleDetailsChange}
              placeholder='Telefon' />
            <hr />
            <div
              style={{padding: '20px 40px 20px 39px'}}
              className='toggle-panel-container'>
              <ToggleSwitch
                toggle={this.props.driver.generalActivity}
                onToggle={this.handleToggleSwitch} />
              <ToggleBtn
                name='dailyActivity'
                icon='app/assets/sunny.svg'
                toggle={this.props.driver.dailyActivity}
                onToggle={this.handleDetailsChange} />
              <ToggleBtn
                name='nocturnalActivity'
                icon='app/assets/moon.svg'
                toggle={this.props.driver.nocturnalActivity}
                onToggle={this.handleDetailsChange} />
              <IconBtn
                icon='app/assets/icon_delete.svg'
                disabled={this.props.isDriverNew}
                onClick={this.handleDriverRemoval} />
            </div>
            <hr />
            <div style={{padding: '20px 10px'}}>
              <DriverRadioPanel
                status={this.props.driver.status}
                onChange={this.handleDetailsChange} />
            </div>
            <NotePad
              name='notes'
              value={this.props.driver.notes}
              onChange={this.handleDetailsChange}
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
                value={this.props.isDriverNew ? 'DODAJ' : 'ZAPISZ'}
                onClick={this.handleDetailsSubmit} />
            </div>
          </form>
        </div>
      </div>
    )
  }
}
