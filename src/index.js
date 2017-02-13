import { Router,
         Route,
         hashHistory,
         IndexRoute }         from 'react-router'
import { render }             from 'react-dom'
import React                  from 'react'
import config                 from 'config'
import AppContainer           from './containers/app.container'
import DriversContainer       from './containers/drivers.container'
import PaymentsContainer      from './containers/payments.container'
import AdvertisementContainer from './containers/advertisement.container'
import ScheduleContainer      from './containers/schedule.container'

const routes = (
  <Route path={config.routes.app} component={AppContainer}>
    <IndexRoute component={DriversContainer} />
    <Route path={config.routes.payments} component={PaymentsContainer} />
    <Route path={config.routes.advertisement} component={AdvertisementContainer} />
    <Route path={config.routes.schedule} component={ScheduleContainer} />
  </Route>
)

render(
  <Router history={hashHistory} routes={routes} />,
  document.getElementById('app')
)
