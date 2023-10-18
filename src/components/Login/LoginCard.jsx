import React, { useState } from 'react'
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
  Divider,
  Checkbox,
  Button
} from '@nextui-org/react'
import { PiEyeLight, PiEyeClosedLight } from 'react-icons/pi'

export default function Login () {
  const [isVisible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!isVisible)
  }

  return (
    <Card className='w-[420px] p-4 h-fit'>
      <CardHeader className='block mx-auto text-xl p-0 pb-3'>
        <h1 className='text-center'>Inicia sesión</h1>
      </CardHeader>
      <CardBody className='px-3 py-0 text-small text-default-400 gap-6 h-[16rem]'>
        <Input
          isClearable
          variant='faded'
          type='email'
          label='Correo electrónico'
          placeholder='Ingresa tu correo electrónico'
          className='max-w-md'
        />
        <div>
          <Input
            label='Contraseña'
            variant='faded'
            placeholder='Ingresa tu contraseña'
            endContent={
              <button className='focus:outline-none' type='button' onClick={toggleVisibility}>
                {isVisible
                  ? (
                    <PiEyeLight className='text-2xl text-default-400 pointer-events-none' />
                    )
                  : (
                    <PiEyeClosedLight className='text-2xl text-default-400 pointer-events-none' />
                    )}
              </button>
           }
            type={isVisible ? 'text' : 'password'}
            className='max-w-md'
          />
          <div className='flex justify-between items-center text-[0.65rem] md:text-sm py-3 md:py-2'>
            <Checkbox size='sm' color='secondary'>Recuérdame</Checkbox>
            <em>¿Olvidaste tu contraseña?</em>
          </div>
        </div>
        <Button color='primary' variant='solid'>Iniciar Sesión</Button>
      </CardBody>
      <Divider className='my-4' />
      <CardFooter className='p-2'>
        <p className='flex w-full justify-between text-sm'>
          <p className='text-secondary decoration-solid'>¿Aún no tienes cuenta?</p>
          <em>Registrate</em>
        </p>
      </CardFooter>
    </Card>
  )
}
