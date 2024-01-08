import React from 'react'

// Next ui
import { Card, CardBody } from "@nextui-org/card"
import { Image } from "@nextui-org/image"

export default function ListOfItems() {

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

    const ItemCard = () => {
        return (
            <button
                onClick={(event) => setSelectedCard(event)}
            >
                <Card
                    className='hover:bg-gray-800'
                >
                    <CardBody className='sale-items-card flex flex-row gap-2 items-center'>
                        <Image 
                            className='rounded-full'
                            isBlurred
                            width={40}
                            alt='producto'
                            src='https://nextui-docs-v2.vercel.app/images/album-cover.png'
                        />
                        <div className='flex flex-col gap-1'>
                            <h3 className='text-sm font-bold'>Nombre del producto</h3>
                            <span className='text-xs'>SKU</span>
                        </div>
                    </CardBody>
                </Card>
            </button>
        )
    }

    return (
        <div className='flex flex-col gap-2'>
            <h2 className='text-lg font-bold'>
                Productos vendidos
            </h2>
            {
                Array(5).fill(0).map((_, i) => (
                    <ItemCard 
                        key={i}
                    />
                ))
            }
        </div>
    );
}
