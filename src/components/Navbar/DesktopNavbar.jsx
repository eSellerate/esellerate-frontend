import React from 'react'
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar
} from '@nextui-org/react'
import { NavLink, useLocation } from 'react-router-dom'
import logo from '../../assets/logo.svg'

export default function DesktopNavbar () {
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
        <Dropdown placement='bottom-end'>
          <DropdownTrigger>
            <Avatar
              isBordered
              as='button'
              className='transition-transform'
              color='secondary'
              name='Christian'
              size='sm'
              src='https://datepsychology.com/wp-content/uploads/2022/09/gigachad.jpg'
            />
          </DropdownTrigger>
          <DropdownMenu aria-label='Profile Actions' variant='flat'>
            <DropdownItem key='profile' className='h-14 gap-2'>
              <p className='font-semibold'>Perfil</p>
              <p className='font-semibold'>chad-giga@esellerate.mx</p>
            </DropdownItem>
            <DropdownItem className='block sm:hidden'>
              <NavLink to='/questions'> Test </NavLink>
            </DropdownItem>
            <DropdownItem className='block sm:hidden'>
              <NavLink to='/inventory'> Inventario </NavLink>
            </DropdownItem>
            <DropdownItem className='block sm:hidden'>
              <NavLink to='/'> Inicio </NavLink>
            </DropdownItem>
            <DropdownItem key='settings'>Ajustes</DropdownItem>
            <DropdownItem key='team_settings'>Productos</DropdownItem>
            <DropdownItem key='analytics'>Comentarios</DropdownItem>
            <DropdownItem key='logout' color='danger'>
              Cerrar sesión
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  )
}
