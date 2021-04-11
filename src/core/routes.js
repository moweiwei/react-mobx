// import { lazy } from 'react'

import { Welcome } from 'pages/welcome'
import Login from 'pages/user/Login'

export default [
  { path: `/`, component: Welcome, exact: true },
  { path: `/login`, component: Login, exact: true },
]
