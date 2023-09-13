import React from 'react'
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
  Switch
} from '@nextui-org/react'
import PropTypes from 'prop-types'

import InventoryCard from './InventoryCard'

const ProductModal = (props) => {
  ProductModal.propTypes = {
    sku: {
      type: PropTypes.string.isRequired,
      default: '0'
    }
  }

  console.log(props)

  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  return (
    <>
      <div onClick={onOpen}>
        <InventoryCard name="asdas" onPress={onOpen} />
      </div>
      <Modal
        backdrop='blur'
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Nombre del producto</ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  label="SKU"
                  disabled
                  value={props.sku}
                  placeholder="Sku del producto"
                  variant="bordered"
                />
                <Input
                  label="Nombre"
                  placeholder="Nombre del producto"
                  type="text"
                  variant="bordered"
                />
                <Textarea
                  label="Descripción"
                  placeholder="Descripcion del producto"
                  multiple
                  type="text"
                  variant="bordered"
                />
                <Input
                  label="Precio"
                  placeholder="Precio del producto"
                  type="number"
                  variant="bordered"
                />
                 <Switch defaultSelected>
                    Habilitar / Desahabilitar
                </Switch>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}

export default ProductModal
