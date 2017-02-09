import config            from 'config'
import React             from 'react'
import { Navbar, Nav, NavItem }  from 'react-bootstrap'
import { IndexLinkContainer } from 'react-router-bootstrap'

export default class AppPage extends React.Component {
  render () {
    return (
      <div>
        <Navbar fixedTop>
          <Navbar.Header>
            <Navbar.Brand>
              <a href='#'>Taxi Prawobrzeże</a>
            </Navbar.Brand>
          </Navbar.Header>
          <Nav bsStyle='pills' pullRight>
            <IndexLinkContainer to={{pathname: config.routes.app}}>
              <NavItem>
                Kierowcy
              </NavItem>
            </IndexLinkContainer>
            <IndexLinkContainer to={{pathname: config.routes.payments}}>
              <NavItem>
                Płatności
              </NavItem>
            </IndexLinkContainer>
            <IndexLinkContainer to={{pathname: config.routes.advertisement}}>
              <NavItem>
                Reklama
              </NavItem>
            </IndexLinkContainer>
            <IndexLinkContainer to={{pathname: config.routes.schedule}}>
              <NavItem>
                Grafik
              </NavItem>
            </IndexLinkContainer>
          </Nav>
        </Navbar>
        {this.props.children}
      </div>
    )
  }
}
