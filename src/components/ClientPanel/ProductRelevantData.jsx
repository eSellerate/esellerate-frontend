import React from 'react'

import { Image } from "@nextui-org/image"
import { Divider } from "@nextui-org/divider"


export default function ProductRelevantData () {
    return(
        <div className='bg-gray-800 px-8 py-4 rounded-lg'>
            <div className='flex gap-8 items-center mb-4'>
                <Image
                    isBlurred
                    className='object-contain'
                    alt='image'
                    src='https://nextui.org/images/fruit-1.jpeg'
                    width={100}
                />
                <span>
                    <h3 className='text-lg font-bold'>Product Name</h3>
                    <p className='text-sm'>SKU</p>
                    <h3 className='text-lg font-bold'>Client user</h3>
                    <p className='text-sm'>ID</p>
                    <p className='text-sm'>Dia de compra</p>
                </span>
            </div>
            <Divider />
            <div className='mt-4'>
                <h3 className='text-2xl font-bold mb-2'>
                    Información relevante
                </h3>
                <ul className='list-disc py-2 px-8'>
                    <li>
                        <span className='font-bold'>
                            Tamañano de impresion:
                        </span>
                        <span>
                            <br />
                            10 x 10 cm
                        </span>
                    </li>
                    <li>
                        <span className='font-bold'>
                            Texto de impresion:
                        </span>
                        <span>
                            <br />
                            10 x 10 cm
                        </span>
                    </li>
                    <li>
                        <span className='font-bold'>
                            Imágenes:
                        </span>
                        <span>
                            <br />
                            Array
                        </span>
                    </li>
                    <li>
                        <span className='font-bold'>
                            Comentarios:
                        </span>
                        <span>
                            <br />
                            10 x 10 cm
                        </span>
                    </li>
                </ul>
            </div>
        </div>  
    )
}
