import React, { useEffect, useState } from 'react'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Textarea,
  Input,
  Switch,
  Card,
  CardFooter,
  Image
} from '@nextui-org/react'
import PropTypes from 'prop-types'
import alertify from 'alertifyjs'
import 'alertifyjs/build/css/alertify.css'
import error404img from '../../assets/imagen-404.webp'
import CardCarousel from './CardCarousel'
import closePublication from '../../functions/closePublication'

export default function ProductCard (props) {
  ProductCard.propTypes = {
    product: PropTypes.object,
    reloadItems: PropTypes.func
  }

  // destructuring of props
  const { product, reloadItems } = props

  // get images
  const image = product.pictures ?? null

  // state
  const [title, setTitle] = useState(product.title)
  const [description, setDescription] = useState(product.description)
  const [price, setPrice] = useState(product.price)
  // UI state
  const [enabled, setEnabled] = useState(true)

  useEffect(() => {
    if (product.status !== 'active') {
      setEnabled(false)
    }
  }, [])

  const handleClosePublication = (title) => {
    alertify.confirm(
      'Eliminar publicación',
      `La publicación "${title}", será eliminada. ¿Deseea continuar?`,
      async function () {
        try {
          const response = await closePublication(product.id)
          if (response.status === 200) {
            alertify.success('Publicación eliminada')
            reloadItems()
          } else {
            alertify.error(response.message)
          }
        } catch (error) {
          alertify.error(error.message)
        }
      },
      function () { }
    ).setting({
      movable: false,
      labels: {
        ok: 'Eliminar',
        cancel: 'Cancelar'
      }
    })
  }

  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  return (
    <>
      <div onClick={onOpen} className='md:w-auto w-full'>
        <Card
          isFooterBlurred
          radius='lg'
          className='flex bg-white h-fit hover:cursor-pointer hover:shadow md:mx-0 mx-auto border-none md:p-1 px-4 w-auto'
        >
          {/* <CardHeader className="flex gap-3 justify-center"> */}
          <Image
            className='object-contain p-4 m-auto'
            loading='lazy'
            isZoomed
            alt={product.title}
            src={image ? image[0].url : error404img}
          />
          <CardFooter className='justify-between space-x-1 before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small z-10'>
            <p className=' text-black/80 font-bold text-secondary truncate'>
              {product.title}
            </p>
            <Button className='font-bold' color='danger' variant='bordered' onPress={() => handleClosePublication(product.title)}>
              Eliminar
            </Button>
          </CardFooter>
          {/* </CardHeader> */}
          {/* <Divider />
          <CardBody>
            <p className="text-secondary truncate">{product.title}</p>
            <p>SKU</p>
            <p>Existencias: 500</p>
          </CardBody> */}
        </Card>
      </div>
      <Modal
        backdrop='blur'
        isOpen={isOpen}
        size='5xl'
        onOpenChange={onOpenChange}
        scrollBehavior='inside'
        placement='top-center'
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Editar producto</ModalHeader>
              <ModalBody>
                <div className='p-5 flex md:flex-row flex-col gap-10 md:gap-28 justify-center'>
                  <div>
                    <CardCarousel images={image} />
                  </div>
                  <div className='md:w-96 w-80 flex flex-col gap-2'>
                    <Input
                      autoFocus
                      label='SKU'
                      disabled
                      value={product.id}
                      placeholder='Sku del producto'
                      variant='bordered'
                    />
                    <Input
                      label='Nombre'
                      value={title}
                      onChange={(e) => {
                        setTitle(e.target.value)
                      }}
                      placeholder='Nombre del producto'
                      type='text'
                      variant='bordered'
                    />
                    <Textarea
                      label='Descripción'
                      value={description}
                      onChange={(e) => {
                        setDescription(e.target.value)
                      }}
                      placeholder='Descripcion del producto'
                      multiple
                      type='text'
                      variant='bordered'
                    />
                    <Input
                      label='Precio'
                      onChange={(e) => {
                        setPrice(e.target.value)
                      }}
                      value={price}
                      placeholder='Precio del producto'
                      type='number'
                      variant='bordered'
                      startContent='$'
                      endContent={product.currency_id}
                    />
                    <div>
                      <p className='text-secondary mb-2'>Estado del producto</p>
                      <Switch
                        isSelected={enabled}
                        onValueChange={() => {
                          setEnabled(!enabled)
                        }}
                      >
                        {enabled ? 'Habilitado 🥵👌' : 'Deshabilitado 😣🚫'}
                      </Switch>
                    </div>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color='primary' variant='flat' onPress={onClose}>
                  Editar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
