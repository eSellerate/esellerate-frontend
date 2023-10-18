import React from 'react'
import { Link as LinkUI } from '@nextui-org/link'
import { Link } from 'react-router-dom'
import image404 from '../assets/images/404Ghost.png'

export default function PageNotFound () {
  return (
    <main className='h-screen bg-gray-100'>
      <section className='flex md:block justify-center h-full md:h-max p-5 md:p-10'>
        <div className='flex flex-col justify-center items-center'>
          <img className='w-[300px] md:w-1/4' src={image404} alt='Imágen página no encontrada 404' />
          <h1 className='text-black text-lg md:text-2xl'>Página no encontrada.</h1>
          <p className='py-2 text-secondary text-xs md:text-sm'>El recurso solicitado no existe.</p>
          <LinkUI className='hover:cursor-pointer underline text-xs md:text-sm'>
            <Link to='/'>Volver a página principal</Link>
          </LinkUI>
        </div>
      </section>
    </main>
  )
}
