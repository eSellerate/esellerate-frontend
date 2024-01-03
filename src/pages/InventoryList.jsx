//Libraries
import React, {
  useEffect,
  useState
} from "react";
import { useAsyncList } from "react-stately";
import {
  Input,
  Pagination,
  Image,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Spinner
} from "@nextui-org/react";
import axios from "axios";

//components
import LoadingPage from "../components/Utilities/Loading/LoadingPage";
import LoadingSpinner from "../components/Utilities/Loading/LoadingSpinner";
import extractCookie from "../components/Utilities/Cookies/GetCookieByName";

const columns = [
  {name: "ID", uid: "id", sortable: true},
  {name: "Título", uid: "title", sortable: true},
  {name: "AGE", uid: "age", sortable: true},
  {name: "ROLE", uid: "role", sortable: true},
  {name: "TEAM", uid: "team"},
  {name: "EMAIL", uid: "email"},
  {name: "STATUS", uid: "status", sortable: true},
  {name: "ACTIONS", uid: "actions"},
];

export default function InventoryList() {
  //change to true when done
  const [isLoading, setIsLoading] = useState(true);
  const session = extractCookie("session");
  async function getMercadoLibreProducts() {
      const response = await axios.get(`https://api.mercadolibre.com/items/MLM1978810441`, {
      headers: {
        Authorization: `Bearer ${session}`
      }
    })

    console.log("Testing response")
    console.log(response.data)
  }

  getMercadoLibreProducts()

  let list = useAsyncList({
    async load({ signal }) {
      let res = await fetch(`${import.meta.env.VITE_BACKEND_END_POINT}mercado-libre/product`, {
        method: 'get',
        headers: new Headers({
          Authorization: `Bearer ${session}`
        }),
        signal
      });
      let json = await res.json();
      setIsLoading(false);
      console.log("Results:");
      console.log(json);
      return {
        items: json,
      };
    },
    async sort({ items, sortDescriptor }) {
      return {
        items: items.sort((a, b) => {
          let first = a[sortDescriptor.column];
          let second = b[sortDescriptor.column];
          let cmp = (parseInt(first) || first) < (parseInt(second) || second) ? -1 : 1;

          if (sortDescriptor.direction === "descending") {
            cmp *= -1;
          }

          return cmp;
        }),
      };
    },
  });

  return (
    <>
      <div className="min-h-screen md:px-12 px-4 pb-1 align-middle md:pt-20 pt-0">
        <Table
          aria-label="Publicaciones Activas"
          sortDescriptor={list.sortDescriptor}
          onSortChange={list.sort}
        >
          <TableHeader>
            <TableColumn key="title" allowsSorting>
              Producto
            </TableColumn>
            <TableColumn key="id" allowsSorting>
              ID
            </TableColumn>
            <TableColumn key="mass" allowsSorting>
              Pedidos concretados
            </TableColumn>
            <TableColumn key="birth_year" allowsSorting>
              Birth year
            </TableColumn>
          </TableHeader>
          <TableBody
            isLoading={isLoading}
            loadingContent={<LoadingSpinner />}
          >
          </TableBody>
        </Table>
      </div>
    </>
  );
}