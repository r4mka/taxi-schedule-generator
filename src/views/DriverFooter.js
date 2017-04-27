import React      from 'react'
import AppActions from '../actions/AppActions'

export default class DriverFooter extends React.Component {
  areFiltersEnabled (filters) {
    let enabled = false

    for (let filter in filters) {
      if (filters.hasOwnProperty(filter)) {
        enabled = enabled || filters[filter]
      }
    }

    return !enabled
  }

  disableFilters () {
    AppActions.setDriverFilters({
      dailyActivity:     false,
      nocturnalActivity: false,
      vacation:          false,
      accident:          false,
      generalActivity:   false,
      generalInactivity: false
    })
  }

  handleFiltersChange (event) {
    const target  = event.target
    const checked = target.checked
    const name    = target.name

    AppActions.setDriverFilters({
      [name]: checked
    })
  }

  render () {
    return (
      <div id='footer' className='toggle-panel-container'>
        <label className='control control--radio'>
          <input
            type='checkbox'
            // name=''
            checked={this.areFiltersEnabled(this.props.filters)}
            onChange={this.disableFilters} />
          <div className='control__indicator'>wszyscy</div>
        </label>
        <label className='control control--radio'>
          <input
            type='checkbox'
            name='dailyActivity'
            checked={this.props.filters.dailyActivity}
            onChange={this.handleFiltersChange} />
          <div className='control__indicator'>dzienni</div>
        </label>
        <label className='control control--radio'>
          <input
            type='checkbox'
            name='nocturnalActivity'
            checked={this.props.filters.nocturnalActivity}
            onChange={this.handleFiltersChange} />
          <div className='control__indicator'>nocni</div>
        </label>
        <label className='control control--radio'>
          <input
            type='checkbox'
            name='vacation'
            checked={this.props.filters.vacation}
            onChange={this.handleFiltersChange} />
          <div className='control__indicator'>urlop</div>
        </label>
        <label className='control control--radio'>
          <input
            type='checkbox'
            name='accident'
            checked={this.props.filters.accident}
            onChange={this.handleFiltersChange} />
          <div className='control__indicator'>awaria</div>
        </label>
        <label className='control control--radio'>
          <input
            type='checkbox'
            name='generalActivity'
            checked={this.props.filters.generalActivity}
            onChange={this.handleFiltersChange} />
          <div className='control__indicator'>aktywni</div>
        </label>
        <label className='control control--radio'>
          <input
            type='checkbox'
            name='generalInactivity'
            checked={this.props.filters.generalInactivity}
            onChange={this.handleFiltersChange} />
          <div className='control__indicator'>nieaktywni</div>
        </label>
      </div>
    )
  }
}
