import React from 'react'
import { Spin } from 'antd'

const PageLoading = ({ className }) => {
  return (
    <div
      style={{
        paddingTop: 100,
        textAlign: 'center',
      }}
      className={className}
    >
      <Spin size="large" />
    </div>
  )
}

export default PageLoading
