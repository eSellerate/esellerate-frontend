import React, { useState } from 'react'
import { FileUploader } from 'react-drag-drop-files'
import { BiSolidCamera } from 'react-icons/bi'

const fileTypes = ['JPG', 'JPEG', 'PNG']

export default function DragNDrop () {
  const [file, setFile] = useState(null)
  const [nodeText, setNodeText] = useState('Selecciona o suelta tus archivos aquí')
  const [error, setError] = useState(false)

  const handleChange = (file) => {
    setFile(file)
  }

  const handleUpload = () => {
    setError(false)
    setNodeText('Se subió el/los archivo(s)')
  }

  const handleTypeError = () => {
    setError(true)
  }

  const node = () => {
    return (
      <>
        <div className='flex flex-row gap-5 justify-center items-center p-3.5 bg-gray-100
            hover:bg-gray-200 border border-black border-dashed rounded hover:cursor-pointer'
        >
          <BiSolidCamera className='text-2xl text-secondary' />
          <p className='text-black text-xs'>{nodeText}</p>
        </div>
        <div className='flex flex-col'>
          {
            error
              ? <span className='text-xs text-red-500'>Tipo de archivo no admitido.</span>
              : <></>
          }
          <span className='text-xs'>Archivos admitidos {String(fileTypes)}</span>
        </div>
      </>
    )
  }

  return (
    <FileUploader
      handleChange={handleChange}
      label='Selecciona o suelta tus archivos aquí'
      hoverTitle='Suelta tus archivos aquí'
      children={node()}
      onDrop={handleUpload}
      onSelect={handleUpload}
      onTypeError={handleTypeError}
      name='file'
      multiple
      types={fileTypes}
    />
  )
}
