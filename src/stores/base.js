import { get } from 'lodash'
import { action, observable } from 'mobx'

import List from './base.list'

export default class BaseStore {
  list = new List()

  @observable
  detail = {}

  @observable
  isLoading = true

  @observable
  isSubmitting = false

  constructor(module) {
    this.module = module
  }

  get apiVersion() {
    return 'api/'
  }

  get mapper() {
    return data => data
  }

  getPath() {}

  getListUrl = (params = {}) =>
    `${this.apiVersion}${this.getPath(params)}/${this.module}`

  getDetailUrl = (params = {}) => `${this.getListUrl(params)}/${params.name}`

  getFilterParams = params => {
    const result = { ...params }

    return result
  }

  @action
  setModule(module) {
    this.module = module
  }

  @action
  submitting = promise => {
    this.isSubmitting = true

    setTimeout(() => {
      promise
        .catch(() => {})
        .finally(() => {
          this.isSubmitting = false
        })
    }, 500)

    return promise
  }

  @action
  async fetchList({ more, ...params } = {}) {
    this.list.isLoading = true

    if (!params.sortBy) {
      params.sortBy = 'createTime'
    }

    params.limit = params.limit || 10

    const result = await request.get(
      this.getListUrl(),
      this.getFilterParams(params)
    )
    const data = get(result, 'items') || []

    this.list.update({
      data: more ? [...this.list.data, ...data] : data,
      total: result.total_count || data.length || 0,
      ...params,
      limit: Number(params.limit) || 10,
      page: Number(params.page) || 1,
      isLoading: false,
      ...(this.list.silent ? {} : { selectedRowKeys: [] }),
    })

    return data
  }

  @action
  async fetchDetail(params) {
    this.isLoading = true

    const result = await request.get(this.getDetailUrl(params))
    const detail = { ...params, ...this.mapper(result) }

    this.detail = detail
    this.isLoading = false
    return detail
  }

  @action
  setSelectRowKeys(selectedRowKeys) {
    this.list.selectedRowKeys.replace(selectedRowKeys)
  }

  @action
  create(data, params = {}) {
    return this.submitting(request.post(this.getListUrl(params), data))
  }

  @action
  async update(params, newObject) {
    return this.submitting(request.put(this.getDetailUrl(params), newObject))
  }

  @action
  patch(params, newObject) {
    return this.submitting(request.patch(this.getDetailUrl(params), newObject))
  }

  @action
  delete(params) {
    return this.submitting(request.delete(this.getDetailUrl(params)))
  }

  @action
  batchDelete(rowKeys) {
    return this.submitting(
      Promise.all(
        rowKeys.map(name => {
          const item = this.list.data.find(_item => _item.name === name)
          return request.delete(this.getDetailUrl(item))
        })
      )
    )
  }

  reject = res => {
    this.isSubmitting = false
    window.onunhandledrejection(res)
  }
}
