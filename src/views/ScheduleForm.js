import React          from 'react'
import AppActions     from '../actions/AppActions'
import CommonSelector from '../views/CommonSelector'
import NotePad        from '../views/NotePad'

export default class ScheduleForm extends React.Component {
  render () {
    return (
      <form>
        <h3>Miesiąc na który ma zostać utworzony grafik</h3>
        <div
          style={{marginRight: 12}}
          className='select inline'>
          <input
            type='number'
            min='0'
            style={{width: 125}}
            className='text-input'
            value={this.state.year}
            onChange={(e) => AppActions.setScheduleYear(e.target.value)}
            placeholder='Wybierz rok' />
        </div>
        <CommonSelector
          placeholder='Wybierz miesiąc'
          value={this.state.month}
          onChange={AppActions.setScheduleMonth}
          options={this.state.selectableMonths} />
        <hr />
        <h3>Kierowca który zamykał grafik w ubiegłym miesiącu</h3>
        <CommonSelector
          placeholder='Wybierz kierowcę'
          value={this.state.previousScheduleDriver}
          onChange={AppActions.setPreviousScheduleDriver}
          options={this.state.selectableDriversIds} />
        <hr />
        
        <div className='selector'>
          <h3>
            {this.props.header}
          </h3>
          <div style={{marginTop: 12}}>
            <label style={{marginRight: 12}}>
              dyżury dzienne
            </label>
            <div className='select inline'>
              <input
                type='number'
                min='0'
                style={{width: 140}}
                className='text-input'
                value={this.props.numberOfDriversPerAllDays}
                onChange={(e) => AppActions.setNumberOfDriversPerAllDays(e.target.value)}
                placeholder='Cały tydzień' />
            </div>
          </div>

          <div style={{marginTop: 12}}>
            <label style={{marginRight: 24}}>
              dyżury nocne
            </label>
            <div className='select inline' style={{marginRight: 12}}>
              <input
                type='number'
                min='0'
                style={{width: 120}}
                className='text-input'
                value={this.props.numberOfDriversPerOtherNights}
                onChange={(e) => AppActions.setNumberOfDriversPerOtherNights(e.target.value)}
                placeholder='W tygodniu' />
            </div>
            <div className='select inline' style={{marginRight: 12}}>
              <input
                type='number'
                min='0'
                style={{width: 100}}
                className='text-input'
                value={this.props.numberOfDriversPerFridayNight}
                onChange={(e) => AppActions.setNumberOfDriversPerFridayNight(e.target.value)}
                placeholder='W piątki' />
            </div>
            <div className='select inline'>
              <input
                type='number'
                min='0'
                style={{width: 108}}
                className='text-input'
                value={this.props.numberOfDriversPerSaturdayNight}
                onChange={(e) => AppActions.setNumberOfDriversPerSaturdayNight(e.target.value)}
                placeholder='W soboty' />
            </div>
          </div>
        </div>
    

        <hr />
        <NotePad
          style={{width: 488, height: 142}}
          header='Wiadomość dla kierowców'
          placeholder='Maksymalnie 220 znaków' />
      </form>
    )
  }
}
