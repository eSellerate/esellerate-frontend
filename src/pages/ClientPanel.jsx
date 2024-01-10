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
  DropdownItem,
  Listbox,
  ListboxItem,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Textarea,
  cn,
  Avatar
} from "@nextui-org/react";
import axios from "axios";

//components
import LoadingPage from "../components/Utilities/Loading/LoadingPage";
import LoadingSpinner from "../components/Utilities/Loading/LoadingSpinner";
import extractCookie from "../components/Utilities/Cookies/GetCookieByName";
import { VerticalDotsIcon } from "../components/Utilities/Icons/VerticalDotsIcon";
import SearchBar from "../components/Utilities/SearchBar";
import BlockUserModal from "../components/BlockedUsers/BlockUserModal";
import { CiChat1, CiChat2, CiPaperplane, CiPickerHalf } from "react-icons/ci";
import SideComponent from "../components/ClientPanel/SideComponent";
import RelevantMessages from "../components/ClientPanel/RelevantMessages";
import ChatPanel from "../components/Chat/ChatPanel";

const IconWrapper = ({ children, className }) => (
  <div className={cn(className, "flex items-center rounded-small justify-center w-7 h-7")}>
    {children}
  </div>
);

export default function ClientPanel() {
  //change to true when done
  const [isLoading, setIsLoading] = useState(true);
  const session = extractCookie("session");
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState([]);
  const [useChat, setUseChat] = useState(false);
  const [selectedChat, setSelectedChat] = useState([]);
  const [componentflags, setComponentFlags] = useState([
    true,
    false,
    false
  ])

  async function getMercadoLibreOrders() {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_END_POINT}mercado-libre/orders_unfulfilled`,
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${session}`,
        },
      }
    );
    console.log(response.data.data.results);
    setOrders(response.data.data.results);
    setIsLoading(false);
  }

  async function getMercadoLibreChat(id) {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_END_POINT}mercado-libre/message_by_id?id=` + id,
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${session}`,
        },
      }
    );
    console.log(response.data.data);
    setSelectedChat(response.data.data.messages);
    //setIsLoading(false);
  }

  useEffect(() => {
    getMercadoLibreOrders();
  }, [isLoading]);

  useEffect(() => {
    if (selectedOrder.id) {
      let orderid = selectedOrder.packid;
      if(!orderid)
        orderid = selectedOrder.id;
      getMercadoLibreChat(selectedOrder.id);
    }
  }, [useChat]);

  function Chat() {
    if (useChat) {
      return (
        <>
          <CardHeader className="flex gap-3">
            <div className="flex flex-col">
              <p className="text-md">{selectedOrder.payments[0].reason}</p>
              <p className="text-small text-default-500">{selectedOrder.seller.nickname}</p>
            </div>
          </CardHeader>
          <CardBody>
            <ChatPanel messages={selectedChat}/>
          </CardBody>
          <CardFooter>
            <Textarea
              placeholder="Enviar mensaje al comprador"
              className=""
            />
          </CardFooter>
        </>
      );
    }
  }

  function ChatComponent () {
    return (
      <>
        <Listbox
          className="col-span-2 p-0 gap-0 divide-y divide-default-300/50 dark:divide-default-100/80 bg-content1 overflow-visible shadow-small rounded-medium"
          itemClasses={{
            base: "px-3 first:rounded-t-medium last:rounded-b-medium rounded-none gap-3 h-12 data-[hover=true]:bg-default-100/80",
          }}
          items={orders}
        >
          {(item) => (
            <ListboxItem key={item.id}
              onPress={() => {
                setSelectedOrder(item)
                setUseChat(true);
              }}>
              <div className="flex gap-2 items-center">
                <Avatar alt={item.payments[0].reason} className="flex-shrink-0" size="sm"
                  src={item.order_items[0].item.image} />
                <div className="flex flex-col">
                  <span className="text-small">{item.payments[0].reason}</span>
                  <span className="text-tiny text-default-400">{item.seller.nickname}</span>
                </div>
              </div>
            </ListboxItem>
          )}
        </Listbox>
        <Card className="col-span-4">
          {Chat()}
        </Card>
        <Card className="col-span-3">
          <CardHeader className="flex gap-3">
          </CardHeader>
          <CardBody>
            <p></p>
          </CardBody>
          <CardFooter>
          </CardFooter>
        </Card>
      </>
    )
  }

  return (
    <>
      <div className="grid grid-flow-row-dense grid-cols-10 gap-4 h-[calc(100vh-90px)]">
        <Listbox
          aria-label="Actions"
          className="col-span-1"
          itemClasses={{
            base: "px-3 first:rounded-t-medium last:rounded-b-medium rounded-none gap-3 h-12 data-[hover=true]:bg-default-100/80",
          }}
        >
          <ListboxItem key="new" textValue="chat">
            <Button
              onClick={() => setComponentFlags([true, false, false])}
              size="md"
            >
              <IconWrapper className="bg-success/10 text-success">
                <CiChat2 className="text-xl " />
              </IconWrapper>
            </Button>
          </ListboxItem>
          <ListboxItem key="copy" textValue="automatic">
            <Button 
              size="md"
              onClick={() => setComponentFlags([false, true, false])}
            >
              <IconWrapper className="bg-default/50 text-foreground">
                <CiPaperplane className="text-xl " />
              </IconWrapper>
            </Button>
          </ListboxItem>
          <ListboxItem key="info" textValue="automatic" className="flex justify-center">
            <Button 
              size="md"
              onClick={() => setComponentFlags([false, false, true])}
            >
              <IconWrapper className="bg-default/50">
                <CiPickerHalf className="text-xl font-bold" />
              </IconWrapper>
            </Button>
          </ListboxItem>
        </Listbox>
        {componentflags[0] && <ChatComponent />}
        {componentflags[1] && <SideComponent />}
        {componentflags[2] && <RelevantMessages />}
      </div>
    </>
  );
}