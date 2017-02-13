import React  from 'react'
import Header from '../views/Header'

export default class AppContainer extends React.Component {
  render () {
    return (
      <div>
        <Header />
        <div id='contentPage'>
          {this.props.children}
        </div>
      </div>
    )
  }
}
