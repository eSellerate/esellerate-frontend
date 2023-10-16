import React, { useEffect, useState } from 'react'
import { Spinner } from '@nextui-org/react'

function LoadingPage () {
  let [loadingDots, setLoadingDots] = useState('')

  useEffect(() => {
    const interval = setInterval(() => {
      if (loadingDots.length < 3) {
        setLoadingDots(loadingDots += '.')
      } else {
        setLoadingDots('')
      }
    }, 500)
    return () => clearInterval(interval)
  }, [loadingDots])

  return (
    <div className='fixed flex z-50 justify-center inset-0 bg-black bg-opacity-70'>
      <Spinner label={'Cargando ' + loadingDots} color='primary' labelColor='primary' size='lg' />
    </div>
  )
}

export default LoadingPage
