import React, { useState } from 'react'
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
  CardHeader,
  CardBody,
  Divider,
  Image
} from '@nextui-org/react'
import PropTypes from 'prop-types'

export default function ProductCard (props) {
  ProductCard.propTypes = {
    product: PropTypes.object
  }

  // destructuring of props
  const { product } = props

  // state
  const [title, setTitle] = useState(product.title)
  const [description, setDescription] = useState(product.description)
  const [price, setPrice] = useState(product.price)
  // UI state
  const [enabled, setEnabled] = useState(true)

  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  return (
    <>
      <div onClick={onOpen}>
        <Card className='min-width-[72] w-72 h-96 hover:cursor-pointer hover:shadow'>
          <CardHeader className='flex gap-3 justify-center'>
            <Image
              className='h-56 object-contain'
              loading='lazy'
              isZoomed
              alt={product.name}
              src={product.image}
            />
          </CardHeader>
          <Divider />
          <CardBody>
            <p className='text-secondary truncate'>{product.title}</p>
            <p>SKU</p>
            <p>Existencias: 500</p>
          </CardBody>
        </Card>
      </div>
      <Modal
        backdrop='blur'
        isOpen={isOpen}
        size='5xl'
        onOpenChange={onOpenChange}
        placement='top-center'
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Editar producto</ModalHeader>
              <ModalBody>
                <div className='p-5 flex flex-row gap-28 justify-center'>
                  <div className='flex items-center'>
                    <Image
                      className='w-64 object-contain'
                      src={product.image}
                    />
                  </div>
                  <div className='w-96 flex flex-col gap-2'>
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
                      endContent='MXN'
                    />
                    <div>
                      <p className='text-secondary mb-2'>Estado del producto</p>
                      <Switch
                        isSelected={enabled}
                        onValueChange={() => { setEnabled(!enabled) }}
                      >
                        {enabled ? 'Habilitado 😉👌' : 'Deshabilitado 😣🚫'}
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
