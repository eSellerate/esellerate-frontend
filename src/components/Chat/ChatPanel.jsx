import React from 'react'
import PropTypes from 'prop-types'

import { Chip } from "@nextui-org/chip"

export default function ChatPanel(props) {
    var messages = props.messages

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

    function LoadMessages() {
        if (messages.length > 0) {

            return (
                <>
                    {[...messages].reverse().map((message, index) => (
                        message.from.user_id === message.message_resources.find(function(o){ return o.name==="sellers" }).id ? (
                            <MessageBlubble key={index} color='default' position='left-0' msj={message.text} />
                          ) : <MessageBlubble key={index} color='primary' position='right-0' msj={message.text} />)
                    )}
                </>
            )
        }
    }

    return (
        <section className='h-full container'>
            <div className='flex flex-col gap-8'>
                <LoadMessages />
                <MessageBlubble color='default' position='left-0' msj="esto es un mensaje de prueba prueba prueba prueba prueba prueba prueba prueba prueba pruebay prueba tu " />
            </div>
        </section>
    )
}
