// import { lazy } from 'react'
import Login from 'pages/user/Login'
import Demo from 'pages/demo'

export default [
  { path: `/`, component: Demo, exact: true },
  { path: `/login`, component: Login, exact: true },
]
