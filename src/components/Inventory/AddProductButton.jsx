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
import DragNDrop from '../Utilities/DragNDrop/DragNDrop'
import { BiPlus } from 'react-icons/bi'

export default function AddProduct () {
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('')
  const [childCategories, setChildCategories] = useState([])
  const [postTypes, setPostTypes] = useState([])

  const { isOpen, onOpen, onClose } = useDisclosure()

  // get categories
  useEffect(() => {
    getCategories()
    getPostTypes()
  }, [])

  // categories listener
  useEffect(() => {
    handleChildCategories()
  }, [selectedCategory])

  async function getCategories () {
    await axios.get(`${import.meta.env.VITE_BACKEND_END_POINT}mercado-libre/categories`)
      .then((response) => {
        const { data } = response.data
        setCategories(data)
      })
      .catch((error) => console.log(error.response))
  }

  async function handleChildCategories () {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_END_POINT}mercado-libre/categories/${selectedCategory}`)
      // console.log(response.data.data.settings.listing_allowed)
      const { children_categories } = response.data.data
      setChildCategories(children_categories)
    } catch (error) {
      console.log(error.response)
    }
  }

  async function getPostTypes () {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_END_POINT}mercado-libre/product-types`)
      const { data } = response.data
      setPostTypes(data)
    } catch (error) {
      console.log(error.response)
    }
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
        size='3xl'
        isOpen={isOpen}
        onClose={onClose}
        scrollBehavior='inside'
        backdrop='blur'
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Registrar nuevo producto</ModalHeader>
              <ModalBody>
                <form className='flex md:flex-row flex-col md:gap-8 gap-3 mx-auto'>
                  <div className='flex flex-col gap-3 min-w-[230px]'>
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
                      label='Publicaciones'
                      placeholder='Existencias del producto'
                      className='max-w-xs'
                    />
                    <Input
                      type='text'
                      label='Marca'
                      placeholder='Marca del producto'
                      className='max-w-xs'
                    />
                    <Input
                      type='text'
                      label='SKU'
                      placeholder='SKU del vendendor [SELLER_SKU]'
                      className='max-w-xs'
                    />
                  </div>
                  <div className='flex flex-col gap-3 min-w-[230px] max-w-[230px]'>
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
                      label='Tipo de publicación'
                      placeholder='Tipo de publicación'
                      defaultSelectedKeys={['gold']}
                      className='max-w-xs'
                    >
                      {postTypes.map((post) => (
                        <SelectItem key={post.id} value={post.id}>
                          {post.name}
                        </SelectItem>
                      ))}
                    </Select>
                    <Select
                      isRequired
                      label='Categoria Padre'
                      placeholder='Categoria del producto'
                      defaultSelectedKeys={['MLM44011']}
                      className='max-w-xs'
                    >
                      {categories.map((category) => (
                        <SelectItem
                          onClick={() => setSelectedCategory(category.id)}
                          key={category.id}
                          value={category.id}
                        >
                          {category.name}
                        </SelectItem>
                      ))}
                    </Select>
                    {
                      childCategories
                        ? (
                          <Select
                            isRequired
                            label='Categoria Hija'
                            placeholder='Categoria del producto'
                            className='max-w-xs'
                          >
                            {childCategories.map((category, index) => (
                              <SelectItem
                                key={index}
                                value={category.id}
                              >
                                {category.name}
                              </SelectItem>
                            ))}
                          </Select>
                          )
                        : <></>
                    }
                    <label htmlFor='Images' className='text-xs'>Imágenes</label>
                    <DragNDrop />
                  </div>
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
