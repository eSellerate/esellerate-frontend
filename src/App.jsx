import React from 'react'
import { Button } from "@nextui-org/react";
import './App.css'
import createPublicationTest from "./functions/validatePublication"

function App () {
  return (
    <>
    <React.Fragment>
      <Button color="default" onPress={createPublicationTest}>Prueba Crear Publicación</Button>
    </React.Fragment>
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
