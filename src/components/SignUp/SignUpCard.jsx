import React, { useState } from 'react'
import {
    Card, 
    CardHeader,
    CardBody,
    CardFooter,
    Divider,
    Input,
    Button
} from "@nextui-org/react"
import { NavLink } from 'react-router-dom'
import { PiEyeLight, PiEyeClosedLight } from 'react-icons/pi'
import axios from 'axios'
import useToggle from '../../hooks/useToggle'

export default function SignUpCard () {
    const passwordInput = useToggle()
    const confirmPasswordInput = useToggle()


    const handleSubmit = async (e) => {
        e.preventDefault()
        // get all data from form
        const firstName = e.target.name_field.value
        const lastName = e.target.lastname_field.value
        const email = e.target.email_field.value
        const password = e.target.password_field.value
        const confirmPassword = e.target.password_confirm_field.value
        // send data to backend
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_END_POINT}register`, 
            {
                firstName,
                lastName,
                email,
                password,
                confirmPassword
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            )
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Card className="w-3/6">
        <CardHeader className="text-xl justify-center">
          <h1 className='text-center'>Registrate</h1>
        </CardHeader>
        <Divider/>
        <CardBody>
          <form onSubmit={handleSubmit} className='flex flex-col gap-4 px-12'>
          <Input
            isRequired
            variant='faded'
            type='text'
            id='name_field'
            label='Nombre'
            placeholder='Ingresa tu nombre'
          />
          <Input
            isRequired
            variant='faded'
            type='text'
            id='lastname_field'
            label='Apellido'
            placeholder='Ingresa tu apellido'
          />
          <Input
            isRequired
            variant='faded'
            type='email'
            id='email_field'
            label='Correo electrónico'
            placeholder='Ingresa tu correo electrónico'
          />
          <Input
            isRequired
            variant='faded'
            id='password_field'
            label='Contraseña'
            placeholder='Ingresa tu contraseña'
            endContent={
                <button className='focus:outline-none' type='button' onClick={passwordInput.toggle}>
                  {passwordInput.isVisible
                    ? (
                      <PiEyeLight className='text-2xl text-default-400 pointer-events-none' />
                      )
                    : (
                      <PiEyeClosedLight className='text-2xl text-default-400 pointer-events-none' />
                      )}
                </button>
            }
            type={passwordInput.isVisible ? 'text' : 'password'}
          />
          <Input
            isRequired
            variant='faded'
            id='password_confirm_field'
            label='Confirma tu contraseña'
            placeholder='Ingresa tu contraseña'
            endContent={
                <button className='focus:outline-none' type='button' onClick={confirmPasswordInput.toggle}>
                  {confirmPasswordInput.isVisible
                    ? (
                      <PiEyeLight className='text-2xl text-default-400 pointer-events-none' />
                      )
                    : (
                      <PiEyeClosedLight className='text-2xl text-default-400 pointer-events-none' />
                      )}
                </button>
            }
            type={confirmPasswordInput.isVisible ? 'text' : 'password'}
          />
          <div className='flex justify-end'>
            <Button type='submit' className='w-28' color='primary' variant='solid'>Registrate</Button>
          </div>
          </form>
        </CardBody>
        <Divider/>
        <CardFooter className='px-9 py-4'>
        <p className='flex w-full justify-between text-sm'>
          <p className='decoration-solid'>¿Ya tienes cuenta?</p>
          <NavLink to='/login'>
            <em className='text-secondary'>Inicia sesión</em>
          </NavLink>
        </p>
      </CardFooter>
      </Card>   
    )
}