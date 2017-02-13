import config                   from 'config'
import React                    from 'react'
import { Navbar, Nav, NavItem } from 'react-bootstrap'
import { IndexLinkContainer }   from 'react-router-bootstrap'

export default class Header extends React.Component {
  render () {
    return (
      <Navbar fixedTop>
        <Navbar.Header>
          <Navbar.Brand>
            <a href='http://www.taxiprawobrzeze.pl'>
              <img
                style={{height: 40, width: 158}}
                src='./app/assets/logo.svg' />
            </a>
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
    )
  }
}
