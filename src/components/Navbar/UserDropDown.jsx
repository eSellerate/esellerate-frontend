import React from 'react'
import {
    Avatar,
    Dropdown,
    DropdownMenu,
    DropdownTrigger,
    DropdownItem,
  } from '@nextui-org/react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'

export default function UserDropDown(props) {
    UserDropDown.propTypes = {
        user: PropTypes.object,
    }
    // destructuring of props
    const { user } = props

    return(
        <Dropdown placement='bottom-end'>
          <DropdownTrigger>
            <Avatar
              isBordered
              as='button'
              className='transition-transform'
              color='secondary'
              name={user.thumbnail.picture_id}
              size='sm'
              src={user.thumbnail.picture_url}
            />
          </DropdownTrigger>
          <DropdownMenu aria-label='Profile Actions' variant='flat'>
            <DropdownItem key='profile' className='h-14 gap-2'>
              <p className='font-semibold'>{user.firstName} {user.lastName}</p>
              <p className='font-semibold'>{user.email}</p>
            </DropdownItem>
            <DropdownItem className='block'>
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
    )
}
