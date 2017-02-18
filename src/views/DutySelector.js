import React from 'react'

export default class DutySelector extends React.Component {
  render () {
    return (
      <div className='selector'>
        <h3>
          {this.props.header}
        </h3>
        
        <div style={{marginTop: 12}}>
          <label style={{marginRight: 12}}>
            dyżury dzienne
          </label>
          <div className='select inline'>
            <select required>
              <option disabled selected hidden value=''>
                Cały tydzień
              </option>
              <option>First</option>
              <option>Option</option>
              <option>Option</option>
            </select>
            <img src='./app/assets/strzalki.svg' className='select-arrow' />
          </div>
        </div>

        <div style={{marginTop: 12}}>
          <label style={{marginRight: 24}}>
            dyżury nocne
          </label>
          <div className='select inline' style={{marginRight: 12}}>
            <select required>
              <option disabled selected hidden value=''>
                W tygodniu
              </option>
              <option>First</option>
              <option>Option</option>
              <option>Option</option>
            </select>
            <img src='./app/assets/strzalki.svg' className='select-arrow' />
          </div>
          <div className='select inline' style={{marginRight: 12}}>
            <select required>
              <option disabled selected hidden value=''>
                W piątki
              </option>
              <option>First</option>
              <option>Option</option>
              <option>Option</option>
            </select>
            <img src='./app/assets/strzalki.svg' className='select-arrow' />
          </div>
          <div className='select inline'>
            <select required>
              <option disabled selected hidden value=''>
                W soboty
              </option>
              <option>First</option>
              <option>Option</option>
              <option>Option</option>
            </select>
            <img src='./app/assets/strzalki.svg' className='select-arrow' />
          </div>
        </div>
      </div>
    )
  }
}
