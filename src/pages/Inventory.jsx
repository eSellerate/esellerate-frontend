import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { Input, Pagination, Image } from "@nextui-org/react";
import axios from "axios";
import Masonry from "react-responsive-masonry";
// Components
import Summary from "../components/Inventory/Summary";
import ProductCard from "../components/Inventory/ProductCard";
import AddProductButton from "../components/Inventory/AddProductButton";
import LoadingCard from "../components/Utilities/Loading/LoadingCard";
import LoadingPage from "../components/Utilities/Loading/LoadingPage";
import error404img from "../assets/imagen-404.webp";
// Utils
import extractCookie from "../components/Utilities/Cookies/GetCookieByName";
// Hooks

export default function Inventory() {
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState("0");
  const [totalPost, setTotalPost] = useState("0");
  useEffect(() => {
    getMercadoLibreProducts();
  }, []);
  useEffect(() => {
    let filteredItems = products.filter((item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredItems(filteredItems);
  }, [searchTerm, products]);
  async function getMercadoLibreProducts() {
    const session = extractCookie("session");
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_END_POINT}mercado-libre/product`,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${session}`,
          },
        }
      );
      const { data } = response;
      console.log(data)
      setLoadingProducts(false);
      setProducts(data);
      const arrayLength = data.length;
      const totalArrayPrice = data.reduce(
        (sum, item) => (item.price ? sum + item.price : sum),
        0
      );
      setTotalPost(`${arrayLength}`);
      setTotalPrice(`${totalArrayPrice}`);
    } catch (error) {
      console.log(error.response);
    }
  }

  const reloadItems = () => {
    setLoadingProducts(true);
    getMercadoLibreProducts();
  };
  let items = [];
  if (searchTerm !== "") {
    if (filteredItems.length !== 0) {
      items = filteredItems.map((product) => (
        <ProductCard
          product={product}
          key={product.id}
          reloadItems={reloadItems}
        />
      ));
    }
    if (filteredItems.length === 0) {
      items = (
        <div className="h-screen flex text-black items-center bg-white rounded-md">
          <div className="flex flex-col space-y-3">
            <span className="font-bold px-2 md:text-xl  text-3xl justify-center text-center">Ningún item fué encontrado</span>
            <span className="font-bold px-2 md:text-sm text-2xl justify-center text-center text-gray-500">Busque otro item</span>
            <Image
              className="object-contain rounded-xl"
              loading="lazy"
              isZoomed
              alt="Producto"
              src={error404img}
            />
          </div>
        </div>
      );
    }
    // console.log(searchTerm);
    // console.log(filteredItems);
    console.log(items.length);
  }
  if (searchTerm === "") {
    items = products.map((product, key) => (
      <ProductCard product={product} key={key} reloadItems={reloadItems} />
    ));
  }

  const loadingItems = [1, 2, 3, 4, 5, 6, 7, 8].map((key) => (
    <LoadingCard key={key} />
  ));

  return (
    <>
      {loadingProducts && <LoadingPage />}
      <div
        // className="md:px-12 px-4 h-full"
        className={
          items.length < 5
            ? "md:px-12 px-4"
            : "md:px-12 px-4"
        }
      >
        <section className="py-9">
          <h1 className="text-2xl font-bold mb-7 md:text-left text-center">
            Resumen de Inventario
          </h1>
          <div className="flex space-y-5 md:space-x-5 md:space-y-0 md:flex-row flex-col  md:px-0 items-center">
            <Summary name="Productos" value={totalPost} />
            <Summary name="Valor" value={totalPrice} />
            <AddProductButton />
            <div className="grow flex justify-center items-center">
              <Input
                type="text"
                label="Búsqueda"
                placeholder="Escribe para buscar..."
                startContent={<CiSearch />}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </section>
        {/* <section className="mb-10 flex md:flex-row-reverse mx-auto md:mx-0">
        </section> */}
        <div className="hidden md:block">
          <section
            className="flex flex-wrap gap-7 pb-10"
            style={{ display: "flex", flexWrap: "wrap" }}
          >
            <Masonry columnsCount={4} gutter="15px">
              {loadingProducts ? loadingItems : items}
            </Masonry>
          </section>
        </div>
        <div className="block md:hidden">
          <section className="flex flex-wrap gap-7 pb-10">
            {loadingProducts ? loadingItems : items}
          </section>
        </div>
        <section className="flex justify-center pb-5">
          {/* <Pagination
            total={10}
            initialPage={1}
            onChange={(page) => {
              // console.log(page)
            }}
            color="secondary"
          /> */}
        </section>
      </div>
    </>
  );
}
