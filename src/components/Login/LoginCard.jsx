import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
  Divider,
  Checkbox,
  Button,
} from "@nextui-org/react";
import { PiEyeLight, PiEyeClosedLight } from "react-icons/pi";
import GetCookieByName from "../Utilities/Cookies/GetCookieByName";
// libraries
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
// redux
import { useDispatch } from "react-redux";
import { addUser } from "../../redux/userSlice";
import Swal from "sweetalert2";

export default function Login() {
  const [isVisible, setVisible] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let email = "";
  const toggleVisibility = () => {
    setVisible(!isVisible);
  };

  const setUserToRedux = async () => {
    const sessionCookie = GetCookieByName("session");
    if (!sessionCookie) {
      return;
    }
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_END_POINT}profile`,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${sessionCookie}`,
          },
        }
      );
      if (response.status === 200) {
        Swal.fire({
          title: `Bienvenido, ${email}`,
          text: "Sesión iniciada",
          icon: "success",
          timer: 2500,
        });
        dispatch(addUser(response.data.user));
        navigate("/inventory");
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Error",
        text: error,
        icon: "error",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    email = e.target.email_field.value;
    const password = e.target.password_field.value;
    // get data from form
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_END_POINT}login`,
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // save cookie
      const { sid } = response.data;
      const today = new Date(Date.now());
      const expirationDate = new Date(today.getTime() + 6 * 60 * 60 * 1000);
      const expirationCookie = expirationDate.toUTCString();
      document.cookie = `session=${sid}; expires='${expirationCookie}';`;
      setUserToRedux();
    } catch (error) {
      // notify
      const errorText = error.response.data.message;
      Swal.fire({
        title: "Error",
        text: errorText,
        icon: "error",
        timer: 1500,
      });
      console.log(error);
      console.log(errorText);
    }
  };

  return (
    <Card className="w-[420px] p-4 h-fit">
      <CardHeader className="block mx-auto text-xl p-0 pb-3">
        <h1 className="text-center">Inicia sesión</h1>
      </CardHeader>
      <CardBody>
        <form
          onSubmit={handleSubmit}
          className="px-3 py-0 flex flex-col text-small text-default-400 gap-6 h-fit"
        >
          <Input
            isClearable
            variant="faded"
            type="email"
            id="email_field"
            label="Correo electrónico"
            placeholder="Ingresa tu correo electrónico"
            className="max-w-md"
          />
          <div>
            <Input
              id="password_field"
              label="Contraseña"
              variant="faded"
              placeholder="Ingresa tu contraseña"
              endContent={
                <button
                  className="focus:outline-none"
                  type="button"
                  onClick={toggleVisibility}
                >
                  {isVisible ? (
                    <PiEyeLight className="text-2xl text-default-400 pointer-events-none" />
                  ) : (
                    <PiEyeClosedLight className="text-2xl text-default-400 pointer-events-none" />
                  )}
                </button>
              }
              type={isVisible ? "text" : "password"}
              className="max-w-md"
            />
            {/* <div className="flex justify-between items-center text-[0.65rem] md:text-sm py-3 md:py-2">
              <Checkbox size="sm" color="secondary">
                Recuérdame
              </Checkbox>
              <em>¿Olvidaste tu contraseña?</em>
            </div> */}
          </div>
          <Button type="submit" color="primary" variant="solid">
            Iniciar Sesión
          </Button>
        </form>
      </CardBody>
      <Divider className="my-4" />
      <CardFooter className="p-2">
        <div className="flex w-full justify-between text-sm">
          <p className="decoration-solid">¿Aún no tienes cuenta?</p>
          <NavLink to="/sign-up">
            <em className="text-secondary">Registrate</em>
          </NavLink>
        </div>
      </CardFooter>
    </Card>
  );
}
