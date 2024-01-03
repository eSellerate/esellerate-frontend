// react
import React, { useState, useEffect } from "react";
// components
import LoginCard from "../components/Login/LoginCard";
import LoadingPage from "../components/Utilities/Loading/LoadingPage";
// hooks
import useValidateSession from "../hooks/useValidateSession";
//libraries
import axios from "axios";
import Swal from "sweetalert2";
import { NavLink, useNavigate } from "react-router-dom";
// redux
import { useDispatch } from "react-redux";
import { addUser } from "../redux/userSlice";

export default function Login() {
  const [loading, setLoading] = useState(true);
  const validateSession = useValidateSession();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logincode = async (code) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_END_POINT}login`,
        {
          code
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
      dispatch(addUser(response.data.user));
      window.location.replace(location.origin)
    } catch (error) {
      console.log(error)
      Swal.fire({
        title: "Error",
        html: error.message,
        icon: "error",
      });
    }
  };

  useEffect(() => {
    var queryParameters = location.search.split('=')
    const code = queryParameters[1]
    if (code != undefined) {
      console.log("Code found :")
      console.log(code)
      logincode(code)
    }
    validateSession().then(() => {
      setLoading(false);
    });
  }, []);

  return (
    <main className="h-screen bg-cover bg-center
    bg-[url('/src/assets/images/background-products.jpg')]"
    >
      <section className="h-full items-center p-8 md:p-32 flex justify-center">
        {loading ? <LoadingPage /> : <LoginCard />}
      </section>
    </main>
  );
}
