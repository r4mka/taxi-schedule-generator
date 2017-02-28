import React from 'react'

export default class Popup extends React.Component {
  render () {
    if (!this.props.isOpen) return null

    let cancelBtn = null
    let submitBtn = null

    if (this.props.handleCancelBtn &&
        this.props.cancelBtnLabel) {
      cancelBtn = (
        <button
          className='regular-btn'
          onClick={this.props.handleCancelBtn}>
          {this.props.cancelBtnLabel}
        </button>
      )
    }

    if (this.props.handleSubmitBtn &&
        this.props.submitBtnLabel) {
      submitBtn = (
        <button
          className='regular-btn'
          onClick={this.props.handleSubmitBtn}>
          {this.props.submitBtnLabel}
        </button>
      )
    }

    return (
      <div className='modal' style={{zIndex: 2000}}>
        <div className='popup' style={{zIndex: 3000}}>
          {this.props.header
            ? <h3>{this.props.header}</h3>
            : null }
          {this.props.description
            ? <p>{this.props.description}</p>
            : null }
          {this.props.hint
            ? <p style={{opacity: 0.5, fontSize: 14}}>{this.props.hint}</p>
            : null }
          <div className='centered-div'>
            { cancelBtn }
            { submitBtn }
          </div>
        </div>
      </div>
    )
  }
}

Popup.defaultProps = {
  isOpen: true
}

Popup.propTypes = {
  isOpen:          React.PropTypes.bool.isRequired,
  header:          React.PropTypes.string,
  description:     React.PropTypes.string,
  hint:            React.PropTypes.string,
  handleCancelBtn: React.PropTypes.func,
  cancelBtnLabel:  React.PropTypes.string,
  handleSubmitBtn: React.PropTypes.func,
  submitBtnLabel:  React.PropTypes.string
}
