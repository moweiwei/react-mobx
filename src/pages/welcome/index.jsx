import React from 'react'
import { DatePicker } from 'antd'

import styles from './index.less'

export function Welcome() {
  return (
    <div className={styles.welcome}>
      Welcome to React
      <DatePicker />
    </div>
  )
}
