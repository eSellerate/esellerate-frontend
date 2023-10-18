import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function AuthGuard () {
  const user = useSelector((state) => state.user)
  return (user.id ? <Outlet /> : <Navigate to='/login' />)
}
