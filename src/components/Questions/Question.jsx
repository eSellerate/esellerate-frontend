import React from 'react'
import { AccordionItem, Button } from '@nextui-org/react'

export default function Question(props) {
    return(
        <AccordionItem
                key={index}
                aria-label={`Accordion ${index + 1}`}
                title={question.text}
                >
                <div className="flex flex-row space-x-4">
                    <div className="flex flex-col grow p-1">
                    <div className="flex space-x-4">
                        <p className="text-small text-default-500 flex-grow">
                        Usuario: ({question.from.id})
                        </p>
                        <p className="text-small text-default-500 text-ellipsis">
                        {formatDateTime(question.date_created)}
                        </p>
                    </div>
                    <div className="flex items-center">
                        <Textarea
                        placeholder="Escribe tu respuesta"
                        value={responseTexts[question.id] || ""}
                        onChange={(e) => {
                            setResponseTexts({
                            ...responseTexts,
                            [question.id]: e.target.value,
                            });
                        }}
                        className=""
                        />
                    </div>
                    </div>
                    <div className="flex flex-col w-fit justify-end p-1">
                    <Button
                        onClick={() =>
                        handleResponderClick(
                            question.id,
                            responseTexts[question.id] || ""
                        )
                        }
                    >
                        Responder
                    </Button>
                    </div>
                </div>
    </AccordionItem>
    )
}
