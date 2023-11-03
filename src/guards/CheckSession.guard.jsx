import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

export default function CheckSession () {
  
  return (user.id ? <Outlet /> : <Navigate to='/register_ml_app' />)
}
