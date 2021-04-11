import { action, observable, extendObservable } from 'mobx'
import { RouterStore } from 'mobx-react-router'
import { parse } from 'qs'
import { getQueryString } from 'utils'


export default class RootStore {
  constructor() {
    this.routing = new RouterStore()
    this.routing.query = this.query
  }

  register(name, store) {
    extendObservable(this, { [name]: store })
  }

  // query = (params = {}, refresh = false) => {
  //   const { pathname, search } = this.routing.location
  //   const currentParams = parse(search.slice(1))

  //   const newParams = refresh ? params : { ...currentParams, ...params }

  //   this.routing.push(`${pathname}?${getQueryString(newParams)}`)
  // }


  @action
  registerActions = actions => {
    extendObservable(this.actions, actions)
  }

}
