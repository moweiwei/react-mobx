import { action } from 'mobx'
import { get } from 'lodash'
import Base from 'stores/base'

export default class DemoStore extends Base {
  @action
  async fetchList({ more, ...params } = {}) {
    this.list.isLoading = true

    const result = await request.get('api/list')

    const data = get(result, 'items', [])

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
}
