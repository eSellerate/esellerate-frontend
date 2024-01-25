import React from 'react'
import PropTypes from 'prop-types'

export default function ChatPanel(props) {

    ChatPanel.propTypes = {
        messages: PropTypes.array
    }

    var messages = props.messages

    const MessageBlubble = (props) => {

        let chatBorder = 'rounded-br-none'

        MessageBlubble.propTypes = {
            position: PropTypes.string,
            color: PropTypes.string,
            msj: PropTypes.string,
        }

        if (props.position !== 'justify-end') {
            chatBorder = 'rounded-bl-none'
        }


        const style = {
            textWrap: 'wrap',
        }

        return (
            <div className={`w-full flex ${props.position} my-2`}>
                <span className={`rounded-lg ${chatBorder} w-[90%] items-center bg-${props.color}`}>
                    <p className='text-sm p-0 px-2 py-2' style={style}>
                        {props.msj}
                    </p>
                </span>
            </div>
        )
    }

    function LoadMessages() {
        if (messages.length > 0) {

            return (
                <>
                    {[...messages].reverse().map((message, index) => (
                        message.from.user_id == message.message_resources.find(function (o) {
                            return o.name === "sellers"
                        }).id ? (
                            <MessageBlubble 
                                key={index} 
                                color='default' 
                                position='justify-end' 
                                msj={message.text} 
                            />
                        ) : <MessageBlubble 
                                key={index} 
                                color='primary' 
                                position='justify-start' 
                                msj={message.text} 
                            />
                        )
                    )}
                </>
            )
        }
    }

    return (
        <section className='h-full container flex flex-col-reverse w-[90%] m-auto overflow-y-scroll'>
            <div className='inline-block w-full'>
                <LoadMessages />
            </div>
        </section>
    )
}
