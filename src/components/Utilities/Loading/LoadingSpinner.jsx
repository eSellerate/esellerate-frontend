import { Spinner } from '@nextui-org/react'
import React, {
  useEffect,
  useState
} from 'react'

function LoadingSpinner () {
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
      <Spinner label={'Cargando ' + loadingDots}/>
  )
}

export default LoadingSpinner
