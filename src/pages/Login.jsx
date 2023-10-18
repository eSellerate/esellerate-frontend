import React from 'react'
// components
import LoadingCard from '../components/Login/LoginCard'

export default function Login () {
  return (
    <main className="h-screen bg-gradient-to-r from-violet-500 to-fuchsia-500
    md:bg-[url('src/assets/images/background-products.jpg')]"
    >
      <section className='h-full items-center p-8 md:p-32 flex justify-center'>
        <LoadingCard />
      </section>
    </main>
  )
}
