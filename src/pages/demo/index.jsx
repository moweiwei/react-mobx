import React from 'react'
import { Table, Space } from 'antd'
import DemoStore from 'stores/demo'
import { observer } from 'mobx-react'

// import styles from './index.less'

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: text => <a>{text}</a>,
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
      <Space size="middle">
        <a>Invite {record.name}</a>
        <a>Delete</a>
      </Space>
    ),
  },
]

@observer
export default class Demo extends React.Component {
  demoStore = new DemoStore()

  componentDidMount() {
    this.demoStore.fetchList()
  }

  render() {
    return <Table columns={columns} dataSource={this.demoStore.list.data} />
  }
}
