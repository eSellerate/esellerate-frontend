import React, {
    useEffect,
    useState
} from "react";
import {
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Button,
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    useDisclosure,
    Input,
    Textarea
} from "@nextui-org/react";
import axios from "axios";
import extractCookie from "../Utilities/Cookies/GetCookieByName";
import useForm from "../../hooks/useForm"
import { AiFillDelete } from "react-icons/ai"

const columns = [
    { name: "Palabra clave", uid: "keyword" },
    { name: "Respuesta", uid: "answer" },
    { name: "Acciones", uid: "actions" },
];

export default function AutoAnswers({ className, answersArr }) {
    const session = extractCookie("session");
    const [answers, setAnswers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    // modal controls
    const {isOpen, onOpen, onOpenChange} = useDisclosure()
    // form
    const keyWordForm = useForm()
    const messageForm = useForm()

    async function handleSubmitKeyword() {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_END_POINT}mercado-libre/set_answer_quick`,
                {
                    keyword: keyWordForm.value,
                    answer: messageForm.value
                },
                {
                    withCredentials: true,
                    headers: {
                        Authorization: `Bearer ${session}`,
                    },
                }
            )
            if (response.status === 200) {
                keyWordForm.reset()
                messageForm.reset()
                getQuickAnswers()
            }
        } catch (error) {
            console.log(error)
        }
    }

    async function handleDelete(id) {
        try {
            const response = await axios.delete(
                `${import.meta.env.VITE_BACKEND_END_POINT}mercado-libre/delete_answer_quick`,
                {
                    data: {
                        id
                    },
                    withCredentials: true,
                    headers: {
                        Authorization: `Bearer ${session}`
                    }
                }
                )
            if (response.status === 200) {
                getQuickAnswers()
            }
        } catch(error) {
            console.log(error)
        }
    }

    async function getQuickAnswers() {
        const response = await axios.get(
            `${import.meta.env.VITE_BACKEND_END_POINT}mercado-libre/answers_quick`,
            {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${session}`,
                },
            }
        );
        console.log('response', response.data)
        setAnswers(response.data);
        setIsLoading(false);
    }

    useEffect(() => {
        if (!answersArr)
            getQuickAnswers();
        else
            setAnswers(answersArr);
    }, []);

    const renderCell = React.useCallback((item, columnKey) => {
        const cellValue = item[columnKey];

        switch (columnKey) {
            case "actions":
                return (
                    <Button onPress={() => {
                        handleDelete(item.id)
                    }}>
                        <AiFillDelete className="text-red-500" size={22} />
                    </Button>
                );
            default:
                return cellValue;
        }
    }, []);

    return (
        <div className={className}>
            <Table aria-label="Respuestas rapidas">
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
                <TableBody items={answers} emptyContent={" "} isLoading={isLoading}>
                    {(item) => (
                        <TableRow key={item.id}>
                            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <Button onPress={onOpen} color="primary" className="w-fit float-left">
                Añadir respuesta rapida
            </Button>
            <Modal 
                isOpen={isOpen}
                size="lg"
                backdrop="opaque"
                onOpenChange={onOpenChange}
                >
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader className="flex flex-col gap-1">
                                    Añadir respuesta rápida
                                </ModalHeader>
                                <ModalBody>
                                    <Input
                                        maxLength={20}
                                        type="text"
                                        variant="flat"
                                        label="Palabra clave"
                                        labelPlacement="outside"
                                        placeholder="Ingresa una palabra clave"
                                        onChange={(event) => {
                                            keyWordForm.changeValue(event.target.value)
                                        }}
                                        value={keyWordForm.value}
                                    >
                                    </Input>
                                    <Textarea
                                         label="Mensaje"
                                         variant="flat"
                                         labelPlacement="outside"
                                         placeholder="Escribe el mensaje ligado a la palabra clave"
                                         onChange={(event) => {
                                            messageForm.changeValue(event.target.value)
                                        }}
                                        value={messageForm.value}
                                    />
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="danger" variant="light" onPress={onClose}>
                                        Cerrar
                                    </Button>
                                    <Button color="primary" onPress={() => {
                                        handleSubmitKeyword()
                                        onClose()
                                    }}>
                                        Añadir
                                    </Button>
                                </ModalFooter>
                            </>
                        )}
                    </ModalContent>
            </Modal>
        </div>
    );
}
