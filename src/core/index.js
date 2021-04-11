import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'
import LocaleProvider from 'components/LocaleProvider'
import { Spin, notification } from 'antd'

import request from 'utils/request'

import App from './App'
import i18n from './i18n'

require('@babel/polyfill')

// request error handler
window.onunhandledrejection = function(e) {
  if (e && (e.status === 'Failure' || e.status >= 400)) {
    if (e.status === 401 || e.reason === 'Unauthorized') {
      // session timeout handler.
      location.href = `/login?referer=${location.pathname}`
      // eslint-disable-next-line no-alert
      window.alert(
        t(
          'Session timeout or this account is logged in elsewhere, please login again'
        )
      )
    } else if (e.reason || e.message) {
      notification.error({
        title: e.reason,
        content: t(e.message),
        duration: 6000,
      })
    }
  }
}

window.t = i18n.t
window.request = request

const render = async component => {
  const { locales } = await i18n.init()

  ReactDOM.render(
    <Suspense fallback={<Spin className="page-loading" />}>
      <LocaleProvider locales={locales} localeKey="lang" ignoreWarnings>
        {component}
      </LocaleProvider>
    </Suspense>,
    document.getElementById('root')
  )
}

render(<App />)

module.hot &&
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default
    render(<NextApp />)
  })
