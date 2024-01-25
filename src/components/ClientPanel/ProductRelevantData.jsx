import React from 'react'

import { Image } from "@nextui-org/image"
import { Divider } from "@nextui-org/divider"

import PropTypes from 'prop-types'
import { Button } from '@nextui-org/react'
import { saveAs } from "file-saver";
import Swal from 'sweetalert2'
import axios from 'axios'

export default function ProductRelevantData(props) {

    async function downloadSVG() {
        const response = await axios.get(
            `${import.meta.env.VITE_BACKEND_END_POINT}png_test?id=${props.selectedOrder.order_id}`,
            {
              responseType: "text/plain",
            }
          )
          .then((response) => {
            const { data } = response;
            const blob = new Blob([data], { type: "text/plain"});
            saveAs(blob, `${props.selectedOrder.order_id}.svg`);
          })
          .catch((error) => {
            Swal.fire({
              title: `Error descargando svg`,
              text: `Error encontrado: ${error}`,
              icon: "error",
            });
          });
    }

    ProductRelevantData.propTypes = {
        selectedOrder: PropTypes.object
    }

    if (Object.values(props.selectedOrder).length === 0) {
        return (
            <p>Selecciona una orden para ver los detalles</p>
        )
    }
    return (
        <div className='bg-gray-800 px-8 py-4 rounded-lg'>
            <div className='flex gap-8 items-center mb-4'>
                <Image
                    isBlurred
                    className='object-contain'
                    alt='image'
                    src={`data:image/png;base64,${props.selectedOrder.image}`}
                    width={100}
                />
                <span>
                    <h3 className='text-lg font-bold'>
                        ID: {props.selectedOrder.order_id}
                    </h3>
                </span>
            </div>
            <Divider />
            <div className='mt-4'>
                <h3 className='text-2xl font-bold mb-2'>
                    Información relevante
                </h3>
                <ul className='list-disc py-2 px-8'>
                    <li>
                        <span className='font-bold'>
                            Nombre:
                        </span>
                        <span>
                            <br />
                            {props.selectedOrder.information.Nombre}
                        </span>
                    </li>
                    <li>
                        <span className='font-bold'>
                            Fondo:
                        </span>
                        <span>
                            <br />
                            {props.selectedOrder.information.Fondo}
                        </span>
                    </li>
                    <li>
                        <span className='font-bold'>
                            Forma:
                        </span>
                        <span>
                            <br />
                            {props.selectedOrder.information.Forma}
                        </span>
                    </li>
                    <li>
                        <Button color="primary" className="w-fit float-right" onPress={downloadSVG}>
                            Descargar SVG
                        </Button>
                    </li>
                </ul>
            </div>
        </div>
    )
}
