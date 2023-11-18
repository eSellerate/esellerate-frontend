import React, { useEffect } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Button,
} from "@nextui-org/react";
import { NavLink, useLocation } from "react-router-dom";
import UserDropDown from "./UserDropDown";
import { useSelector } from "react-redux";
import logo from "../../assets/logo.svg";
import useUserToRedux from "../../hooks/useUserToRedux";
import GetCookieByName from "../Utilities/Cookies/GetCookieByName";
import axios from "axios";
import deleteCookie from "../Utilities/Cookies/DeleteCookie";
import { useDispatch } from "react-redux";
import { deleteUser } from "../../redux/userSlice";
import { useNavigate } from "react-router-dom";

export default function MobileNavbar() {
  const userToRedux = useUserToRedux();
  const user = useSelector((state) => state.user);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogOut = async () => {
    const token = GetCookieByName("session");
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_END_POINT}logout`,
        {},
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        deleteCookie("session");
        dispatch(deleteUser());
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    userToRedux();
  }, []);

  let menuItems = [];
  user.email !== ""
    ? (menuItems = [
        {
          name: "Inicio",
          link: "inventory",
        },
        {
          name: "Preguntas",
          link: "questions",
        },
        {
          name: "Ventas",
          link: "sales",
        },
        {
          name: "Cerrar Sesión",
          onClick: handleLogOut,
        },
      ])
    : (menuItems = [
        {
          name: "Inicia sesión",
          link: "login",
        },
        {
          name: "Registrate",
          link: "sign-up",
        },
      ]);
  return (
    <Navbar onMenuOpenChange={setIsMenuOpen} className="lg:hidden block">
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        />
        <NavbarBrand>
          <img src={logo} alt="Esellerate Logo" className="w-8 h-8" />
          <p className="font-bold text-inherit">eSellerate</p>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link href="#">Login</Link>
        </NavbarItem>
        <NavbarItem>
          {user.email !== "" ? (
            <UserDropDown />
          ) : (
            <Button color="primary" variant="flat">
              <NavLink to="sign-up" className=" h-full flex items-center">
                Regístrate
              </NavLink>
            </Button>
          )}
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem
            className="hover:cursor-pointer"
            key={`${item.name}-${index}`}
          >
            <Link
              color={item.name === "Cerrar Sesión" ? "danger" : "foreground"}
              className="w-full"
              href={item.link}
              size="lg"
              onClick={item.onClick}
            >
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
