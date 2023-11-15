// react
import React, { useState, useEffect, useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Checkbox,
  Divider,
  Link,
  Image,
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Input,
  Dropdown,
  DropdownTrigger,
  Button,
  DropdownMenu,
  getKeyValue,
  DropdownItem,
  Accordion,
  AccordionItem,
} from "@nextui-org/react";
import {
  CiCalendar,
  CiCalendarDate,
  CiFileOn,
  CiMenuKebab,
  CiSearch,
} from "react-icons/ci";
import extractCookie from "../components/Utilities/Cookies/GetCookieByName";
import axios from "axios";
import Swal from "sweetalert2";
export default function Sales() {
  const [selectedItem, setSelectedItem] = useState("Últimos 6 meses");
  const [searchTerm, setSearchTerm] = useState("");
  const [printSelected, setPrintSelected] = useState(false);
  const tableRef = useRef(null);
  const handleDropdownSelect = (item) => {
    setSelectedItem(item);
  };
  const handlePrintSelectedChange = () => {
    setPrintSelected(!printSelected);
  };
  const columns = [
    {
      key: "image",
      label: "Imagen",
    },
    {
      key: "name",
      label: "Nombre",
    },
    {
      key: "price",
      label: "Precio",
    },
    {
      key: "quantity",
      label: "Cantidad",
    },
  ];

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    console.log(searchTerm);
    fetchOrders();
  }, [searchTerm]);

  var fetchOrders = () => {
    const session = extractCookie("session");
    axios
      .get(
        `${import.meta.env.VITE_BACKEND_END_POINT}mercado-libre/orders_all`,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${session}`,
          },
        }
      )
      .then((response) => {
        const { data } = response.data;
        setOrders(data.results);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
        Swal.fire({
          title: `Error con las preguntas`,
          text: `Error encontrado: ${error}`,
          icon: "error",
        });
      })
  };

  const handleDownloadExcel = async () => {
    const pdf = new jsPDF("p", "pt", "letter");
    const table = tableRef.current;
    const canvas = await html2canvas(table);
    const imgData = canvas.toDataURL("image/png");
    pdf.addImage(imgData, "PNG", 10, 10, 600, 750);
    pdf.save("Venta.pdf");
  };
  return (
    <main className="w-full h-fit flex flex-col space-y-4 md:px-12 px-4 md:pt-20 md:pb-8 pt-0">
      <h1 className="text-2xl font-bold mb-7 md:text-left text-center">
        Ventas
      </h1>
      <Card className="max-w-full h-fit bg-neutral-700  hide-scroll">

        <CardBody>
          <Accordion
            showDivider={false}
            className="p-2 flex flex-col gap-1 w-full max-w-[300px]"
            variant="shadow"
          >
            <AccordionItem
              key="1"
              aria-label="Connected devices"
              startContent={
                <div className="flex">
                  <h1>En preparacion</h1>
                  <p className="text-sm">0 ventas</p>
                </div>
              }
            >
              <div className="flex space-x-4 text-xl w-fit">
                <div className="flex flex-col space-y-2 w-1/4">
                  <h1>En preparacion</h1>
                  <p className="text-sm">0 ventas</p>
                  <div className="flex flex-col space-y-4">
                    <Card className="shadow-2xl">
                      <CardHeader>
                        <h1 className="text-ellipsis overflow-hidden ...">
                          Ventas demoradas
                        </h1>
                      </CardHeader>
                      <CardBody>
                        <p>0 ventas</p>
                      </CardBody>
                    </Card>
                    <Card className="shadow-2xl">
                      <CardHeader>
                        <h1>Para enviar</h1>
                      </CardHeader>
                      <CardBody>
                        <p>0 ventas</p>
                      </CardBody>
                    </Card>
                    <Card className="shadow-2xl">
                      <CardHeader>
                        <h1 className="text-ellipsis overflow-hidden ...">
                          Acordar al comprador
                        </h1>
                      </CardHeader>
                      <CardBody>
                        <p>0 ventas</p>
                      </CardBody>
                    </Card>
                  </div>
                </div>
                <Divider orientation="vertical" />
                <div className="flex flex-col space-y-2 w-1/4">
                  <h1>Listas para enviar</h1>
                  <p className="text-sm">0 ventas</p>
                  <div className="flex flex-col space-y-4">
                    <Card className="shadow-2xl">
                      <CardHeader>
                        <h1 className="text-ellipsis overflow-hidden ...">
                          Mensajes no leídos
                        </h1>
                      </CardHeader>
                      <CardBody>
                        <p>0 ventas</p>
                      </CardBody>
                    </Card>
                    <Card className="shadow-2xl">
                      <CardHeader>
                        <h1>Para enviar</h1>
                      </CardHeader>
                      <CardBody>
                        <p>0 ventas</p>
                      </CardBody>
                    </Card>
                  </div>
                </div>
                <Divider orientation="vertical" />
                <div className="flex flex-col space-y-2 w-1/4">
                  <h1>En tránsito</h1>
                  <p className="text-sm">0 ventas</p>
                  <div className="flex flex-col space-y-4">
                    <Card className="shadow-2xl">
                      <CardHeader>
                        <h1>En camino</h1>
                      </CardHeader>
                      <CardBody>
                        <p>0 ventas</p>
                      </CardBody>
                    </Card>
                  </div>
                </div>
                <Divider orientation="vertical" />
                <div className="flex flex-col space-y-2 w-1/4">
                  <h1>Finalizadas</h1>
                  <p className="text-sm">0 ventas</p>
                  <div className="flex flex-col space-y-4">
                    <Card className="shadow-2xl">
                      <CardHeader>
                        <h1>Reclamos abiertos</h1>
                      </CardHeader>
                      <CardBody>
                        <p>0 ventas</p>
                      </CardBody>
                    </Card>
                    <Card className="shadow-2xl">
                      <CardHeader>
                        <h1>Ventas concretadas</h1>
                      </CardHeader>
                      <CardBody>
                        <p>0 ventas</p>
                      </CardBody>
                    </Card>
                    <Card className="shadow-2xl">
                      <CardHeader>
                        <h1>Ventas NO concretadas</h1>
                      </CardHeader>
                      <CardBody>
                        <p>0 ventas</p>
                      </CardBody>
                    </Card>
                  </div>
                </div>
              </div>
            </AccordionItem>
          </Accordion>

        </CardBody>
      </Card>
      <div className="flex space-x-3  hide-scroll">
        <Input
          type="text"
          label="Búsqueda"
          placeholder="Escribe para buscar..."
          className="w-1/3"
          startContent={<CiSearch />}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Divider orientation="vertical" />
        <Dropdown>
          <DropdownTrigger>
            <Button variant="bordered">
              <CiCalendarDate /> {selectedItem}
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            variant="faded"
            aria-label="Dropdown menu with description"
          >
            <DropdownItem
              key="new"
              description="Create a new file"
              startContent={<CiCalendarDate />}
              onClick={() => handleDropdownSelect("Últimas 24 horas")}
            >
              Últimas 24 horas
            </DropdownItem>
            <DropdownItem
              key="copy"
              description="Copy the file link"
              startContent={<CiCalendarDate />}
              onClick={() => handleDropdownSelect("Última semana")}
            >
              Última semana
            </DropdownItem>
            <DropdownItem
              key="edit"
              showDivider
              description="Allows you to edit the file"
              startContent={<CiCalendarDate />}
              onClick={() => handleDropdownSelect("Último mes")}
            >
              Último mes
            </DropdownItem>
            <DropdownItem
              key="delete"
              className="text-danger"
              color="danger"
              description="Permanently delete the file"
              startContent={<CiCalendarDate />}
              onClick={() => handleDropdownSelect("Últimos 3 meses")}
            >
              Últimos 3 meses
            </DropdownItem>
            <DropdownItem
              key="delete2"
              className="text-danger"
              color="danger"
              description="Permanently delete the file"
              startContent={<CiCalendarDate />}
              onClick={() => handleDropdownSelect("Últimos 6 meses")}
            >
              Últimos 6 meses
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <Divider orientation="vertical" />
        <h1 className="flex items-center flex-grow justify-end">0 ventas</h1>
      </div>
      <div className="w-full flex ">
        <div className="flex flex-grow justify-start space-x-4">
          <Checkbox onChange={handlePrintSelectedChange} color="primary">
            Seleccionar Todas las Ventas
          </Checkbox>
          <Dropdown>
            <DropdownTrigger>
              <div className="flex items-center cursor-pointer">
                <CiMenuKebab />
              </div>
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions">
              <DropdownItem key="detail">Ver detalle</DropdownItem>
              <DropdownItem key="cancel" className="text-danger" color="danger">
                Cancelar venta
              </DropdownItem>
              <DropdownItem key="quote">Adjuntar factura</DropdownItem>
              <DropdownItem key="add">Agregar nota</DropdownItem>
              <DropdownItem key="help">Necesito ayuda</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
        <Button
          className="flex space-x-2 justify-end"
          isDisabled={!printSelected}
          onClick={handleDownloadExcel}
        >
          Descargue tabla de ventas <CiFileOn />
        </Button>
      </div>
      <div ref={tableRef}>
        {Object.values(
          orders.reduce((acc, order, index) => {
            if (!acc[order.pack_id]) {
              acc[order.pack_id] = [order];
            } else {
              acc[order.pack_id].push(order);
            }
            return acc;
          }, {})
        ).map((groupedOrders, pack_id) => (
          <div key={pack_id} className="mb-10">
            <Table selectionMode="multiple" >
              <TableHeader columns={columns}>
                {(column) => (
                  <TableColumn key={column.key}>{column.label}</TableColumn>
                )}
              </TableHeader>
              <TableBody>
                {groupedOrders.map((order, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Image
                        className="object-contain m-auto w-12 h-12 rounded-xl"
                        loading="lazy"
                        isZoomed
                        alt="Producto"
                        src={order.order_items[0].item.image}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="text-clip">
                        {order.order_items[0].item.title}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-clip">
                        {order.order_items[0].full_unit_price}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-clip">
                        {order.order_items[0].quantity}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ))}
      </div>
    </main>
  );
}
