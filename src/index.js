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
import StorageService         from './services/StorageService'

const routes = (
  <Route path={config.routes.app} component={AppContainer}>
    <IndexRoute component={DriversContainer} />
    <Route path={config.routes.payments} component={PaymentsContainer} />
    <Route path={config.routes.advertisement} component={AdvertisementContainer} />
    <Route path={config.routes.schedule} component={ScheduleContainer} />
  </Route>
)

// temporary initialization

// for (let i = 22; i < 120; i++) {
//   let driver = {
//     docType:           'driver',
//     id:                i,
//     name:              'Adam Ramski',
//     phone:             '696 595 327',
//     notes:             'blablabla baslalal',
//     status:            'pracuje',
//     generalActivity:   true,
//     dailyActivity:     true,
//     nocturnalActivity: true,
//     scheduleHistory:   []
//   }
//   StorageService.addDriver(driver, (err, driver) => {
//     if (err) {
//       console.log(err)
//     } else {
//       console.log(driver)
//     }
//   })
// }

render(
  <Router history={hashHistory} routes={routes} />,
  document.getElementById('app')
)
