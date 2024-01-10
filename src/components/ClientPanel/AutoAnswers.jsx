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
} from "@nextui-org/react";
import axios from "axios";
import extractCookie from "../Utilities/Cookies/GetCookieByName";

const columns = [
    { name: "Palabra clave", uid: "keyword" },
    { name: "Respuesta", uid: "answer" },
    { name: "Acciones", uid: "actions" },
];

export default function AutoAnswers({ className, answersArr }) {
    const session = extractCookie("session");
    const [answers, setAnswers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

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
        console.log(response.data)
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
                    <div className="relative flex justify-end items-center gap-2">
                    </div>
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
            <Button color="primary" className="w-fit float-left">
                Añadir respuesta rapida
            </Button>
        </div>
    );
}
