import React from 'react'
import { BrowserRouter, Route, Routes as ReactDomRoutes } from 'react-router-dom'

// Components
import DesktopNavbar from '../components/Navbar/DesktopNavbar'
import MobileNavbar from '../components/Navbar/MobileNavbar'
import Questions from '../components/Questions/Questions'
import Questionstest from '../pages/Questionstest'
// Pages
import Inventory from '../pages/Inventory'
import MainPage from '../pages/MainPage'
import Login from '../pages/Login'
import PageNotFound from '../pages/PageNotFound'
// Guard
import AuthGuard from '../guards/AuthGuard.guard'

// routes definition
const Routes = () => {
  return (
    <BrowserRouter>
      <>
        <MobileNavbar />
        <DesktopNavbar />
      </>
      <ReactDomRoutes>
        <Route path='/' element={<MainPage />} />
        <Route path='/questions' element={<Questions />} />
        <Route path='/questionstest' element={<Questionstest />} />
        <Route path='/inventory' element={<Inventory />} />
        <Route path='/login' element={<Login />} />
        <Route path='*' element={<PageNotFound />} />
      </ReactDomRoutes>
    </BrowserRouter>
  )
}

export default Routes
