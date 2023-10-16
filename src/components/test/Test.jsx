import React from 'react'
import axios from 'axios'
import { Button, ButtonGroup } from '@nextui-org/react'

function testz () {
  alert('ayuda')
  const options = {
    method: 'POST',
    url: 'https://api.mercadolibre.com/items/validate',
    headers: {
      Authorization: 'Bearer APP_USR-6181695585855937-091312-04ca026daf2244a5be7b92a506502587-1479214990',
      'Content-Type': 'application/json'
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
      video_id: 'YOUTUBE_ID_HERE',
      pictures: [
        { source: 'http://upload.wikimedia.org/wikipedia/commons/e/e9/Tea_Cup.jpg' }
      ]
    }
  }

  axios(options)
    .then(function (response) {
      // console.log(response)
    }).catch(function (error) {
      console.error('Error', error)
    })
}

function Test () {
  return (
    <>
      <Button color='default' onPress={testz}>Prueba Crear Publicación</Button>
    </>
  )
}

export default Test
