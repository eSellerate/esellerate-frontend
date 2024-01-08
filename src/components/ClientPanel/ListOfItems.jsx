import React, { useContext } from 'react'
// Next ui
import { Card, CardBody } from "@nextui-org/card"
import { Divider } from "@nextui-org/divider" 
import { Image } from "@nextui-org/image"

import PropTypes from 'prop-types'
import ordersContext from '../../hooks/useOrders';

export default function ListOfItems(props) {

    ListOfItems.propTypes = {
        setOrder: PropTypes.func
    }

    const orders = useContext(ordersContext)


    const setSelectedCard = (event) => {
        const cards = document.querySelectorAll('.sale-items-card')
        cards.forEach(card => {
            if (card === event.target) {
                card.classList.add('bg-gray-800')
            } else {
                card.classList.remove('bg-gray-800')
            }
        })
    }

    return (
        <div className='flex flex-col gap-2'>
            <h2 className='text-lg font-bold'>
                Ordenes pendientes
            </h2>
            {  
                orders ?
                orders.map((order, index) => (
                    <button 
                        key={index}
                        onClick={(event) => {
                            setSelectedCard(event)
                            props.setOrder(order)
                        }}
                    >
                        <Card
                            className='hover:bg-gray-800'
                        >
                            <CardBody className='sale-items-card flex flex-row gap-2 items-center'>
                                <Image 
                                    className='rounded-full object-cover'
                                    isBlurred
                                    width={40}
                                    height={40}
                                    alt={order.order_items[0].item.title}
                                    src={order.order_items[0].item.image}
                                />
                                <div className='flex flex-col gap-1'>
                                    <h3 className='text-sm font-bold'>
                                        id: {order.id}
                                    </h3>
                                    <span className='text-xs'>
                                        {order.status}: ${order.total_amount} MXN
                                    </span>
                                </div>
                            </CardBody>
                            <Divider/>
                            <div>
                                <span className='flex text-xs gap-2 items-center p-2'>
                                    <p className='font-bold'>Comprador: </p>
                                    <p>{order.buyer.nickname}</p>
                                </span>
                            </div>
                        </Card>
                    </button>  
                )) 
                : 
                <p>No hay ordenes pendientes</p>
            }
        </div>
    );
}
