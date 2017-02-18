import React  from 'react'

export default class DriverFooter extends React.Component {
  render () {
    return (
      <div id='footer' className='toggle-panel-container'>
        <label className='control control--radio'>
          <input type='checkbox' checked='checked' />
          <div className='control__indicator'>wszyscy</div>
        </label>
        <label className='control control--radio'>
          <input type='checkbox' />
          <div className='control__indicator'>dzienni</div>
        </label>
        <label className='control control--radio'>
          <input type='checkbox' />
          <div className='control__indicator'>nocni</div>
        </label>
        <label className='control control--radio'>
          <input type='checkbox' />
          <div className='control__indicator'>urlop</div>
        </label>
        <label className='control control--radio'>
          <input type='checkbox' />
          <div className='control__indicator'>awaria</div>
        </label>
        <label className='control control--radio'>
          <input type='checkbox' />
          <div className='control__indicator'>nieaktywni</div>
        </label>
      </div>
    )
  }
}
