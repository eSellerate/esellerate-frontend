import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import DragNDrop from "../components/Utilities/DragNDrop/DragNDrop";
import {
  Input,
  Select,
  SelectItem,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  Switch,
  DropdownItem,
} from "@nextui-org/react";
import { NavLink, useNavigate } from "react-router-dom";
import extractCookie from "../components/Utilities/Cookies/GetCookieByName";
// Hooks
import useValidateSession from "../hooks/useValidateSession";

export default function registerProduct() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [mandatoryInputs, setMandatoryInputs] = useState([]);
  const [images, setImages] = useState([]);
  const validateSession = useValidateSession();

  const [custom, setCustom] = useState(true);
  const [selectedCustom, setSelectedCustom] = useState("Personalizado 1");
  const endpoint = import.meta.env.VITE_BACKEND_END_POINT;
  const session = extractCookie("session");
  const handleDropdownSelect = (item) => {
    setSelectedCustom(item);
  };

  useEffect(() => {
    validateSession();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      title !== "" ? getRecomendedCategories() : false;
    }, 500);
    return () => clearTimeout(timer);
  }, [title]);

  useEffect(() => {
    selectedCategory !== "" ? getMandatoryAttributes() : false;
  }, [selectedCategory]);

  useEffect(() => {
    renderMandatoryInputs();
  }, [mandatoryInputs]);

  const getRecomendedCategories = async () => {
    setCategories([]);
    setMandatoryInputs([]);
    const response = await axios.get(
      `${endpoint}mercado-libre/predict-category?limit=3&q=${title}`
    );
    if (response.status === 200) {
      setCategories(response.data);
    }
  };

  const getMandatoryAttributes = async () => {
    try {
      const response = await axios.get(
        `https://api.mercadolibre.com/categories/${selectedCategory}/technical_specs/input`
      );
      const mandatory = response.data.groups[0].components.filter((element) =>
        element.attributes[0].tags.includes("required")
      );
      setMandatoryInputs(mandatory);
    } catch (error) {
      console.log(error);
    }
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const pictures = images.map((image) => ({ source: image }));
    if (pictures.length === 0) {
      alert("No se encotraron imagenes");
      return;
    }
    // initial data (default)
    let data = {
      currency_id: "MXN",
      buying_mode: "buy_it_now",
      condition: "new",
      listing_type_id: "gold_special",
      sale_terms: [
        {
          id: "WARRANTY_TYPE",
          value_name: "Garantía del vendedor",
        },
        {
          id: "WARRANTY_TIME",
          value_name: "90 días",
        },
      ],
      pictures,
      attributes: [],
    };
    for (let [key, value] of formData.entries()) {
      if (key === "file") continue;
      if (
        key === "title" ||
        key === "price" ||
        key === "category_id" ||
        key === "available_quantity"
      ) {
        data[key] = value;
        continue;
      }
      if (key === "DATA_STORAGE_CAPACITY") {
        data.attributes.push({ id: key, value_name: `${value}GB` });
        continue;
      }
      data.attributes.push({ id: key, value_name: value });
    }
    try {
      console.log(data);
      const response = await axios.post(
        `${endpoint}mercado-libre/publish`,
        data,
        {
          headers: {
            Authorization: `Bearer ${session}`,
            "Content-Type": "application/json",
          },
        }
      );
      Swal.fire({
        title: "Publicado",
        text: `Producto ${data.title} publicado.`,
        icon: "success",
      });
      window.location.reload();
    } catch (error) {
      console.log(error);
      let data = {
        currency_id: "MXN",
        buying_mode: "buy_it_now",
        condition: "new",
        listing_type_id: "gold_special",
        sale_terms: [
          {
            id: "WARRANTY_TYPE",
            value_name: "Garantía del vendedor",
          },
          {
            id: "WARRANTY_TIME",
            value_name: "90 días",
          },
        ],
        pictures,
        attributes: [],
      };
      for (let [key, value] of formData.entries()) {
        if (key === "file") continue;
        if (
          key === "title" ||
          key === "price" ||
          key === "category_id" ||
          key === "available_quantity"
        ) {
          data[key] = value;
          continue;
        }
        if (key === "DATA_STORAGE_CAPACITY") {
          data.attributes.push({ id: key, value_name: `${value}GB` });
          continue;
        }
        data.attributes.push({ id: key, value_name: value });
      }
      try {
        const response = await axios.post(
          `${endpoint}mercado-libre/publish`,
          data,
          {
            headers: {
              Authorization: `Bearer ${session}`,
              "Content-Type": "application/json",
            },
          }
        );
        Swal.fire({
          title: "Publicado",
          text: `Producto ${data.title} publicado.`,
          icon: "success",
        });
      } catch (error) {
        const errorText = error.response.data.message;
        const multipleErrors = error.response.data.cause;
        console.log(error);
        console.log(errorText);
        console.log(multipleErrors);
        const errorMessage = `${errorText}<br>${multipleErrors
          .map((error) => error.message)
          .join("<br>")}`;
        Swal.fire({
          title: "Error creando publicación",
          html: errorMessage,
          icon: "error",
        });
      }
    }
  };

  const getImagesFromDragNDrop = (images) => {
    setImages(images);
  };

  const renderMandatoryInputs = () => {
    const combo = mandatoryInputs.filter(
      (input) => input.component === "COMBO"
    );
    const text = mandatoryInputs.filter(
      (input) => input.component === "TEXT_INPUT"
    );
    const unit = mandatoryInputs.filter(
      (input) => input.component === "NUMBER_UNIT_INPUT"
    );
    const colorInput = mandatoryInputs.filter(
      (input) => input.component === "COLOR_INPUT"
    )[0];
    return (
      <>
        {text &&
          text.map((input) => (
            <Input
              key={input.label}
              isRequired
              type="text"
              name={input.attributes[0].id}
              label={input.label}
              labelPlacement="outside"
              placeholder={input.ui_config.hint ?? input.label}
              radius="none"
            />
          ))}
        {colorInput && (
          <Select
            isRequired
            label="Color"
            labelPlacement="outside"
            name="color"
            placeholder="Selecciona el color del producto"
            radius="none"
          >
            {colorInput.attributes[0].values.map((input) => (
              <SelectItem key={input.name} value={input.name}>
                {input.name}
              </SelectItem>
            ))}
          </Select>
        )}
        {combo &&
          combo.map((input) => (
            <Select
              isRequired
              label={input.label}
              name={input.attributes[0].id}
              labelPlacement="outside"
              placeholder={input.ui_config.hint ?? input.label}
              radius="none"
              className="flex flex-row space-y-5"
              key={input.label}
            >
              {input.label === "Marca" && (
                <SelectItem key="Genérica" value="Genérica" className="py-6">
                  Marca genérica
                </SelectItem>
              )}
              {input.attributes[0].values.map((value) => (
                <SelectItem key={value.name} value={value.name}>
                  {value.name}
                </SelectItem>
              ))}
            </Select>
          ))}
        {unit &&
          unit.map((input) => (
            <Input
              key={input.label}
              isRequired
              type="number"
              name={input.attributes[0].id}
              labelPlacement="outside"
              label={input.label}
              radius="none"
              placeholder={input.attributes[0].name}
            />
          ))}
      </>
    );
  };

  return (
    <section className="flex flex-col gap-2 h-full items-center py-4">
      <form
        onSubmit={handleSubmit}
        className="border rounded-lg border-secondary secondary p-4 flex flex-col space-y-4"
      >
        <h2 className="pb-8 text-xl font-bold flex justify-center">
          Publicación nueva
        </h2>
        <Input
          isRequired
          type="text"
          label="Titulo"
          name="title"
          placeholder="incluye producto, marca, modelo y destaca sus características principales"
          labelPlacement="outside"
          radius="none"
          onChange={(e) => setTitle(e.target.value)}
        />
        <Input
          type="text"
          label="Descripción"
          name="description"
          placeholder="Escribe una descripción del producto"
          labelPlacement="outside"
          radius="none"
          className="pt-5"
        />
        {categories.length > 0 && (
          <Select
            isRequired
            label="Categoria"
            name="category_id"
            labelPlacement="outside"
            placeholder="Selecciona la categoria"
            radius="none"
            className="pt-6"
          >
            {categories.map((category) => (
              <SelectItem
                key={category.category_id}
                value={category.category_id}
                onClick={() => setSelectedCategory(category.category_id)}
              >
                {category.category_name}
              </SelectItem>
            ))}
          </Select>
        )}
        {mandatoryInputs.length > 0 && renderMandatoryInputs()}
        <div className="flex flex-col md:flex-row gap-4 md:gap-6">
          <Input
            type="text"
            label="SKU"
            name="sku"
            placeholder="Ingresa el SKU del producto"
            labelPlacement="outside"
            radius="none"
          />
          <Input
            isRequired
            type="number"
            name="price"
            label="Precio"
            placeholder="Ingresa el precio del producto"
            labelPlacement="outside"
            radius="none"
            min={0} 
          />
          <Input
            isRequired
            type="number"
            name="available_quantity"
            label="Cantidad"
            placeholder="Cuantos productos tienes en stock"
            labelPlacement="outside"
            radius="none"
            min={0} 
          />
        </div>
        <div className="flex flex-col space-y-4 w-fit">
          <p className="text-secondary mb-2">Diseño Personalizado</p>
          <Switch
            isSelected={custom}
            onValueChange={() => {
              setCustom(!custom);
            }}
          >
            {custom ? "Diseño personalizado 😎👌" : "Sin personalizar 😒🤢"}
          </Switch>
          {custom ? (
            <Dropdown className="w-fit">
              <DropdownTrigger>
                <Button variant="bordered">{selectedCustom}</Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Static Actions">
                <DropdownItem
                  key="custom1"
                  onClick={() => handleDropdownSelect("Personalizado 1")}
                >
                  Personalizado 1
                </DropdownItem>
                <DropdownItem
                  key="custom2"
                  onClick={() => handleDropdownSelect("Personalizado 2")}
                >
                  Personalizado 2
                </DropdownItem>
                <DropdownItem
                  key="custom3"
                  onClick={() => handleDropdownSelect("Personalizado 3")}
                >
                  Personalizado 3
                </DropdownItem>
                <DropdownItem
                  key="custom4"
                  onClick={() => handleDropdownSelect("Personalizado 4")}
                >
                  Personalizado 4
                </DropdownItem>
                <DropdownItem
                  key="custom5"
                  onClick={() => handleDropdownSelect("Personalizado 5")}
                >
                  Personalizado 5
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          ) : (
            true
          )}
        </div>
        <label htmlFor="Images">Imagenes</label>
        <DragNDrop getImages={getImagesFromDragNDrop} />
        <div className="flex justify-end mt-4">
          <Button
            type="submit"
            className="w-40 rounded-lg"
            color="secondary"
            variant="flat"
            radius="none"
          >
            Publicar
          </Button>
        </div>
      </form>
    </section>
  );
}
