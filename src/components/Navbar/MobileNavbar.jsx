import React, { useEffect } from 'react'
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Button
} from '@nextui-org/react'
import UserDropDown from './UserDropDown'
import { useSelector } from 'react-redux'
import logo from '../../assets/logo.svg'
import useUserToRedux from '../../hooks/useUserToRedux'

export default function MobileNavbar () {
  const userToRedux = useUserToRedux()
  const user = useSelector((state) => state.user)
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)

  useEffect(() => {
    userToRedux()
  }, [])

  const menuItems = [
    {
      name: 'Ajustes',
      link: ''
    },
    {
      name: 'Publicaciones',
      link: 'inventory'
    },
    {
      name: 'Preguntas',
      link: 'questions'
    },
    {
      name: 'Cerrar Sesión',
      link: '#'
    }
  ]
  return (
    <Navbar onMenuOpenChange={setIsMenuOpen} className='lg:hidden block'>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        />
        <NavbarBrand>
          <img src={logo} alt='Esellerate Logo' className='w-8 h-8' />
          <p className='font-bold text-inherit'>eSellerate</p>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent justify='end'>
        <NavbarItem className='hidden lg:flex'>
          <Link href='#'>Login</Link>
        </NavbarItem>
        <NavbarItem>
          {user.email !== ''
            ? <UserDropDown />
            : (<Button as={Link} color='primary' href='#' variant='flat'>
              Sign Up
               </Button>)}
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item.name}-${index}`}>
            <Link
              color={
                index === 2
                  ? 'primary'
                  : index === menuItems.length - 1
                    ? 'danger'
                    : 'foreground'
              }
              className='w-full'
              href={item.link}
              size='lg'
            >
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  )
}
