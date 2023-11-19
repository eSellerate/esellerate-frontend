// react
import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  Button,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Image,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
  Accordion,
  AccordionItem,
} from "@nextui-org/react";
import { CiMenuKebab, CiWarning } from "react-icons/ci";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import extractCookie from "../components/Utilities/Cookies/GetCookieByName";
import axios from "axios";
import Swal from "sweetalert2";
import LoadingPage from "../components/Utilities/Loading/LoadingPage";

export default function SaleDetail() {
  const location = useLocation();
  var queryParameters = location.search.split('=')
  const id = queryParameters[1]

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  var fetchOrder = () => {
    const session = extractCookie("session");
    console.log(id)
    axios
      .get(
        `${import.meta.env.VITE_BACKEND_END_POINT}mercado-libre/order_by_id?id=${id}`,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${session}`,
          },
        }
      )
      .then((response) => {
        let data = response.data
        if (data.data)
          data = data.data
        console.log(data)
        setOrders(data)
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
        Swal.fire({
          title: `Error obteniendo las ventas`,
          text: `Error encontrado: ${error}`,
          icon: "error",
        });
      })
      .finally(() => {
        setLoading(false)
      });
  };

  useEffect(() => {
    fetchOrder();
  }, []);


  return (
    <main className="min-h-screen bg-black flex md:pt-20 pt-4 px-8 pb-8 md:space-x-6 md:flex-row flex-col overflow-auto space-y-4">
      {loading ? <LoadingPage /> :
        <>
          <div className="md:w-2/3 flex flex-col space-y-6">
            <div className="flex flex-col">
              <h1 className="text-2xl">{
                orders.length === 0
                  ? orders[0].order_items[0].item.title
                  : "1 Paquete"
              }</h1>
              <h1>Venta #2000006884120712 13 nov. 2023 13:58hs.</h1>
            </div>
            <div className="bg-zinc-900 rounded-md flex items-center text-white space-x-2 px-2 py-2">
              <div className="w-fit flex items-center">
                <Image
                  alt="user photo"
                  className="h-10 rounded-full"
                  src="https://datepsychology.com/wp-content/uploads/2022/09/gigachad.jpg"
                />
              </div>
              <div className="w-3/5 flex flex-col flex-grow">
                <h1>Test Test</h1>
                <h1>TESTUSER1722269484</h1>
              </div>
              <div className=" flex ">
                <NavLink to={"/chat?id=" + id}>
                  <span className="text-indigo-400">Iniciar conversación</span>
                </NavLink>
              </div>
            </div>
            <Card className="p-6">
              <CardHeader className="flex-col">
                <h1 className="text-xl w-full flex justify-start font-bold">
                  Acuerdas la entrega
                </h1>
                <div className="flex space-x-2 md:flex-row flex-col space-y-3">
                  <span className="text-gray-200">
                    Contáctate con tu comprador para entregarle el producto. Si ya
                    lo hiciste, avísanos.
                  </span>
                  <div className="flex space-x-3">
                    <Dropdown>
                      <DropdownTrigger>
                        <Button variant="bordered">
                          <CiMenuKebab className="text-4xl cursor-pointer" />
                        </Button>
                      </DropdownTrigger>
                      <DropdownMenu aria-label="Static Actions">
                        <DropdownItem
                          key="cancel"
                          className="text-danger"
                          color="danger"
                        >
                          Cancelar venta
                        </DropdownItem>
                        <DropdownItem key="help">Necesito ayuda</DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </div>
                </div>
              </CardHeader>
              <CardBody className="flex flex-col">
                <div className="bg-zinc-200 flex text-black rounded-md space-x-4">
                  <div className="bg-blue-500 w-2"></div>
                  <CiWarning className="text-4xl text-blue-500 my-auto md:block invisible" />
                  <div className="flex flex-grow py-2">
                    Usa los mensajes para contactarte con el comprador. Dentro de
                    Mercado Libre tienes todo lo necesario para gestionar la venta.
                    Cómo vender de forma segura
                  </div>
                </div>
              </CardBody>
              <CardFooter>
                <div class="border border-zinc-500 bg-transparent p-4 flex space-x-4 items-center w-full rounded-md overflow-auto">
                  <div className="flex-shrink-0">
                    <Image
                      className="object-contain w-12 h-12 rounded-xl"
                      loading="lazy"
                      isZoomed
                      alt="Producto"
                      src="https://http2.mlstatic.com/D_NQ_NP_948160-MLM71926994916_092023-O.webp"
                    />
                  </div>
                  <span className="whitespace-nowrap">$ 35.00</span>
                  <span className="flex flex-grow whitespace-nowrap">
                    Item De Prueba - Por Favor, No Ofertar
                  </span>
                  <span className="whitespace-nowrap">1 unidad</span>
                </div>
              </CardFooter>
            </Card>
          </div>
          <div className="md:w-1/3  flex-col ">
            <div className="flex flex-col ">
              <h1 className="text-2xl">Cobro aprobado</h1>
              <h1>#66946245064 | 13 de noviembre</h1>
            </div>
            <div className="bg-zinc-900 rounded-md flex flex-col p-4">
              <Accordion>
                <AccordionItem
                  key="1"
                  aria-label="Precio del producto"
                  title="Precio del producto"
                >
                  <div className="w-full flex">
                    <span className="flex fle-grow space-x-2">
                      Item De Prueba - Por Favor, No Ofertar
                    </span>
                    <span className="whitespace-nowrap">$ 35</span>
                  </div>
                </AccordionItem>
                <AccordionItem
                  key="2"
                  aria-label="Accordion 2"
                  title="Cargos por venta"
                >
                  <div className="w-full flex flex-col space-y-4">
                    <div className="w-full flex">
                      <span className="flex flex-grow">Cargo del 15%</span>
                      <span className="whitespace-nowrap">-$ 5.25</span>
                    </div>
                    <div className="w-full flex">
                      <span className="flex flex-grow">Costo fijo</span>
                      <span className="whitespace-nowrap">-$ 25.00</span>
                    </div>
                  </div>
                </AccordionItem>
              </Accordion>
              <Divider className="my-4" />
              <div className="flex">
                <span className="flex flex-grow">Total</span>{" "}
                <span className=" whitespace-nowrap">$4.75</span>
              </div>
            </div>
          </div>
        </>
      }
    </main>
  );
}
