import React, { useEffect } from 'react'

import ListOfItems from './ListOfItems'
import ProductRelevantData from './ProductRelevantData'


export default function RelevantMessages() {

    useEffect(() => {
        console.log('RelevantMessages')
    }, [])

    return (
        <div className='col-span-9'>
            <div className='grid grid-cols-6 gap-4'>
                <section className='col-span-1'>
                    <ListOfItems />
                </section>
                <section className='col-span-5'>
                    <ProductRelevantData />
                </section>
            </div>
        </div>
    )
}
