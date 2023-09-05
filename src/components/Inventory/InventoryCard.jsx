import React from 'react'
import {
  Card,
  CardHeader,
  CardBody,
  Divider,
  Image
} from '@nextui-org/react'
import logo from '../../assets/logo.svg'

const InventoryCard = () => {
  return (
    <Card className="max-w-[300px] hover:cursor-pointer hover:shadow">
      <CardHeader className="flex gap-3 justify-center">
        <Image
          alt="nextui logo"
          height={200}
          src={logo}
          width={200}
        />
      </CardHeader>
      <Divider/>
      <CardBody>
        <p className='text-secondary'>Nombre del pruducto</p>
        <p>SKU</p>
        <p>Existencias: 500</p>
      </CardBody>
    </Card>
  )
}

export default InventoryCard