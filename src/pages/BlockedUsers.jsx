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
  Spinner,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem
} from "@nextui-org/react";
import axios from "axios";

//components
import LoadingPage from "../components/Utilities/Loading/LoadingPage";
import LoadingSpinner from "../components/Utilities/Loading/LoadingSpinner";
import extractCookie from "../components/Utilities/Cookies/GetCookieByName";
import { VerticalDotsIcon } from "../components/Utilities/Icons/VerticalDotsIcon";
import SearchBar from "../components/Utilities/SearchBar";
import BlockUserModal from "../components/BlockedUsers/BlockUserModal";

const columns = [
  { name: "Nombre", uid: "nickname", sortable: true },
  //{ name: "Fecha de Registro", uid: "title", sortable: true },
  //{ name: "Fecha de Bloqueo", uid: "role", sortable: true },
  { name: "Bloqueado de preguntar", uid: "questions" },
  { name: "Bloqueado de comprar", uid: "order" },
  { name: "Acciones", uid: "actions" },
];

export default function BlockedUsers() {
  //change to true when done
  const [isLoading, setIsLoading] = useState(true);
  const [showBlockUserModal, setShowBlockUserModal] = useState(false)
  const session = extractCookie("session");
  const [blacklist, setBlacklist] = useState([]);
  const [sortedBlacklist, setSortedBlacklist] = useState([]);

  async function getMercadoLibreBlacklist() {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_END_POINT}mercado-libre/blacklist`,
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${session}`,
        },
      }
    );
    console.log(response.data)
    setBlacklist(response.data);
    setSortedBlacklist(response.data)
    setIsLoading(false);
  }

  useEffect(() => {
    if (isLoading) {
      setSortedBlacklist([]);
      setTimeout(() => {
        getMercadoLibreBlacklist();
      }, 2000);
    }
  }, [isLoading]);

  async function unBlackListUser(user_id, type) {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_END_POINT}mercado-libre/unblacklist`,
      {
        user_id: user_id,
        type: type
      },
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${session}`,
        },
      }
    );
  }

  const renderCell = React.useCallback((item, columnKey) => {
    const cellValue = item[columnKey];

    switch (columnKey) {
      case "order":
      case "questions":
        if (cellValue)
          return "Bloqueado";
        return "------";
      case "actions":
        return (
          <div className="relative flex justify-end items-center gap-2">
            <Dropdown>
              <DropdownTrigger>
                <Button isIconOnly size="sm" variant="light">
                  <VerticalDotsIcon className="text-default-300" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem onPress={() => {
                  unBlackListUser(item["id"], "order");
                  unBlackListUser(item["id"], "questions");
                  setIsLoading(true);
                }}>Desbloquear</DropdownItem>
                <DropdownItem onPress={() => {
                  unBlackListUser(item["id"], "questions");
                  setIsLoading(true);
                }}>Desbloquear Preguntas</DropdownItem>
                <DropdownItem onPress={() => {
                  unBlackListUser(item["id"], "order");
                  setIsLoading(true);
                }}>Desbloquear Compras</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
    <>
      <BlockUserModal isOpen={showBlockUserModal} onClose={() => {
        setShowBlockUserModal(false);
      }} onSend={() => {
        setShowBlockUserModal(false);
        setIsLoading(true);
      }} />
      <div className="flow-root">
        <div className="float-left">
          <SearchBar />
        </div>
        <Button color="primary" className="w-fit float-right" onPress={() => setShowBlockUserModal(true)}>
          Bloquear Comprador
        </Button>
      </div>
      <Table
        aria-label="Usuarios Bloqueados"
        isHeaderSticky
        classNames={{
          wrapper: "max-h-[382px]",
        }}
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
              allowsSorting={column.sortable}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody emptyContent={" "} items={sortedBlacklist} isLoading={isLoading}
          loadingContent={<LoadingSpinner />}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
}