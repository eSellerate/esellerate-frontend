// react
import React, { useState, useEffect } from "react";
import { CiMenuKebab } from "react-icons/ci";
export default function SaleDetail() {
  return (
    <main className="h-screen bg-black flex pt-20 px-8 pb-8">
      <div className="w-2/3 flex flex-col">
        <div className="flex flex-col">
          <h1>Item De Prueba - Por Favor, No Ofertar</h1>
          <h1>Venta #2000006884120712 13 nov. 2023 13:58hs.</h1>
        </div>
        <div>
        </div>
      </div>
      <div className="w-1/3  flex-col">
        <div className="flex flex-col">
          <h1>Cobro aprobado</h1>
          <h1>#66946245064 | 13 de noviembre</h1>
        </div>
      </div>
    </main>
  );
}
