// react
import React, { useState, useEffect } from 'react'
// components
import LoginCard from '../components/Login/LoginCard'
import LoadingPage from '../components/Utilities/Loading/LoadingPage'
// hooks
import useValidateSession from '../hooks/useValidateSession'

export default function Login () {

  const [loading, setLoading] = useState(true)
  const validateSession = useValidateSession()

  useEffect(() => {
    validateSession()
    .then(() => {
      setLoading(false)
    })
  }, [])

  return (
    <main className="h-screen bg-gradient-to-r from-violet-500 to-fuchsia-500
    md:bg-[url('/src/assets/images/background-products.jpg')]"
    >
      <section className='h-full items-center p-8 md:p-32 flex justify-center'>
        { loading ? <LoadingPage /> : <LoginCard /> }
      </section>
    </main>
  )
}
