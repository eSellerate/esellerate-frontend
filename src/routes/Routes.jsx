import React from 'react'
import { BrowserRouter, Route, Routes as ReactDomRoutes } from 'react-router-dom'

// Components
import DesktopNavbar from '../components/Navbar/DesktopNavbar'
import MobileNavbar from '../components/Navbar/MobileNavbar'
import Questions from '../components/Questions/Questions'
// Pages
import Inventory from '../pages/Inventory'
import MainPage from '../pages/MainPage'

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
        <Route path='/inventory' element={<Inventory />} />
      </ReactDomRoutes>
    </BrowserRouter>
  )
}

export default Routes
