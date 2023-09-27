import React, { useEffect, useState } from 'react'
import { CiSearch } from 'react-icons/ci'
import { Input, Pagination } from '@nextui-org/react'
import axios from 'axios'
import Masonry from 'react-responsive-masonry'

// Components
import Summary from '../components/Inventory/Summary'
import ProductCard from '../components/Inventory/ProductCard'
import AddProductButton from '../components/Inventory/AddProductButton'

export default function Inventory () {
  const [products, setProducts] = useState([])

  useEffect(() => {
    getProducts()
  }, [])

  async function getProducts () {
    const response = await axios.get(
      'https://fakestoreapi.com/products?sort=desc'
    )
    if (response.status === 200) {
      setProducts(response.data)
    }
  }
  const items = products.map((product, key) => (
    <ProductCard product={product} key={key} />
  ))
  return (
    <>
      <div className='md:px-12 px-4'>
        <section className='py-9'>
          <h1 className='text-2xl font-bold mb-7 md:text-left text-center'>
            Resumen de Inventario
          </h1>
          <div className='flex gap-14 place-content-center md:flex-row flex-col  md:px-0'>
            <Summary name='Productos' value='150' />
            <Summary name='Valor' value='23000' />
            <AddProductButton />
            <div className='grow flex justify-center items-center'>
              <Input
                type='text'
                label='Busca un producto'
                placeholder='Escribe para buscar...'
                startContent={<CiSearch />}
              />
            </div>
          </div>
        </section>
        {/* <section className="mb-10 flex md:flex-row-reverse mx-auto md:mx-0">
        </section> */}
        <div className='hidden md:block'>
          <section
            className='flex flex-wrap gap-7 pb-10'
            style={{ display: 'flex', flexWrap: 'wrap' }}
          >
            <Masonry columnsCount={4} gutter='15px'>
              {items}
            </Masonry>
          </section>
        </div>
        <div className='block md:hidden'>
          <section className='flex flex-wrap gap-7 pb-10'>
            {products.map((product, key) => (
              <ProductCard product={product} key={key} />
            ))}
          </section>
        </div>
        <section className='flex justify-center pb-5'>
          <Pagination
            total={10}
            initialPage={1}
            onChange={(page) => {
              console.log(page)
            }}
            color='secondary'
          />
        </section>
      </div>
    </>
  )
}
