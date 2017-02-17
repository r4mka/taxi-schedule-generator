import React                 from 'react'
import DriverTogglePanel     from './DriverTogglePanel'
import { Form, FormControl,
         FormGroup, Button } from 'react-bootstrap'

export default class DriverDetails extends React.Component {
  render () {
    return (
      <div className='driverDetails'>
        <Form>
          <FormGroup>
            <FormControl
              type='text'
              className='driverFormControl'
              placeholder='Numer wywoławczy' />
            <FormControl
              type='text'
              className='driverFormControl'
              placeholder='Imię i nazwisko' />
            <FormControl
              type='text'
              className='driverFormControl'
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
              <Button
                style={{marginRight: 12}}
                className='btn-dual-state'>
                PRACUJE
              </Button>
              <Button
                style={{marginRight: 12}}
                className='btn-dual-state'>
                URLOP
              </Button>
              <Button
                className='btn-dual-state'>
                AWARIA
              </Button>
              
            </div>
            <FormControl
              componentClass='textarea'
              className='driverTextarea'
              placeholder='Notatki' />
            <div style={{padding: '20px 32px 0 32px'}}>
              <Button
                style={{marginRight: 12}}
                className='regular-btn'>
                ANULUJ
              </Button>
              <Button
                className='regular-btn'>
                ZAPISZ
              </Button>
            </div>
          </FormGroup>
        </Form>
      </div>
    )
  }
}
