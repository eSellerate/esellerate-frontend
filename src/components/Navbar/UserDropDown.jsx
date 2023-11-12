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
        <DropdownItem key="profile" className="h-14 gap-2">
          <p className="font-semibold text-primary">{user.userType.name}</p>
          <p className="font-semibold">
            {user.firstName} {user.lastName}
          </p>
          <p className="font-semibold">{user.email}</p>
        </DropdownItem>
        <DropdownItem key="home">
          <NavLink to="/"> Inicio </NavLink>
        </DropdownItem>
        <DropdownItem key="posts">
          <NavLink to="/inventory"> Publicaciones </NavLink>
        </DropdownItem>
        <DropdownItem key="questions">
          <NavLink to="/questions"> Preguntas </NavLink>
        </DropdownItem>
        <DropdownItem onClick={handleLogOut} key="logout" color="danger">
          <a className="text-red-450">Cerrar sesión</a>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
