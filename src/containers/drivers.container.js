import React            from 'react'
import DriverPanel      from '../views/DriverPanel'
import DriverDetails    from '../views/DriverDetails'
import DriverFooter     from '../views/DriverFooter'
import DriversStore     from '../stores/DriversStore'
import {Grid, Row, Col} from 'react-bootstrap'

export default class DriversContainer extends React.Component {
  constructor (props) {
    super(props)
    this.state = this.getDriversState()
    this._onChange = this._onChange.bind(this)
    console.log(this.state)
  }

  componentDidMount () {
    DriversStore.addChangeListener(this._onChange)
  }

  componentWillUnmount () {
    DriversStore.removeChangeListener(this._onChange)
  }

  _onChange () {
    this.setState(this.getDriversState())
  }

  getDriversState () {
    return {
      drivers: DriversStore.drivers
    }
  }

  render () {
    let drivers = []
    let driversLength = this.state.drivers.length
    for (let i = 0; i < (driversLength / 3); i++) {
      drivers.push(
        <Row>
          <Col lg={4} md={4} xs={6}>
            <DriverPanel driver={this.state.drivers[i]} />
          </Col>
          <Col lg={4} md={4} xs={6}>
            <DriverPanel driver={this.state.drivers[i + 1]} />
          </Col>
          <Col lg={4} md={4} xs={6}>
            <DriverPanel driver={this.state.drivers[i + 2]} />
          </Col>
        </Row>
      )
    }
    let left = (driversLength - (3 * (driversLength / 3)))
    let index = driversLength - left
    let driversLeft = []
    for (let i = index; i < driversLength; i++) {
      driversLeft.push(
        <Col lg={4} md={6} xs={12}>
          <DriverPanel driver={this.state.drivers[i]} />
        </Col>
      )
    }

    return (
      <div id='drivers-page'>
        <Grid>
          {drivers}
          <Row>
            {driversLeft}
          </Row>
        </Grid>
        {
        // <DriverDetails />
        }
        <DriverFooter />
      </div>
    )
  }
}
