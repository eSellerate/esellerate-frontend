import React, { useState } from "react";
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
  CardFooter,
  CardBody,
  Divider,
  Image,
} from "@nextui-org/react";
import PropTypes from "prop-types";

export default function ProductCard(props) {
  ProductCard.propTypes = {
    product: PropTypes.object,
  };

  // destructuring of props
  const { product } = props;

  // state
  const [title, setTitle] = useState(product.title);
  const [description, setDescription] = useState(product.description);
  const [price, setPrice] = useState(product.price);
  // UI state
  const [enabled, setEnabled] = useState(true);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <div onClick={onOpen} className="md:w-auto w-full">
        <Card
          isFooterBlurred
          radius="lg"
          className="w-fit h-fit hover:cursor-pointer hover:shadow md:mx-0 mx-auto border-none md:p-1 px-4"
        >
          {/* <CardHeader className="flex gap-3 justify-center"> */}
          <Image
            className="object-contain"
            loading="lazy"
            isZoomed
            alt={product.name}
            src={product.image}
          />
          <CardFooter className="justify-between space-x-1 before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
            <p className=" text-black/80 font-bold text-secondary truncate">
              {product.title}
            </p>
            <Button className="font-bold" color="danger" variant="bordered">
              Delete
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
        backdrop="blur"
        isOpen={isOpen}
        size="5xl"
        onOpenChange={onOpenChange}
        placement="top-center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Editar producto</ModalHeader>
              <ModalBody>
                <div className="p-5 flex md:flex-row flex-col gap-28 justify-center">
                  <div className="flex items-center  md:mx-0 mx-auto">
                    <Image
                      className="md:w-64 w-60 object-contain"
                      src={product.image}
                    />
                  </div>
                  <div className="md:w-96 w-80 flex flex-col gap-2">
                    <Input
                      autoFocus
                      label="SKU"
                      disabled
                      value={product.id}
                      placeholder="Sku del producto"
                      variant="bordered"
                    />
                    <Input
                      label="Nombre"
                      value={title}
                      onChange={(e) => {
                        setTitle(e.target.value);
                      }}
                      placeholder="Nombre del producto"
                      type="text"
                      variant="bordered"
                    />
                    <Textarea
                      label="Descripción"
                      value={description}
                      onChange={(e) => {
                        setDescription(e.target.value);
                      }}
                      placeholder="Descripcion del producto"
                      multiple
                      type="text"
                      variant="bordered"
                    />
                    <Input
                      label="Precio"
                      onChange={(e) => {
                        setPrice(e.target.value);
                      }}
                      value={price}
                      placeholder="Precio del producto"
                      type="number"
                      variant="bordered"
                      startContent="$"
                      endContent="MXN"
                    />
                    <div>
                      <p className="text-secondary mb-2">Estado del producto</p>
                      <Switch
                        isSelected={enabled}
                        onValueChange={() => {
                          setEnabled(!enabled);
                        }}
                      >
                        {enabled ? "Habilitado 😉👌" : "Deshabilitado 😣🚫"}
                      </Switch>
                    </div>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" variant="flat" onPress={onClose}>
                  Editar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
