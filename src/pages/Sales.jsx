// react
import React, { useState, useEffect, useRef } from "react";
import jsPDF from "jspdf";
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
} from "@nextui-org/react";

import {
  CiCalendar,
  CiCalendarDate,
  CiFileOn,
  CiMenuKebab,
  CiSearch,
} from "react-icons/ci";
export default function Sales() {
  const [selectedItem, setSelectedItem] = useState("Últimos 6 meses");
  const [searchTerm, setSearchTerm] = useState("");
  const [printSelected, setPrintSelected] = useState(false);
  const tableRef = useRef(null);
  const navigate = useNavigate();
  const handleDropdownSelect = (item) => {
    setSelectedItem(item);
  };
  const handlePrintSelectedChange = () => {
    setPrintSelected(!printSelected);
  };
  const rows = [
    {
      key: "1",
      image:
        "https://http2.mlstatic.com/D_NQ_NP_948160-MLM71926994916_092023-O.webp",
      name: "Item De Prueba - Por Favor, No Ofertar",
      price: "$35.00",
      quantity: "1 unidad",
    },
    {
      key: "2",
      image:
        "https://http2.mlstatic.com/D_NQ_NP_948160-MLM71926994916_092023-O.webp",
      name: "Item De Prueba - Por Favor, No Ofertar",
      price: "$35.00",
      quantity: "1 unidad",
    },
    {
      key: "3",
      image:
        "https://http2.mlstatic.com/D_NQ_NP_948160-MLM71926994916_092023-O.webp",
      name: "Item De Prueba - Por Favor, No Ofertar",
      price: "$35.00",
      quantity: "1 unidad",
    },
    {
      key: "4",
      image:
        "https://http2.mlstatic.com/D_NQ_NP_948160-MLM71926994916_092023-O.webp",
      name: "Item De Prueba - Por Favor, No Ofertar",
      price: "$35.00",
      quantity: "1 unidad",
    },
    {
      key: "5",
      image:
        "https://http2.mlstatic.com/D_NQ_NP_948160-MLM71926994916_092023-O.webp",
      name: "Item De Prueba - Por Favor, No Ofertar",
      price: "$35.00",
      quantity: "1 unidad",
    },
    {
      key: "6",
      image:
        "https://http2.mlstatic.com/D_NQ_NP_948160-MLM71926994916_092023-O.webp",
      name: "Item De Prueba - Por Favor, No Ofertar",
      price: "$35.00",
      quantity: "1 unidad",
    },
  ];
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
            Seleccionar Venta
          </Checkbox>
          <Dropdown>
            <DropdownTrigger>
              <div className="flex items-center cursor-pointer">
                <CiMenuKebab />
              </div>
            </DropdownTrigger>
            <DropdownMenu aria-label="Static Actions">
              <DropdownItem key="detail">
                <NavLink to="/sale-detail">
                  <em className="text-secondary">Ver detalle</em>
                </NavLink>
              </DropdownItem>
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
        <Table aria-label="Example table for Sales">
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn key={column.key}>{column.label}</TableColumn>
            )}
          </TableHeader>
          <TableBody items={rows}>
            {(item) => (
              <TableRow key={item.key}>
                {(columnKey) => (
                  <TableCell>
                    {columnKey === "image" ? (
                      <Image
                        className="object-contain m-auto w-12 h-12 rounded-xl"
                        loading="lazy"
                        isZoomed
                        alt="Producto"
                        src={getKeyValue(item, columnKey)}
                      />
                    ) : (
                      <div className="text-clip">
                        {getKeyValue(item, columnKey)}
                      </div>
                    )}
                  </TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </main>
  );
}
