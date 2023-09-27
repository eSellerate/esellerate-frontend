import React from 'react'
import { CiSearch } from 'react-icons/ci'
import { Input, Pagination } from '@nextui-org/react'

// Components
import Summary from '../components/Inventory/Summary'
import InventoryCard from '../components/Inventory/InventoryCard'

const Inventory = () => {
  return (
        <React.Fragment>
            <div className='px-32'>
                <section className='py-9'>
                    <h1 className="text-2xl font-bold mb-7">Resumen de Inventario</h1>
                    <div className="flex gap-14 place-content-center">
                        <Summary name="Productos" value="150"/>
                        <Summary name="Valor" value="23000"/>
                    </div>
                </section>
                <section className='mb-10 flex flex-row-reverse'>
                    <Input
                    type="text"
                    label="Busca un producto"
                    className='w-1/3'
                    placeholder='Escribe para buscar...'
                    startContent={<CiSearch/>}
                    />
                </section>
                <section className='flex flex-wrap gap-7 pb-10'>
                    {
                        // Iterate 20 times (for testing purposes)
                        [...Array(20)].map((_, index) => (<InventoryCard key={index}/>))
                    }
                </section>
                <section className='flex justify-center pb-5'>
                    <Pagination
                    total={10}
                    initialPage={1}
                    color="primary"
                    />
                </section>
            </div>
        </React.Fragment>
  )
}

export default Inventory
