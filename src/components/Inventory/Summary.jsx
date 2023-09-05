import React from 'react'
import { Card } from '@nextui-org/react'
import { BiBasket, BiMoney } from 'react-icons/bi'
import PropTypes from 'prop-types'

const Summary = (props) => {
  Summary.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired
  }

  const flag = props.name === 'Productos'

  const price = () => {
    const price = new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN'
    }).format(props.value)
    return `${price} MXN`
  }

  return (
    <Card className="p-4 hover:cursor-default">
      <div className='flex items-center gap-4'>
      {
        flag ? <BiBasket size={50} /> : <BiMoney size={50} />
      }
      <div>
        <p className="text-tiny uppercase font-bold">{ props.name }</p>
        <small className="text-default-500 hover:duration-300 hover:text-primary">
          {
            flag ? `${props.value} productos` : price()
          }
        </small>
      </div>
      </div>
    </Card>
  )
}

export default Summary
