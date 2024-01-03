import React, { useEffect } from "react";
import {
  Button,
  Navbar,
  Link,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import { NavLink, useLocation } from "react-router-dom";
import UserDropDown from "./UserDropDown";
import { useSelector } from "react-redux";
import logo from "../../assets/logo.svg";
import useUserToRedux from "../../hooks/useUserToRedux";
import useMercadoLibreUser from "../../hooks/useMercadoLibreUser";

export default function DesktopNavbar() {
  const userToRedux = useUserToRedux();
  const mercadolibreUser = useMercadoLibreUser()

  useEffect(() => {
    userToRedux();
    mercadolibreUser();
  }, []);

  const user = useSelector((state) => state.user);

  const location = useLocation();
  const currentPath = location.pathname;
  return (
    <Navbar isBordered className="lg:flex hidden fixed">
      <NavbarBrand>
        <img src={logo} alt="Esellerate Logo" className="w-8 h-8" />
        <p className="font-bold text-inherit">Esellerate</p>
      </NavbarBrand>

      {user.email !== "" && (
        <div className="sm:block hidden">
          <NavbarContent className="sm:flex gap-4" justify="center">
            <NavbarItem isActive={currentPath === "/inventory"}>
              <NavLink to="/inventory"> Inicio </NavLink>
            </NavbarItem>
            <NavbarItem isActive={currentPath === "/questions"}>
              <NavLink to="/questions"> Preguntas </NavLink>
            </NavbarItem>
            <NavbarItem isActive={currentPath === "/blockedusers"}>
              <NavLink to="/blockedusers"> Bloquear Usuarios </NavLink>
            </NavbarItem>
          </NavbarContent>
        </div>
      )}

      <NavbarContent as="div" justify="end">
        {user.email !== "" ? (
          <UserDropDown />
        ) : (
          <Button color="primary" variant="flat">
            <NavLink to="sign-up">Regístrate</NavLink>
          </Button>
        )}
      </NavbarContent>
    </Navbar>
  );
}
