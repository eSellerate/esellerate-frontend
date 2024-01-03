import React from 'react'
import { HashRouter, Route, Routes as ReactDomRoutes } from 'react-router-dom'

// Components
import DesktopNavbar from '../components/Navbar/DesktopNavbar'
import MobileNavbar from '../components/Navbar/MobileNavbar'
import Questions from '../components/Questions/Questions'
import Questionstest from '../pages/Questionstest'
// Pages
import Inventory from '../pages/Inventory'
import MainPage from '../pages/MainPage'
import Sales from '../pages/Sales'
import Login from '../pages/Login'
import SignUp from '../pages/SignUp'
import RegisterMLApp from '../pages/RegisterMLApp'
import PageNotFound from '../pages/PageNotFound'
// import RegisterProduct from '../pages/registerProduct'
// Guard
import AuthGuard from '../guards/AuthGuard.guard'
import CheckSession from '../guards/CheckSession.guard'
import SaleDetail from '../pages/SaleDetail'
import InventoryList from '../pages/InventoryList'
import BlockedUsers from '../pages/BlockedUsers'
import ClientPanel from '../pages/ClientPanel'

// routes definition
const Routes = () => {
  return (
    <div className="min-h-screen md:px-12 px-4 pb-1 align-middle md:pt-20 pt-0">
      <HashRouter>
        <>
          <MobileNavbar />
          <DesktopNavbar />
        </>
        <ReactDomRoutes>
          { /* Don´t need authorization */}
          <Route path='/' element={<Login />} />
          <Route path='/login' element={<Login />} />
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='*' element={<PageNotFound />} />
          { /* Need authorization */}
          <Route element={<CheckSession />}>
            <Route path='/questions' element={<Questionstest />} />
            <Route path='/chat' element={<Questions />} />
            <Route path='/inventory' element={<Inventory />} />
            <Route path='/inventorylist' element={<InventoryList />} />
            <Route path='/blockedusers' element={<BlockedUsers />} />
            <Route path='/clientpanel' element={<ClientPanel />} />
            <Route path='/register_ml_app' element={<RegisterMLApp />} />
            <Route path='/sale-detail' element={<SaleDetail />} />
            {/* <Route path='/register-product' element={<RegisterProduct />} /> */}
            <Route path='/test' element={<MainPage />} />
            <Route path='/sales' element={<Sales />} />
          </Route>
        </ReactDomRoutes>
      </HashRouter>
    </div>
  )
}

export default Routes
