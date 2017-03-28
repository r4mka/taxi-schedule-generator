import React from 'react'

export default class Checkbox extends React.Component {
  constructor (props) {
    super(props)

    this.toggleCheckboxChange = this.toggleCheckboxChange.bind(this)
    this.state = {
      isChecked: false
    }
  }
  
  toggleCheckboxChange () {
    const { handleCheckboxChange, label } = this.props

    this.setState((prevState) => ({
      isChecked: !prevState.isChecked
    }))

    handleCheckboxChange(label)
  }

  render () {
    const { label } = this.props
    const { isChecked } = this.state

    return (
      <div className='checkbox'>
        <label>
          <input
            type='checkbox'
            value={label}
            checked={isChecked}
            onChange={this.toggleCheckboxChange} />
          {label}
        </label>
      </div>
    )
  }
}

Checkbox.propTypes = {
  label:                React.PropTypes.string.isRequired,
  handleCheckboxChange: React.PropTypes.func.isRequired
}
