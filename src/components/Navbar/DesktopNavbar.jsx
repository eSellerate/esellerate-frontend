import React from 'react'
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from '@nextui-org/react'
import { NavLink, useLocation } from 'react-router-dom'
import UserDropDown from './UserDropDown'
import { useSelector } from 'react-redux'
import logo from '../../assets/logo.svg'

export default function DesktopNavbar () {
  const user = useSelector((state) => state.user)
  const location = useLocation()
  const currentPath = location.pathname
  return (
    <Navbar isBordered className='lg:flex hidden'>
      <NavbarBrand>
        <img src={logo} alt='Esellerate Logo' className='w-8 h-8' />
        <p className='font-bold text-inherit'>Esellerate</p>
      </NavbarBrand>

      <div className='sm:block hidden'>
        <NavbarContent className='sm:flex gap-4' justify='center'>
          <NavbarItem isActive={currentPath === '/'}>
            <NavLink to='/'> Inicio </NavLink>
          </NavbarItem>
          <NavbarItem isActive={currentPath === '/inventory'}>
            <NavLink to='/inventory'> Publicaciones </NavLink>
          </NavbarItem>
          <NavbarItem isActive={currentPath === '/questions'}>
            <NavLink to='/questions'> Preguntas </NavLink>
          </NavbarItem>
        </NavbarContent>
      </div>

      <NavbarContent as='div' justify='end'>
        <UserDropDown user={user} />
      </NavbarContent>
    </Navbar>
  )
}
