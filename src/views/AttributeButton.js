import React      from 'react'
import { Button } from 'react-bootstrap'

export default class AttributeButton extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      active: false
    }

    this.onClick = this.onClick.bind(this)
  }

  onClick (event) {
    this.setState({
      active: !this.state.active
    })
  }

  render () {
    console.log(this.state.active)
    return (
      <Button
        style={this.props.style}
        className={this.state.active ? 'btn-dual-state active' : 'btn-dual-state'}
        onClick={this.onClick}>
        {this.props.label}
      </Button>
    )
  }
}
