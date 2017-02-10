import React               from 'react'
import { Form, FormControl,
         FormGroup }    from 'react-bootstrap'

export default class SchedulePage extends React.Component {
  render () {
    return (
      <div id='schedulePage'>
        <Form>
          <FormGroup controlId='formControlsSelect'>
            <h3>
              Miesiąc na który ma zostać utworzony grafik
            </h3>
            <FormControl
              componentClass='select'
              placeholder='select'
              style={{width: 113}}>
              <option value='select'>select</option>
              <option value='other'>...</option>
            </FormControl>
            <hr />
            <h3>
              Kierowca który zamykał grafik w ubiegłym miesiącu
            </h3>
            <FormControl
              componentClass='select'
              placeholder='select'
              style={{width: 113}}>
              <option value='select'>select</option>
              <option value='other'>...</option>
            </FormControl>
            <hr />
            <h3>
              Liczba kierowców na poszczególnych dyżurach
            </h3>

            <p className='dutyText' style={{marginRight: 8}}>
              DYŻURY DZIENNE
            </p>
            <FormControl
              componentClass='select'
              placeholder='select'
              style={{width: 93}}>
              <option value='select'>select</option>
              <option value='other'>...</option>
            </FormControl>
            <br />
            <p className='dutyText' style={{marginRight: 16}}>
              DYŻURY NOCNE
            </p>
            <FormControl
              componentClass='select'
              placeholder='select'
              style={{width: 80}}>
              <option value='select'>select</option>
              <option value='other'>...</option>
            </FormControl>
            <FormControl
              componentClass='select'
              placeholder='select'
              style={{width: 67}}>
              <option value='select'>select</option>
              <option value='other'>...</option>
            </FormControl>
            <FormControl
              componentClass='select'
              placeholder='select'
              style={{width: 72, marginRight: 0}}>
              <option value='select'>select</option>
              <option value='other'>...</option>
            </FormControl>
            <hr />
            <h3>
              Wiadomość dla kierowców
            </h3>
            <FormControl
              componentClass='textarea'
              placeholder='Maksymalnie 220 znaków' />
          </FormGroup>
        </Form>
      </div>
    )
  }
}
