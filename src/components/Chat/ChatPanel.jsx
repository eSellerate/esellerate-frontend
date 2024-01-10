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

        const style = {
            textWrap: 'wrap',
        }

        return(
            <div className={`w-full flex ${props.position} my-2`}>
                <Chip
                    className='client-mesage font-bold w-[90%] px-1 py-[1.4rem] items-center'
                    color={props.color}
                >
                    <p className='text-sm p-0 m-0' style={style}>
                        {props.msj}
                    </p>
                </Chip> 
            </div>
        )
    }

    return(
        <section className='h-full container'>
            <div className='inline-block'>
                {/* Ejemplo de uso */}
                <MessageBlubble color='primary' position='justify-start' msj='hola mundo dsfsdf sdaf sda f dsf sda fsd af asd f sdaf sdafsdfsdaf sdfsadfsda fsdafsda sdf sdfsdf sd fd s'/>
                <MessageBlubble color='primary' position='justify-start' msj='amigos de yt' />
                <MessageBlubble color='default' position='justify-end' msj='no me vuelva a escribir en su vida'/>
            </div>
        </section>
    )
}
