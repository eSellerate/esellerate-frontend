import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Input,
  Button,
} from "@nextui-org/react";
import { NavLink, useNavigate } from "react-router-dom";
import { PiEyeLight, PiEyeClosedLight } from "react-icons/pi";
import axios from "axios";
import useToggle from "../../hooks/useToggle";
import Swal from "sweetalert2";
export default function SignUpCard() {
  const passwordInput = useToggle();
  const confirmPasswordInput = useToggle();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    // get all data from form
    const firstName = e.target.name_field.value;
    const lastName = e.target.lastname_field.value;
    const email = e.target.email_field.value;
    const password = e.target.password_field.value;
    const confirmPassword = e.target.password_confirm_field.value;
    // send data to backend
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_END_POINT}register`,
        {
          firstName,
          lastName,
          email,
          password,
          confirmPassword,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        Swal.fire({
          title: `Bienvenido, ${firstName}`,
          text: "Usuario Registrado",
          icon: "success",
          timer: 2500,
        });
        navigate("/login");
      }
    } catch (error) {
      try {
        const errorResponse = JSON.parse(error.request.response);

        if (errorResponse.errors && Array.isArray(errorResponse.errors)) {
          errorResponse.errors.forEach((error) => {
            const errorMsg = error.msg;
            Swal.fire({
              title: `No se pudo registrar`,
              text: errorMsg,
              icon: "error",
            });
          });
        } else {
          Swal.fire({
            title: `Error de formato inesperado`,
            text: errorResponse,
            icon: "error",
          });
        }
      } catch (parseError) {
        console.error("Error parsing response:", parseError);
        Swal.fire({
          title: `Error de parsing en respuesta`,
          text: parseError,
          icon: "error",
        });
      }
    }
  };

  return (
    <Card className="md:w-1/3 w-5/6 h-fit m-auto">
      <CardHeader className="text-xl justify-center">
        <h1 className="text-center">Únete a eSellerate</h1>
      </CardHeader>
      <Divider />
      <CardBody>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 px-12">
          <Input
            isRequired
            variant="faded"
            type="text"
            id="name_field"
            label="Nombre"
            placeholder="Ingresa tu nombre"
          />
          <Input
            isRequired
            variant="faded"
            type="text"
            id="lastname_field"
            label="Apellido"
            placeholder="Ingresa tu apellido"
          />
          <Input
            isRequired
            variant="faded"
            type="email"
            id="email_field"
            label="Correo electrónico"
            placeholder="Ingresa tu correo electrónico"
          />
          <Input
            isRequired
            variant="faded"
            id="password_field"
            label="Contraseña"
            placeholder="Ingresa tu contraseña"
            endContent={
              <button
                className="focus:outline-none"
                type="button"
                onClick={passwordInput.toggle}
              >
                {passwordInput.isVisible ? (
                  <PiEyeLight className="text-2xl text-default-400 pointer-events-none" />
                ) : (
                  <PiEyeClosedLight className="text-2xl text-default-400 pointer-events-none" />
                )}
              </button>
            }
            type={passwordInput.isVisible ? "text" : "password"}
          />
          <Input
            isRequired
            variant="faded"
            id="password_confirm_field"
            label="Confirma tu contraseña"
            placeholder="Ingresa tu contraseña"
            endContent={
              <button
                className="focus:outline-none"
                type="button"
                onClick={confirmPasswordInput.toggle}
              >
                {confirmPasswordInput.isVisible ? (
                  <PiEyeLight className="text-2xl text-default-400 pointer-events-none" />
                ) : (
                  <PiEyeClosedLight className="text-2xl text-default-400 pointer-events-none" />
                )}
              </button>
            }
            type={confirmPasswordInput.isVisible ? "text" : "password"}
          />
          <div className="flex justify-end">
            <Button
              type="submit"
              className="w-28"
              color="primary"
              variant="solid"
            >
              Registrate
            </Button>
          </div>
        </form>
      </CardBody>
      <Divider />
      <CardFooter className="px-9 py-4">
        <p className="flex w-full justify-between text-sm">
          <p className="decoration-solid">¿Ya tienes cuenta?</p>
          <NavLink to="/login">
            <em className="text-secondary">Inicia sesión</em>
          </NavLink>
        </p>
      </CardFooter>
    </Card>
  );
}
