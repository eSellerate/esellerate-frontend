import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Checkbox,
  Button,
  Input,
} from "@nextui-org/react";
// hooks
import useValidateSession from "../hooks/useValidateSession";
// utilities
import LoadingPage from "../components/Utilities/Loading/LoadingPage";
import GetCookieByName from "../components/Utilities/Cookies/GetCookieByName";

const RegisterMLApp = () => {
  const [appIsRegistered, setAppIsRegistered] = useState(false);
  const [appID, setAppID] = useState("$APP_ID");
  const [redirectUri, setRedirectUri] = useState("$REDIRECT_URI");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const validateSession = useValidateSession();

  useEffect(() => {
    validateSession().then(() => {
      setIsLoading(false);
    });
  }, []);

  // Form submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    // get all data from form
    const client_id = e.target.app_id_field.value;
    const auth_code = e.target.auth_code_field.value;
    const client_secret = e.target.client_secret_field
      ? e.target.client_secret_field.value
      : "";
    const redirect_uri = e.target.redirect_uri_field
      ? e.target.redirect_uri_field.value
      : "";
    // get session cookie
    const session = GetCookieByName("session");
    // send data to backend
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_END_POINT}add-mercadolibre-app`,
        {
          client_id,
          client_secret,
          redirect_uri,
          auth_code,
        },
        {
          headers: {
            Authorization: `Bearer ${session}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        navigate("/inventory");
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleCheckBoxChange = () => {
    setAppIsRegistered(!appIsRegistered);
  };

  const handleAppIDChange = (e) => {
    e.target.value === "" ? setAppID("$APP_ID") : setAppID(e.target.value);
  };

  const handleUriChange = (e) => {
    e.target.value === ""
      ? setRedirectUri("$REDIRECT_URI")
      : setRedirectUri(e.target.value);
  };

  const optionalFields = () => {
    return (
      <>
        <Input
          id="client_secret_field"
          isRequired
          isClearable
          variant="faded"
          type="text"
          label="Cliente secreto"
          name="client_secret"
          placeholder="Ingresa tu cliente secreto"
          className="max-w-md"
        />
        <Input
          id="redirect_uri_field"
          onChange={handleUriChange}
          variant="faded"
          type="text"
          label="URL de redirección"
          placeholder="Ingresa la URL de redirección"
          className="max-w-md"
        />
      </>
    );
  };

  return (
    <section className="flex h-screen justify-center items-center p-10 bg-cover bg-[url('src/assets/images/pencil-bg.jpg')] m-auto">
      {isLoading && <LoadingPage />}
      <Card className="md:w-1/3 w-5/6 h-max p-4">
        <CardHeader className="text-secondary">
          <h4 className="text-xl font-bold">
            Conecta con tu app de mercado libre
          </h4>
        </CardHeader>
        <CardBody className="z-10 items-center">
          <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
            <Input
              id="app_id_field"
              isRequired
              onChange={handleAppIDChange}
              variant="faded"
              type="text"
              label="ID de aplicación"
              placeholder="Ingresa tu ID de aplicación"
              className="max-w-md"
            />
            {!appIsRegistered && optionalFields()}
            <Input
              id="auth_code_field"
              isRequired
              isClearable
              variant="faded"
              type="text"
              label="Codigo de autorización"
              placeholder="TG-XXXXXXXXXXXX"
              className="max-w-md"
            />
            <div className="flex justify-between space-x-2 space-y-3 m-auto md:flex-row flex-col">
              <Checkbox value={appIsRegistered} onChange={handleCheckBoxChange}>
                Mi app ya está registrada
              </Checkbox>
              <Button type="submit" color="secondary" className="m-auto">
                Conectar
              </Button>
            </div>
          </form>
        </CardBody>
        <CardFooter className="flex flex-col items-start text-sm">
          {!appIsRegistered && (
            <a
              target="_blank"
              rel="noreferrer"
              href={`https://auth.mercadolibre.com.mx/authorization?response_type=code&client_id=${appID}&redirect_uri=${redirectUri}`}
            >
              Click para obtener tu código
            </a>
          )}
          <span />
        </CardFooter>
      </Card>
    </section>
  );
};

export default RegisterMLApp;
