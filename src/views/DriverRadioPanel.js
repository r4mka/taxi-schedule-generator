import React  from 'react'

export default class DriverRadioPanel extends React.Component {
  render () {
    return (
      <div className='togglePanelContainer'>
        <label className='control control--radio'>
          <input type='radio' name='radio' checked='checked' />
          <div className='control__indicator'>pracuje</div>
        </label>
        <label className='control control--radio'>
          <input type='radio' name='radio' />
          <div className='control__indicator'>urlop</div>
        </label>
        <label className='control control--radio'>
          <input type='radio' name='radio' />
          <div className='control__indicator'>awaria</div>
        </label>
      </div>
    )
  }
}
