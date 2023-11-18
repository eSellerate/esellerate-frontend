import React from "react";
import {
  Avatar,
  Dropdown,
  DropdownMenu,
  DropdownTrigger,
  DropdownItem,
} from "@nextui-org/react";
import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteUser } from "../../redux/userSlice";
import axios from "axios";
import GetCookieByName from "../Utilities/Cookies/GetCookieByName";
import deleteCookie from "../Utilities/Cookies/DeleteCookie";

export default function UserDropDown() {
  const user = useSelector((state) => state.user);
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

  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <Avatar
          isBordered
          as="button"
          className="transition-transform"
          color="secondary"
          name={user.photoUrl}
          size="sm"
          src={user.photoUrl}
        />
      </DropdownTrigger>
      <DropdownMenu aria-label="Profile Actions" variant="flat">
        <DropdownItem key="profile" className="h-14 gap-2" textValue="profile info">
          {/* Assuming user.userType.name is the text value for accessibility */}
          <p
            className="font-semibold text-primary"
          >
            {user.userType.name}
          </p>
          <p
            className="font-semibold"
          >
            {user.firstName} {user.lastName}
          </p>
          <p className="font-semibold">
            {user.email}
          </p>
        </DropdownItem>
        <DropdownItem key="home" textValue="Home">
          <NavLink to="/inventory" className="text-black">
            Inicio
          </NavLink>
        </DropdownItem>
        <DropdownItem key="posts" textValue="Publicaciones">
          <NavLink to="/inventory" className="text-black">
            Publicaciones
          </NavLink>
        </DropdownItem>
        <DropdownItem key="addPost" textValue="Crear publicación">
          <NavLink to="/register-product" className="text-black">
            Crear publicación
          </NavLink>
        </DropdownItem>
        <DropdownItem key="questions" textValue="Preguntas">
          <NavLink to="/questions" className="text-black">
            Preguntas
          </NavLink>
        </DropdownItem>
        <DropdownItem key="sales" textValue="Ventas">
          <NavLink to="/sales" className="text-black">
            Ventas
          </NavLink>
        </DropdownItem>
        <DropdownItem
          onClick={handleLogOut}
          key="logout"
          color="danger"
          textValue="Cerrar sesión"
        >
          <a className="text-red-500">Cerrar sesión</a>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
