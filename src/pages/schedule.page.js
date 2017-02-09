import React               from 'react'
import { Form, FormControl,
         ControlLabel,
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
            <FormControl componentClass='select' placeholder='select'>
              <option value='select'>select</option>
              <option value='other'>...</option>
            </FormControl>
            <hr />
            <h3>
              Kierowca który zamykał grafik w ubiegłym miesiącu
            </h3>
            <FormControl componentClass='select' placeholder='select'>
              <option value='select'>select</option>
              <option value='other'>...</option>
            </FormControl>
            <hr />
            <h3>
              Liczba kierowców na poszczególnych dyżurach
            </h3>
          </FormGroup>
        </Form>
      </div>
    )
  }
}
