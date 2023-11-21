import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
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
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
  Image,
} from "@nextui-org/react";
import PropTypes from "prop-types";
import alertify from "alertifyjs";
import "alertifyjs/build/css/alertify.css";
import error404img from "../../assets/imagen-404.webp";
import CardCarousel from "./CardCarousel";
import closePublication from "../../functions/closePublication";
import GetCookieByName from "../Utilities/Cookies/GetCookieByName";

export default function ProductCard(props) {
  ProductCard.propTypes = {
    product: PropTypes.object,
    reloadItems: PropTypes.func,
  };

  // destructuring of props
  const { product, reloadItems } = props;

  // get images
  const image = product.pictures ?? null;

  // state
  const [title, setTitle] = useState(product.title);
  const [description, setDescription] = useState(product.description);
  const [price, setPrice] = useState(product.price);
  const [stock, setStock] = useState(0)
  // UI state
  const [enabled, setEnabled] = useState(true);
  const [custom, setCustom] = useState(true);
  const [selectedCustom, setSelectedCustom] = useState("Personalizado 1");
  const pendingImage =
    "http://http2.mlstatic.com/resources/frontend/statics/processing-image/1.0.0/O-ES.jpg";
  const base_URL = import.meta.env.VITE_BACKEND_END_POINT

  const handleDropdownSelect = (item) => {
    setSelectedCustom(item);
  };
  useEffect(() => {
    if (product.initial_quantity) setStock(product.initial_quantity)
    getProductDescription()
    if (product.status !== "active") {
      setEnabled(false);
    }
  }, []);

  const getProductDescription = async () => {
    try {
      const response = await axios.get(`https://api.mercadolibre.com/items/${product.id}/description`)
      if (response.status === 200) {
        const { plain_text } = response.data
        setDescription(plain_text)
      }
    } catch(error) {

    }
  } 

  const handleClosePublication = (title) => {
    alertify
      .confirm(
        "Eliminar publicación",
        `La publicación "${title}", será eliminada. ¿Deseea continuar?`,
        async function () {
          try {
            const response = await closePublication(product.id);
            if (response.status === 200) {
              alertify.success("Publicación eliminada");
              reloadItems();
            } else {
              alertify.error(response.message);
            }
          } catch (error) {
            alertify.error(error.message);
          }
        },
        function () {}
      )
      .setting({
        movable: false,
        labels: {
          ok: "Eliminar",
          cancel: "Cancelar",
        },
      });
  };

  const editProduct = async () => {
    const session = GetCookieByName('session')
    try {
      await axios.put(`${base_URL}/mercado-libre/modifyProduct?product_id=${product.id}`,
       {
        description,
        title,
        price,
        available_quantity: stock
       },
       {
        headers: {
          Authorization: `Bearer ${session}`,
          'Content-Type': 'application/json'
        }
       }
      )
      Swal.fire({
        position: "center",
        icon: "success",
        title: `Se modifico el producto: ${product.id}`,
        showConfirmButton: false,
        timer: 2500
      })
    } catch(error){
      console.log(error)
      const errors = error.response.data.cause
      if (errors) {
        let errStr = errors.map(err => (err.message))
        Swal.fire({
          position: "center",
          icon: "error",
          title: errStr.toString(),
          showConfirmButton: false,
          timer: 2500
        })
      }
    }
  }

  const handleStatusChange = () => {
    const session = GetCookieByName('session')
    if (enabled) {
      Swal.fire({
        title: `¿Quieres pausar el producto ${product.id}?`,
        text: "Nadie podrá ver ni comprar el producto en MercadoLibre",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: "Cancelar",
        confirmButtonText: "Pausar"
      }).then( async (result) => {
        if (result.isConfirmed) {
          const response = await axios.post(`${base_URL}mercado-libre/pause?id=${product.id}`, null, {
            headers: {
              Authorization: `Bearer ${session}`
            }
          })
          if (response.status === 200) {
            setEnabled(false)
            Swal.fire({
              title: "Producto deshabilitado",
              text: product.id,
              icon: "success"
            })
          }
        }
      })
    } else {
      Swal.fire({
        title: `¿Quieres habilitar el producto ${product.id}?`,
        text: "Los usuario podrán volver a comprar el producto en MercadoLibre",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: "Cancelar",
        confirmButtonText: "Habilitar"
      }).then( async (result) => {
        if (result.isConfirmed) {
          setEnabled(false)
          const response = await axios.post(`${base_URL}mercado-libre/enable?id=${product.id}`, null, {
            headers: {
              Authorization: `Bearer ${session}`,
            }
          })
          if (response.status === 200) {
            setEnabled(true)
            Swal.fire({
              title: "Producto habilitado",
              text: product.id,
              icon: "success"
            })
          }
        }
      });
    }
  }

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <div onClick={onOpen} className="md:w-auto w-full">
        <Card
          isFooterBlurred
          radius="lg"
          className="flex bg-white h-fit hover:cursor-pointer hover:shadow md:mx-0 mx-auto border-none md:p-1 px-4 w-auto"
        >
          {/* <CardHeader className="flex gap-3 justify-center"> */}
          <Image
            className="object-contain p-4 m-auto"
            loading="lazy"
            isZoomed
            alt={product.title}
            src={
              image && image[0]?.url !== pendingImage
                ? image[0].url
                : error404img
            }
          />
          <CardFooter className="justify-between space-x-1 before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small z-10">
            <p className=" text-black/80 font-bold text-secondary truncate">
              {product.title}
            </p>
            <Button
              className="font-bold"
              color="danger"
              variant="bordered"
              onPress={() => handleClosePublication(product.title)}
            >
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
        backdrop="blur"
        isOpen={isOpen}
        size="5xl"
        onOpenChange={onOpenChange}
        scrollBehavior="inside"
        placement="top-center"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Editar producto</ModalHeader>
              <ModalBody>
                <div className="p-5 flex md:flex-row flex-col gap-10 md:gap-28 justify-center">
                  <div className="m-auto">
                    <CardCarousel images={image} />
                  </div>
                  <div className="md:w-96 w-full flex flex-col gap-2">
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
                      endContent={product.currency_id}
                    />
                    <Input
                      label="Existencias"
                      onChange={(e) => {
                        setStock(e.target.value);
                      }}
                      value={stock}
                      placeholder="Existencias del producto"
                      type="number"
                      variant="bordered"
                      endContent='pz(as)'
                    />
                    <div>
                      <p className="text-secondary mb-2">Estado del producto</p>
                      <Switch
                        isSelected={enabled}
                        onValueChange={handleStatusChange}
                      >
                        {enabled ? "Habilitado" : "Deshabilitado"}
                      </Switch>
                    </div>
                    <div className="flex flex-col space-y-4">
                      <p className="text-secondary mb-2">
                        Diseño Personalizado
                      </p>
                      <Switch
                        isSelected={custom}
                        onValueChange={() => {
                          setCustom(!custom);
                        }}
                      >
                        {custom
                          ? "Diseño personalizado"
                          : "Sin personalizar"}
                      </Switch>
                      {custom ? (
                        <Dropdown className="w-fit">
                          <DropdownTrigger>
                            <Button variant="bordered">{selectedCustom}</Button>
                          </DropdownTrigger>
                          <DropdownMenu aria-label="Static Actions">
                            <DropdownItem
                              key="custom1"
                              onClick={() =>
                                handleDropdownSelect("Personalizado 1")
                              }
                            >
                              Personalizado 1
                            </DropdownItem>
                            <DropdownItem
                              key="custom2"
                              onClick={() =>
                                handleDropdownSelect("Personalizado 2")
                              }
                            >
                              Personalizado 2
                            </DropdownItem>
                            <DropdownItem
                              key="custom3"
                              onClick={() =>
                                handleDropdownSelect("Personalizado 3")
                              }
                            >
                              Personalizado 3
                            </DropdownItem>
                            <DropdownItem
                              key="custom4"
                              onClick={() =>
                                handleDropdownSelect("Personalizado 4")
                              }
                            >
                              Personalizado 4
                            </DropdownItem>
                            <DropdownItem
                              key="custom5"
                              onClick={() =>
                                handleDropdownSelect("Personalizado 5")
                              }
                            >
                              Personalizado 5
                            </DropdownItem>
                          </DropdownMenu>
                        </Dropdown>
                      ) : (
                        true
                      )}
                    </div>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" variant="flat" onPress={editProduct}>
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
