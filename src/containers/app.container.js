import React          from 'react'
import Header         from '../views/Header'
import Popup          from '../views/Popup'
import AppActions     from '../actions/AppActions'
import StorageService from '../services/StorageService'
import AppStore       from '../stores/AppStore'

export default class AppContainer extends React.Component {
  constructor (props) {
    super(props)
    this.state = this.getAppState()
    this.onChange = this.onChange.bind(this)
  }

  componentDidMount () {
    AppStore.addChangeListener(this.onChange)

    // load drivers from database on app start up
    StorageService.getDrivers((err, drivers) => {
      if (err) {
        console.error(err)
        return
      }
      AppActions.loadDrivers(drivers)
    })

    // Welcome popup
    // AppActions.showPopup({
    //   header:         'To jest testowy nagłówek',
    //   description:    'Tutaj będzie jakiś dłuższy opis. Tutaj będzie jakiś dłuższy opis',
    //   hint:           'Miejsce na podpowiedź',
    //   submitBtnLabel: 'Ok'
    // })
  }

  componentWillUnmount () {
    AppStore.removeChangeListener(this.onChange)
  }

  onChange () {
    this.setState(this.getAppState())
  }

  getAppState () {
    return {
      popup: AppStore.popup
    }
  }

  render () {
    return (
      <div>
        <Header />
        <div id='content-page'>
          <Popup
            isOpen={this.state.popup.isOpen}
            header={this.state.popup.header}
            description={this.state.popup.description}
            hint={this.state.popup.hint}
            handleSubmitBtn={this.state.popup.handleSubmitBtn}
            submitBtnLabel={this.state.popup.submitBtnLabel}
            handleCancelBtn={this.state.popup.handleCancelBtn}
            cancelBtnLabel={this.state.popup.cancelBtnLabel} />
          {this.props.children}
        </div>
      </div>
    )
  }
}
