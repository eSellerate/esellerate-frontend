// react
import React, { useState, useEffect, useRef } from "react";
import jsPDF from "jspdf";
import { saveAs } from "file-saver";
import html2canvas from "html2canvas";
import { NavLink, useNavigate } from "react-router-dom";
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
import LoadingPage from "../components/Utilities/Loading/LoadingPage";
import Swal from "sweetalert2";
export default function Sales() {
  const [selectedItem, setSelectedItem] = useState("Últimos 6 meses");
  const [searchTerm, setSearchTerm] = useState("");
  const [printSelected, setPrintSelected] = useState(false);
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [selectedOrders, setSelectedOrders] = useState([]);
  const tableRef = useRef(null);
  const navigate = useNavigate();
  const handleDropdownSelect = (item, date) => {
    date.setHours(0, 0, 0, 0);
    setSelectedItem(item);
    6;
    orders.forEach((order) => {
      var order_date = new Date(
        order.date_created.substring(0, order.date_created.indexOf("T"))
      );
      order_date.setHours(0, 0, 0, 0);
      if (order_date < date) {
        order.enabled = false;
      } else order.enabled = true;
    });
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

  useEffect(() => {
    console.log(searchTerm);
  }, [searchTerm]);

  useEffect(() => {
    fetchOrders();
  }, []);

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
          title: `Error obteniendo las ventas`,
          text: `Error encontrado: ${error}`,
          icon: "error",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleDownloadExcel = async () => {
    /*
    const pdf = new jsPDF("p", "pt", "letter");
    const table = tableRef.current;
    const canvas = await html2canvas(table);
    const imgData = canvas.toDataURL("image/png");
    pdf.addImage(imgData, "PNG", 10, 10, 600, 750);
    pdf.save("Venta.pdf");
    */
    if (selectedOrders.length === 0) {
      Swal.fire({
        title: `Error imprimiendo ventas`,
        text: `Seleccione una venta a imprimir`,
        icon: "error",
      });
    } else {
      const session = extractCookie("session");
      var orderscopy = JSON.parse(JSON.stringify(selectedOrders));
      let nodes = Object.keys(orderscopy);
      for (let i = 0; i < nodes.length; i++) {
        if (!orderscopy[i].enabled) {
          orderscopy.splice(i, 1);
        }
      }

      // console.log(selectedOrders);
      // console.log(orderscopy);
      axios
        .post(
          `${import.meta.env.VITE_BACKEND_END_POINT}generate-order`,
          orderscopy,
          {
            responseType: "arraybuffer",
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
              Accept: "application/pdf",
              Authorization: `Bearer ${session}`,
            },
          }
        )
        .then((response) => {
          const { data } = response;
          const blob = new Blob([data], { type: "application/pdf" });
          saveAs(blob, `Recibo-${new Date().toLocaleDateString()}.pdf`);
        })
        .catch((error) => {
          Swal.fire({
            title: `Error descargando reporte de ventas`,
            text: `Error encontrado: ${error}`,
            icon: "error",
          });
        });
    }
  };
  const handleCheckboxChange = (orders) => {
    setSelectedOrders((prevSelectedOrders) => {
      const updatedOrders = [...prevSelectedOrders];
      orders.forEach((order) => {
        const existingIndex = updatedOrders.findIndex(
          (existingOrder) => existingOrder.id === order.id
        );
        if (existingIndex !== -1) {
          updatedOrders.splice(existingIndex, 1);
        } else {
          updatedOrders.push(order);
        }
      });
      return updatedOrders;
    });
  };
  // const handlePrintSelectedChange = () => {
  //   setPrintSelected(!printSelected);
  //   if (!printSelected) {
  //     setSelectedOrders(orders);
  //   }
  //   if (printSelected) {
  //     if(selectedOrders==[]){
  //     setSelectedOrders([selectedOrders]);
  //     }else{
  //       setSelectedOrders([]);
  //     }
  //   }
  //   console.log(selectedOrders);
  // };
  return (
    <main className="bg-black md:w-full min-h-screen flex flex-col space-y-4 p-4">
      {loading ? (
        <LoadingPage />
      ) : (
        <>
          <h1 className="text-2xl font-bold mb-7 md:text-left text-center">
            Ventas
          </h1>
          <Card className="max-w-full h-fit bg-neutral-700  hide-scroll">
            <CardBody>
              <Accordion
                showDivider={false}
                className="w-fit md:w-full"
                variant="shadow"
              >
                <AccordionItem
                  key="1"
                  className="w-fit md:w-full"
                  textValue="orderoverall"
                  title={
                    <div className="flex space-x-6 text-xl">
                      <div className="flex flex-col space-y-2 w-1/4">
                        <h1 className="whitespace-nowrap">En preparación</h1>
                        <p className="text-sm">0 ventas</p>
                      </div>
                      <div className="flex flex-col space-y-2 w-1/4">
                        <h1 className="whitespace-nowrap">
                          Listas para enviar
                        </h1>
                        <p className="text-sm">0 ventas</p>
                      </div>
                      <div className="flex flex-col space-y-2 w-1/4">
                        <h1 className="whitespace-nowrap">En tránsito</h1>
                        <p className="text-sm">0 ventas</p>
                      </div>
                      <div className="flex flex-col space-y-2 w-1/4">
                        <h1 className="whitespace-nowrap">Finalizadas</h1>
                        <p className="text-sm">0 ventas</p>
                      </div>
                    </div>
                  }
                >
                  <div className="flex space-x-4 text-xl w-fit md:w-full">
                    <div className="flex flex-col space-y-2 w-1/4">
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
          <div className="flex space-x-3 items-center hide-scroll md:flex-row flex-col space-y-4">
            <div className="md:w-1/3 w-full">
              <Input
                type="text"
                label="Búsqueda"
                placeholder="Escribe para buscar..."
                startContent={<CiSearch />}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex md:space-x-5 w-full">
              <Divider orientation="vertical" className="block md:hidden" />
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
                    key="day"
                    textValue="day"
                    startContent={<CiCalendarDate />}
                    onClick={() =>
                      handleDropdownSelect(
                        "Últimas 24 horas",
                        new Date(new Date().getTime() - 1 * 24 * 60 * 60 * 1000)
                      )
                    }
                  >
                    Últimas 24 horas
                  </DropdownItem>
                  <DropdownItem
                    key="week"
                    textValue="week"
                    startContent={<CiCalendarDate />}
                    onClick={() =>
                      handleDropdownSelect(
                        "Última semana",
                        new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000)
                      )
                    }
                  >
                    Última semana
                  </DropdownItem>
                  <DropdownItem
                    key="month"
                    textValue="month"
                    startContent={<CiCalendarDate />}
                    onClick={() =>
                      handleDropdownSelect(
                        "Último mes",
                        new Date(
                          new Date().getTime() - 30 * 24 * 60 * 60 * 1000
                        )
                      )
                    }
                  >
                    Último mes
                  </DropdownItem>
                  <DropdownItem
                    key="monththree"
                    textValue="monththree"
                    startContent={<CiCalendarDate />}
                    onClick={() =>
                      handleDropdownSelect(
                        "Últimos 3 meses",
                        new Date(
                          new Date().getTime() - 90 * 24 * 60 * 60 * 1000
                        )
                      )
                    }
                  >
                    Últimos 3 meses
                  </DropdownItem>
                  <DropdownItem
                    key="monthsix"
                    textValue="monthsix"
                    startContent={<CiCalendarDate />}
                    onClick={() =>
                      handleDropdownSelect(
                        "Últimos 6 meses",
                        new Date(
                          new Date().getTime() - 180 * 24 * 60 * 60 * 1000
                        )
                      )
                    }
                  >
                    Últimos 6 meses
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
              <Divider orientation="vertical" className="block md:hidden" />
              <h1 className="flex items-center flex-grow justify-center whitespace-nowrap">
                0 ventas
              </h1>
            </div>
          </div>
          <div className="w-full flex md:flex-row flex-col space-y-3">
            <div className="flex md:flex-grow justify-start space-x-4">
              {/* <Checkbox onChange={handlePrintSelectedChange} color="secondary">
                Seleccionar Todas las Ventas
              </Checkbox> */}
              {/* <Dropdown>
                <DropdownTrigger>
                  <div className="flex items-center justify-end  flex-grow cursor-pointer">
                    <CiMenuKebab />
                  </div>
                </DropdownTrigger>
                <DropdownMenu aria-label="Static Actions">
                  <DropdownItem key="detail" textValue="detail">
                    <NavLink to="/sale-detail">
                      <em className="text-secondary">Ver detalle</em>
                    </NavLink>
                  </DropdownItem>
                  <DropdownItem
                    key="cancel"
                    className="text-danger"
                    color="danger"
                    textValue="cancel"
                  >
                    Cancelar venta
                  </DropdownItem>
                  <DropdownItem key="quote" textValue="quote">
                    Adjuntar factura
                  </DropdownItem>
                  <DropdownItem key="add" textValue="add">
                    Agregar nota
                  </DropdownItem>
                  <DropdownItem key="help" textValue="help">
                    Necesito ayuda
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown> */}
            </div>
            <Button
              className="flex space-x-1 justify-center"
              onClick={handleDownloadExcel}
            >
              <CiFileOn />
              Imprimir ventas
            </Button>
          </div>
          <div ref={tableRef}>
            {Object.values(
              orders.reduce((acc, order, index) => {
                if (order.enabled) {
                  let id = order.pack_id;
                  if (id === undefined || id === null) {
                    id = order.id;
                  }
                  if (!acc[id]) {
                    acc[id] = [order];
                  } else {
                    acc[id].push(order);
                  }
                }
                return acc;
              }, {})
            ).map((groupedOrders, pack_id) => (
              <div key={pack_id} className="mb-10">
                <Card>
                  <CardHeader
                    onClick={() => {
                      groupedOrders[0].pack_id === null
                        ? navigate("/sale-detail?id=" + groupedOrders[0].id)
                        : navigate(
                            "/sale-detail?id=" + groupedOrders[0].pack_id
                          );
                    }}
                  >
                    <Checkbox
                      color="secondary"
                      onChange={() => handleCheckboxChange(groupedOrders)}
                      // checked={selectedOrders.includes(groupedOrders)}
                      checked={printSelected}
                    />
                    <p>
                      #
                      {groupedOrders[0].pack_id === null
                        ? groupedOrders[0].id
                        : groupedOrders[0].pack_id}
                    </p>
                  </CardHeader>
                  <Table aria-label="table">
                    <TableHeader columns={columns} aria-label="table-header">
                      {(column) => (
                        <TableColumn key={column.key} aria-label="table-column">
                          {column.label}
                        </TableColumn>
                      )}
                    </TableHeader>
                    <TableBody>
                      {groupedOrders.map((order, index) => (
                        <TableRow key={index}>
                          <TableCell>
                            <Image
                              className="object-contain m-auto w-12 h-12 rounded-xl shrink-0"
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
                </Card>
              </div>
            ))}
          </div>
        </>
      )}
    </main>
  );
}
