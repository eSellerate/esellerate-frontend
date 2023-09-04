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
import { NavLink } from 'react-router-dom'
import logo from '../../assets/logo.svg'

export default function DesktopNavbar () {
  return (
    <Navbar isBordered>
      <NavbarBrand>
        <img src={logo} alt="Esellerate Logo" className="w-8 h-8" />
        <p className="font-bold text-inherit">Esellerate</p>
      </NavbarBrand>

      <NavbarContent className="sm:flex gap-4" justify="center">
        <NavbarItem>
          <NavLink to="/test"> Inicio </NavLink>
        </NavbarItem>
        <NavbarItem isActive>
          <NavLink to="/inventory" activeClassName="text-secondary"> Inventario </NavLink>
        </NavbarItem>
        <NavbarItem>
          <NavLink to="/" activeClassName="text-secondary"> Comentarios </NavLink>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent as="div" justify="end">
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="secondary"
              name="Christian"
              size="sm"
              src="https://imageio.forbes.com/specials-images/imageserve/5ed00f17d4a99d0006d2e738/0x0.jpg?format=jpg&crop=4666,4663,x154,y651,safe&height=416&width=416&fit=bounds"
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Perfil</p>
              <p className="font-semibold">a20110469@live.ceti.mx</p>
            </DropdownItem>
            <DropdownItem key="settings">Ajustes</DropdownItem>
            <DropdownItem key="team_settings">Productos</DropdownItem>
            <DropdownItem key="analytics">Comentarios</DropdownItem>
            <DropdownItem key="logout" color="danger">
              Cerrar sesión
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </Navbar>
  )
}
