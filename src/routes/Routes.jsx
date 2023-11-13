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
import SignUp from '../pages/SignUp'
import RegisterMLApp from '../pages/RegisterMLApp'
import PageNotFound from '../pages/PageNotFound'
import RegisterProduct from '../pages/registerProduct'
// Guard
import AuthGuard from '../guards/AuthGuard.guard'
import CheckSession from '../guards/CheckSession.guard'

// routes definition
const Routes = () => {
  return (
    <BrowserRouter>
      <>
        <MobileNavbar />
        <DesktopNavbar />
      </>
      <ReactDomRoutes>
        { /* Don´t need authorization */ }
        <Route path='/' element={<Login />} />
        <Route path='/login' element={<Login />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/test' element={<MainPage />} />
        <Route path='*' element={<PageNotFound />} />
        { /* Need authorization */ }
        <Route element={<CheckSession />}>
          <Route path='/questions' element={<Questionstest />} />
          <Route path='/inventory' element={<Inventory />} />
          <Route path='/register_ml_app' element={<RegisterMLApp />} />
          <Route path='/register-product' element={<RegisterProduct />} />
        </Route>
      </ReactDomRoutes>
    </BrowserRouter>
  )
}

export default Routes
