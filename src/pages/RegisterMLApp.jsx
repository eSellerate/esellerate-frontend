import React, { useState } from 'react'
import axios from 'axios'
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Checkbox,
  Button,
  Input
} from '@nextui-org/react'

const RegisterMLApp = () => {
  const [appIsRegistered, setAppIsRegistered] = useState(false)
  const [appID, setAppID] = useState('$APP_ID')
  const [redirectUri, setRedirectUri] = useState('$REDIRECT_URI')

  // Form submit handler
  const handleSubmit = async (e) => {
    e.preventDefault()
    // get all data from form
    const app_id = e.target.app_id_field.value
    const auth_code = e.target.auth_code_field.value
    const client_secret = e.target.client_secret_field ? e.target.client_secret_field.value : ''
    const redirect_uri = e.target.redirect_uri_field ? e.target.redirect_uri_field.value : ''
    // send data to backend
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_END_POINT}register`,
        {
          appID: app_id,
          authCode: auth_code,
          clientSecret: client_secret,
          redirectURL: redirect_uri
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
        console.log(response)
    } catch (error) {
      console.log(error.response)
    }
  }

  const handleCheckBoxChange = () => {
    setAppIsRegistered(!appIsRegistered)
  }

  const handleAppIDChange = (e) => {
    e.target.value === '' ? setAppID('$APP_ID') : setAppID(e.target.value)
  }

  const handleUriChange = (e) => {
    e.target.value === '' ? setRedirectUri('$REDIRECT_URI') : setRedirectUri(e.target.value)
  }

  const optionalFields = () => {
    return (
      <>
        <Input
          id='client_secret_field'
          isRequired
          isClearable
          variant='faded'
          type='text'
          label='Cliente secreto'
          name='client_secret'
          placeholder='Ingresa tu cliente secreto'
          className='max-w-md'
        />
        <Input
          id='redirect_uri_field'
          onChange={handleUriChange}
          variant='faded'
          type='text'
          label='URL de redirección'
          placeholder='Ingresa la URL de redirección'
          className='max-w-md'
        />
      </>
    )
  }

  return (
    <section className="flex h-screen justify-center items-center p-10 bg-cover bg-[url('src/assets/images/pencil-bg.jpg')]">
      <Card className='w-4/12 h-max p-7'>
        <CardHeader className='text-secondary'>
          <h4 className='text-xl font-bold'>Conecta con tu app de mercado libre</h4>
        </CardHeader>
        <CardBody className='z-10 items-center'>
          <form onSubmit={handleSubmit} className='flex flex-col gap-6 w-9/12'>
            <Input
              id='app_id_field'
              isRequired
              onChange={handleAppIDChange}
              variant='faded'
              type='text'
              label='ID de aplicación'
              placeholder='Ingresa tu ID de aplicación'
              className='max-w-md'
            />
            {!appIsRegistered && optionalFields()}
            <Input
              id='auth_code_field'
              isRequired
              isClearable
              variant='faded'
              type='text'
              label='Codigo de autorización'
              placeholder='TG-XXXXXXXXXXXX'
              className='max-w-md'
            />
            <div className='flex justify-between'>
              <Checkbox value={appIsRegistered} onChange={handleCheckBoxChange}>Mi app ya está registrada</Checkbox>
              <Button type='submit' color='secondary'>Conectar</Button>
            </div>
          </form>
        </CardBody>
        <CardFooter className='flex flex-col items-start text-sm'>
          {!appIsRegistered &&
            <a
              target='_blank'
              rel='noreferrer'
              href={`https://auth.mercadolibre.com.mx/authorization?response_type=code&client_id=${appID}&redirect_uri=${redirectUri}`}
            >
              Click para obtener tu código
            </a>}
          <span />
        </CardFooter>
      </Card>
    </section>
  )
}

export default RegisterMLApp
