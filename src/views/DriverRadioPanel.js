import React  from 'react'

export default class DriverRadioPanel extends React.Component {
  render () {
    return (
      <div className='togglePanelContainer'>
        <label className='control control--radio'>
          <input
            type='radio'
            name='status'
            value='pracuje'
            checked={this.props.status === 'pracuje'}
            onChange={(e) => this.props.onChange(e)} />
          <div
            style={{marginRight: 12}}
            className='control__indicator'>pracuje</div>
        </label>
        <label className='control control--radio'>
          <input
            type='radio'
            name='status'
            value='urlop'
            checked={this.props.status === 'urlop'}
            onChange={(e) => this.props.onChange(e)} />
          <div
            style={{marginRight: 12}}
            className='control__indicator'>urlop</div>
        </label>
        <label className='control control--radio'>
          <input
            type='radio'
            name='status'
            value='awaria'
            checked={this.props.status === 'awaria'}
            onChange={(e) => this.props.onChange(e)} />
          <div className='control__indicator'>awaria</div>
        </label>
      </div>
    )
  }
}

DriverRadioPanel.propTypes = {
  status:   React.PropTypes.oneOf(['pracuje', 'urlop', 'awaria']).isRequired,
  onChange: React.PropTypes.func.isRequired
}
