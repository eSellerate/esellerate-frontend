import React from 'react'

// Components
import Summary from '../components/Inventory/Summary'

const Inventory = () => {
  return (
        <React.Fragment>
            <section className='p-8'>
                <h1 className="text-2xl font-bold">Resumen de Inventario</h1>
                <div className="flex gap-4">
                    <Summary name="Productos" value="150"/>
                    <Summary name="Valor" value="23000"/>
                </div>
            </section>
        </React.Fragment>
  )
}

export default Inventory
