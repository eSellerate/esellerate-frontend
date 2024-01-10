import React from 'react'
import PropTypes from 'prop-types'

import { Chip } from "@nextui-org/chip"

export default function ChatPanel() {

    const MessageBlubble = (props) => {

        MessageBlubble.propTypes = {
            position: PropTypes.string,
            color: PropTypes.string,
            msj: PropTypes.string
        }

        return(
            <div className='w-full relative'>
                <Chip
                    className={`client-mesage font-bold absolute ${props.position}`}
                    color={props.color}
                >
                    {props.msj}
                </Chip> 
            </div>
        )
    }

    return(
        <section className='h-full container'>
            <div className='flex flex-col gap-8'>
                {/* Ejemplo de uso */}
                <MessageBlubble color='primary' position='left-0' msj='hola mundo'/>
                <MessageBlubble color='primary' position='left-0' msj='amigos de yt' />
                <MessageBlubble color='default' position='right-0' msj='no me vuelva a escribir en su vida'/>
            </div>
        </section>
    )
}
