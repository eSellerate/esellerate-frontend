import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import GetCookieByName from '../components/Utilities/Cookies/GetCookieByName'

export default function CheckSession () {
  const session = GetCookieByName('session')
  return (session ? <Outlet /> : <Navigate to='/login' />)
}
