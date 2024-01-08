import React from 'react'

import { Image } from "@nextui-org/image"
import { Divider } from "@nextui-org/divider"

import PropTypes from 'prop-types'

export default function ProductRelevantData (props) {

    ProductRelevantData.propTypes = {
        selectedOrder: PropTypes.object
    }

    if (Object.values(props.selectedOrder).length === 0) {
        return (
            <p>Selecciona una orden para ver los detalles</p>    
        )
    }
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
                    <h3 className='text-lg font-bold'>
                        ID: {props.selectedOrder.id}
                    </h3>
                    SKU:
                    {props.selectedOrder.order_items.map((it, i) => (
                        <p 
                            className='text-sm'
                            key={i}
                        >
                            {it.item.id},&nbsp;
                        </p>
                    ))}
                    <h3 className='text-lg font-bold'>
                        Usuario: {props.selectedOrder.buyer.nickname}
                    </h3>
                    <p className='text-sm'>
                        id: {props.selectedOrder.buyer.id}
                    </p>
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
