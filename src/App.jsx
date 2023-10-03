import React from 'react'
import axios from 'axios'
import { Button } from '@nextui-org/react'
import './App.css'

function testz () {
  const options = {
    method: 'POST',
    url: 'https://api.mercadolibre.com/items/validate',
    crossDomain: true,
    headers: {
      Authorization: 'Bearer APP_USR-6181695585855937-091312-04ca026daf2244a5be7b92a506502587-1479214990',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS'
    },
    data: {
      title: 'Teacup',
      category_id: 'MLA1902',
      price: 10,
      currency_id: 'ARS',
      available_quantity: 1,
      buying_mode: 'buy_it_now',
      listing_type_id: 'bronze',
      condition: 'new',
      description: 'Item:, Teacup Model: 1. Size: 5cm. Color: White. New in Box',
      video_id: 'YOUTUBE_ID_HERE'
    }
  }

  axios(options)
    .then(function (response) {
      console.log(response)
    }).catch(function (error) {
      console.error('Error', error)
    })
}

function App () {
  return (
    <>
      <>
        <Button color='default' onPress={testz}>Prueba Crear Publicación</Button>
      </>
      <div className='md:h-full h-screen md:px-12 px-4 flex'>
        <div className='m-auto flex flex-col py-3 gap-y-5'>
          <div className='text-purple-400 font-bold flex'>
            <span className='mx-auto text-5xl'>Welcome!</span>
          </div>
          <div className='max'>
            <img src='src\assets\eSellerate.png' alt='eSellerate logo' />
          </div>
          <div className='px-10 flex justify-between'>
            <div>
              <Button
                radius='full'
                className='bg-gradient-to-tr from-purple-500 to-pink-500 text-white shadow-lg'
              >
                Login
              </Button>
            </div>
            <div>
              <Button
                radius='full'
                className='bg-gradient-to-tr from-violet-500 to-fuchsia-500 text-white shadow-lg'
              >
                Register
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
