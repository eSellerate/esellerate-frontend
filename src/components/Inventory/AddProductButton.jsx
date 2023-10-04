import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {
  Card,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Select,
  SelectItem
} from '@nextui-org/react'
import { BiPlus } from 'react-icons/bi'

export default function AddProduct () {
  const [categories, setCategories] = useState([])

  const { isOpen, onOpen, onClose } = useDisclosure()

  // get categories
  useEffect(() => {
    getCategories()
  }, [])

  async function getCategories () {
    await axios.get(`${import.meta.env.VITE_BACKEND_END_POINT}api/v1/mercado-libre/categories`)
      .then((response) => {
        const { data } = response.data
        setCategories(data)
      })
      .catch((error) => console.log(error.response))
  }

  // conditions of product for select
  const conditionOfProduct = [
    {
      condition: 'Nuevo',
      value: 'new'
    },
    {
      condition: 'Usado',
      value: 'used'
    },
    {
      condition: 'Reacondicionado',
      value: 'refurbished'
    }
  ]

  return (
    <>
      <Card className='p-4 hover:cursor-pointer md:mx-0 mx-auto'>
        <div onClick={onOpen} className='flex items-center gap-4'>
          <BiPlus size={50} />
          <div className='flex flex-col'>
            <p className='text-tiny uppercase font-bold my-auto'>Crear un Post</p>
            <small className='text-default-500 hover:duration-300 hover:text-primary'>
              Publica un nuevo producto
            </small>
          </div>
        </div>
      </Card>
      <Modal
        size='5xl'
        isOpen={isOpen}
        onClose={onClose}
        backdrop='blur'
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Registrar nuevo producto</ModalHeader>
              <ModalBody>
                <form className='flex flex-col gap-5'>
                  <Input
                    isRequired
                    type='text'
                    label='Titulo'
                    placeholder='Titulo del producto'
                    className='max-w-xs'
                  />
                  <Input
                    isRequired
                    type='number'
                    label='Precio'
                    placeholder='Precio del producto'
                    className='max-w-xs'
                  />
                  <Input
                    isRequired
                    type='number'
                    label='Inventario'
                    placeholder='Existencias del producto'
                    className='max-w-xs'
                  />
                  <Select
                    isRequired
                    label='Condición'
                    placeholder='Condición del producto'
                    defaultSelectedKeys={['new']}
                    className='max-w-xs'
                  >
                    {conditionOfProduct.map((condition) => (
                      <SelectItem key={condition.value} value={condition.value}>
                        {condition.condition}
                      </SelectItem>
                    ))}
                  </Select>
                  <Select
                    isRequired
                    label='Categoria'
                    placeholder='Categoria del producto'
                    defaultSelectedKeys={['MLM44011']}
                    className='max-w-xs'
                  >
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </Select>
                </form>
              </ModalBody>
              <ModalFooter>
                <Button color='primary' variant='flat' onPress={onClose}>
                  Agregar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
