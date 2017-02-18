import React          from 'react'
import CommonSelector from '../views/CommonSelector'
import DutySelector   from '../views/DutySelector'
import NotePad        from '../views/NotePad'

export default class ScheduleContainer extends React.Component {
  render () {
    return (
      <div id='schedule-page'>
        <form>
          <CommonSelector
            placeholder='Wybierz miesiąc'
            header='Miesiąc na który ma zostać utworzony grafik' />
          <hr />
          <CommonSelector
            placeholder='Wybierz kierowcę'
            header='Kierowca który zamykał grafik w ubiegłym miesiącu' />
          <hr />
          <DutySelector
            header='Liczba kierowców na poszczególnych dyżurach' />
          <hr />
          <NotePad
            style={{width: 488, height: 142}}
            header='Wiadomość dla kierowców'
            placeholder='Maksymalnie 220 znaków' />
        </form>
      </div>
    )
  }
}
