import React from 'react'
import { BrowserRouter, Route, Routes as ReactDomRoutes } from 'react-router-dom'

// Components
import DesktopNavbar from '../components/Navbar/DesktopNavbar'
import MobileNavbar from '../components/Navbar/MobileNavbar'
import Test from '../components/test/Test'
import Inventory from '../pages/Inventory'
import App from '../App'

// routes definition
const Routes = () => {
  return (
    <BrowserRouter>
      <>
        <MobileNavbar/>
        <DesktopNavbar/>
      </>
      <ReactDomRoutes>
        <Route path='/' element={<App />} />
        <Route path='/test' element={<Test />} />
        <Route path='/inventory' element={<Inventory />} />
      </ReactDomRoutes>
    </BrowserRouter>
  )
}

export default Routes
