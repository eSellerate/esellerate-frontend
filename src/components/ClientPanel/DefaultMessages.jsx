import React, { useState, useContext } from "react";
import { Textarea, Button } from "@nextui-org/react";
import { CiPaperplane } from "react-icons/ci";

export default function DefaultMessages(props) {
  const [message, setMessage] = useState("");

  function updateMessage() {
    alert(message);
  }

  return (
    <div className="flex flex-col col-span-9 space-y-2">
      <div className="flex">
        <Textarea
          isDisabled
          label="Mensaje Predeterminado"
          labelPlacement="outside"
          placeholder={message}
          defaultValue={message}
          className=""
        />
      </div>
      <div className="flex flex-row space-x-2">
        <Textarea
          placeholder="Enviar mensaje al comprador"
          disableAutosize
          className="gap-3 h-auto flex-grow"
          value={message}
          onValueChange={setMessage}
        />
        <div className="h-full flex ">
          <Button color="primary" onClick={updateMessage} isIconOnly className="my-auto">
            <CiPaperplane className="text-xl " />
          </Button>
        </div>
      </div>
    </div>
  );
}
