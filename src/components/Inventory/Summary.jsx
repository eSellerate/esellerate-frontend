import React from "react";
import { Card } from "@nextui-org/react";
import { BiBasket, BiMoney, BiPlus } from "react-icons/bi";
import PropTypes from "prop-types";

const Summary = (props) => {
  Summary.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  };

  const flag = props.name === "Productos";

  const price = () => {
    const price = new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: "MXN",
    }).format(props.value);
    return `${price} MXN`;
  };

  return (
    <Card className="p-4 hover:cursor-default md:mx-0 mx-auto">
      <div className="flex items-center gap-4">
        {props.name === "Productos" ? (
          <BiBasket size={50} />
        ) : props.name === "Valor" ? (
          <>
            <BiMoney size={50} />
          </>
        ) : (
          <BiPlus size={50} />
        )}
        <div className="flex flex-col">
          <p className="text-tiny uppercase font-bold my-auto">{props.name}</p>
          {
            <small className="text-default-500 hover:duration-300 hover:text-primary">
              {props.name === "Productos"
                ? `${props.value} productos`
                : props.name === "Valor"
                ? price()
                : "Publica un nuevo producto"}
            </small>
          }
        </div>
      </div>
    </Card>
  );
};

export default Summary;
