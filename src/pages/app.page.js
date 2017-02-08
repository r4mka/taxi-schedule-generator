import config        from 'config'
import React         from 'react'
import { IndexLink } from 'react-router'

export default class AppPage extends React.Component {
  render () {
    return (
      <div>
        <IndexLink activeStyle={{color: '#53acff'}} to={config.routes.app}>Drivers</IndexLink>&nbsp;
        <IndexLink activeStyle={{color: '#53acff'}} to={config.routes.schedule}>Schedule</IndexLink>&nbsp;
        {this.props.children}
      </div>
    )
  }
}
