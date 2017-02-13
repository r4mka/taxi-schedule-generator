import React      from 'react'
import { Button } from 'react-bootstrap'

export default class DriverFooter extends React.Component {
  render () {
    return (
      <div id='footer'>
        <Button
          style={{marginRight: 12}}
          className='btn-dual-state'>
          WSZYSCY
        </Button>
        <Button
          style={{marginRight: 12}}
          className='btn-dual-state'>
          DZIENNI
        </Button>
        <Button
          style={{marginRight: 12}}
          className='btn-dual-state'>
          NOCNI
        </Button>
        <Button
          style={{marginRight: 12}}
          className='btn-dual-state'>
          URLOP
        </Button>
        <Button
          style={{marginRight: 12}}
          className='btn-dual-state'>
          AWARIA
        </Button>
        <Button
          className='btn-dual-state'>
          NIEAKTYWNI
        </Button>
      </div>
    )
  }
}
