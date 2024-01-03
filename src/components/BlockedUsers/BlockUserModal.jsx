import React, {
    useEffect,
    useState
} from "react";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Textarea,
    Checkbox,
    CheckboxGroup
} from "@nextui-org/react";
import axios from "axios";
import extractCookie from "../Utilities/Cookies/GetCookieByName";

const BlockUserModal = (props) => {
    const [groupSelected, setGroupSelected] = useState(["order", "questions"]);
    const [value, setValue] = useState("");
    const session = extractCookie("session");

    async function BlacklistUsers() {
        let array = value;
        array = array.replace(/\s/g,'').split(",");
        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_END_POINT}mercado-libre/blacklistusers`,
          {
            users: array,
            blacklist_types: groupSelected
          },
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${session}`,
            },
          }
        );
        setValue("")
        props.onSend();
      }

    return (
        <Modal size="3xl" className="dark text-white" isOpen={props.isOpen} onClose={props.onClose}>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">Bloquear Usuarios</ModalHeader>
                        <ModalBody>
                            <Textarea
                                label="Compradores a bloquear"
                                placeholder="Ingresa el usuario o ID del comprador, se pueden ingresar mas de 1 separados por coma (,)"
                                className=""
                                value={value}
                                onValueChange={setValue}
                            />
                            <div className="flex flex-col gap-1 w-full">
                                <CheckboxGroup
                                    label="Tipo de bloqueo"
                                    value={groupSelected}
                                    onChange={setGroupSelected}
                                    classNames={{
                                        base: "w-full"
                                    }}
                                >
                                    <Checkbox value="order">
                                        Bloquear Compras
                                    </Checkbox>
                                    <Checkbox value="questions">
                                        Bloquear Preguntas
                                    </Checkbox>
                                </CheckboxGroup>
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button onPress={onClose}>
                                Cancelar
                            </Button>
                            <Button color="primary" onPress={BlacklistUsers}>
                                Confirmar
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
};

export default BlockUserModal