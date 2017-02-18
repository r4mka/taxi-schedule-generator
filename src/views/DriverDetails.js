import React                 from 'react'
import DriverTogglePanel     from './DriverTogglePanel'
import DriverRadioPanel      from './DriverRadioPanel'
import NotePad               from './NotePad'

export default class DriverDetails extends React.Component {
  render () {
    return (
      <form className='driver-details'>
        <input
          type='text'
          className='text-input'
          placeholder='Numer wywoławczy' />
        <input
          type='text'
          className='text-input'
          placeholder='Imię i nazwisko' />
        <input
          type='text'
          className='text-input'
          style={{marginBottom: 20}}
          placeholder='Telefon' />
        <hr />
        <div style={{padding: '20px 40px 20px 39px'}}>
          <DriverTogglePanel
            infoBtn={false}
            deleteBtn={true} />
        </div>
        <hr />
        <div style={{padding: '20px 10px'}}>
          <DriverRadioPanel />
        </div>
        <NotePad placeholder='Notatki' />
        <div style={{padding: '20px 32px 0 32px'}}>
          <input
            type='button'
            style={{marginRight: 12}}
            className='regular-btn'
            value='ANULUJ' />
          <input
            type='submit'
            className='regular-btn'
            value='ZAPISZ' />
        </div>
      </form>
    )
  }
}
