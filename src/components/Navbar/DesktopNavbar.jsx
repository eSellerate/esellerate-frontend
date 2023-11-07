import React, { useEffect } from 'react'
import {
  Button,
  Navbar,
  Link,
  NavbarBrand,
  NavbarContent,
  NavbarItem
} from '@nextui-org/react'
import { NavLink, useLocation } from 'react-router-dom'
import UserDropDown from './UserDropDown'
import { useSelector } from 'react-redux'
import logo from '../../assets/logo.svg'
import useUserToRedux from '../../hooks/useUserToRedux'

export default function DesktopNavbar () {
  const userToRedux = useUserToRedux()

  useEffect(() => {
    userToRedux()
  }, [])

  const user = useSelector((state) => state.user)

  const location = useLocation()
  const currentPath = location.pathname
  return (
    <Navbar isBordered className='lg:flex hidden fixed'>
      <NavbarBrand>
        <img src={logo} alt='Esellerate Logo' className='w-8 h-8' />
        <p className='font-bold text-inherit'>Esellerate</p>
      </NavbarBrand>

      {user.email !== '' && <div className='sm:block hidden'>
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
                            </div>}

      <NavbarContent as='div' justify='end'>
        {
          user.email !== ''
            ? <UserDropDown />
            : <Button as={Link} color='primary' href='#' variant='flat'>
              Sign Up
            </Button>
        }
      </NavbarContent>
    </Navbar>
  )
}
