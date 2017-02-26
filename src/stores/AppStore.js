import AppActionTypes from '../constants/AppActionTypes'
import BaseStore      from './BaseStore'
import _              from 'lodash'

class AppStore extends BaseStore {
  constructor () {
    super()
    this.subscribe(() => this._registerToActions.bind(this))
    this._popup = {
      isOpen:          false,
      header:          '',
      description:     '',
      hint:            '',
      handleCancelBtn: null,
      cancelBtnLabel:  '',
      handleSubmitBtn: null,
      submitBtnLabel:  ''
    }
  }

  _registerToActions (action) {
    switch (action.actionType) {
      case AppActionTypes.SHOW_POPUP:
        _.assign(this._popup, action.popup, {isOpen: true})
        break

      case AppActionTypes.HIDE_POPUP:
        _.assign(this._popup, {
          isOpen:          false,
          header:          '',
          description:     '',
          hint:            '',
          handleCancelBtn: null,
          cancelBtnLabel:  '',
          handleSubmitBtn: null,
          submitBtnLabel:  ''
        })
        break

      default:
        return
    }
    this.emitChange()
  }

  get popup () {
    return this._popup
  }
}

export default new AppStore()
