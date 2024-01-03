import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Checkbox,
  Divider,
  Input,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure
} from "@nextui-org/react";
import { PiEyeLight, PiEyeClosedLight } from "react-icons/pi";
import GetCookieByName from "../Utilities/Cookies/GetCookieByName";
// libraries
// redux
import { useDispatch } from "react-redux";
import { addUser } from "../../redux/userSlice";

export default function Login() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <Card className="w-[420px] p-4 h-fit">
      <CardHeader className="block mx-auto text-xl p-0 pb-3">
        <h1 className="text-center">Inicia sesión</h1>
      </CardHeader>
      <CardBody>
        <Button onPress={onOpen} color="warning" variant="solid">
          INGRESAR DE FORMA SEGURA CON MERCADOLIBRE
        </Button>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} className="dark text-white">
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">Importante</ModalHeader>
                <ModalBody className="text-justify">
                  <p>
                    Solo el administrador(cuenta principal) puede acceder.
                  </p>
                  <p>
                    El acceso se realiza por parte de Mercadolibre, seras redireccionado al sitio oficial
                    de Mercadolibre, no se almacena, ni se tiene el acceso a, contraseñas e información
                    que este en contra de la integridad del usuario.
                  </p>
                  <p>
                    Si tienes problemas al entrar, borra el cache de tu navegador o utiliza una ventana de icognito.
                  </p>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Cerrar
                  </Button>
                  <Button color="primary" href={`https://auth.mercadolibre.com.mx/authorization?response_type=code&client_id=${import.meta.env.VITE_CLIENT_ID}&redirect_uri=${import.meta.env.VITE_SITE_URL}`} onPress={() => {
                    window.location.href = `https://auth.mercadolibre.com.mx/authorization?response_type=code&client_id=${import.meta.env.VITE_CLIENT_ID}&redirect_uri=${import.meta.env.VITE_SITE_URL}`;
                    return null;
                  }}
                  >
                    Ingresar
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </CardBody>
    </Card>
  );
}
