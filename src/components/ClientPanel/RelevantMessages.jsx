import React, { useEffect, useState } from 'react'
import ordersContext from '../../hooks/useOrders'

import ListOfItems from './ListOfItems'
import ProductRelevantData from './ProductRelevantData'
import GetCookieByName from '../Utilities/Cookies/GetCookieByName'
import axios from 'axios'


export default function RelevantMessages() {

    const [orders, setOrders] = useState([])
    const [order, setOrder] = useState({})
    
    const OrdersContext = ordersContext

    useEffect(() => {
        const getOrders = async () => {
            const session = GetCookieByName('session')
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_BACKEND_END_POINT}/mercado-libre/important_information`,
                    {
                        headers: {
                            Authorization: `Bearer ${session}`
                        }
                    }
                )
                console.log(response.data)
                setOrders(response.data)
            } catch(error) {
                console.log(error)
            }
        }
        getOrders()
    }, [])

    

    return (
        <div className='col-span-9'>
            <div className='grid grid-cols-6 gap-4'>
                <OrdersContext.Provider value={orders}>
                    <section className='col-span-1'>
                        <ListOfItems setOrder={setOrder}/>
                    </section>
                    <section className='col-span-5'>
                        <ProductRelevantData selectedOrder={order} />
                    </section>
                </OrdersContext.Provider>
            </div>
        </div>
    )
}
