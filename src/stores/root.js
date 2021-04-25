import { action, extendObservable } from 'mobx'
import { RouterStore } from 'mobx-react-router'

export default class RootStore {
  constructor() {
    this.routing = new RouterStore()
    this.routing.query = this.query
  }

  register(name, store) {
    extendObservable(this, { [name]: store })
  }

  @action
  registerActions = actions => {
    extendObservable(this.actions, actions)
  }

  login(params) {
    return request.post('api/login', params)
  }
}
