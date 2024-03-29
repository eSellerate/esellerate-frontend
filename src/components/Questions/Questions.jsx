import React, { useState, useEffect } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Input,
  Button,
  Image,
} from "@nextui-org/react";
import { BiPaperPlane, BiImageAdd } from "react-icons/bi";
import axios from "axios";

function Questions() {
  const [selectedChat, setSelectedChat] = useState("No one");
  const [initialQuestions, setQuestions] = useState([]);
  const [message, setMessage] = useState("");
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    getMercadoLibreQuestions()
  }, []);

  async function getMercadoLibreQuestions() {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_END_POINT}mercado-libre/questions_all`
      );
      const { data } = response.data;
      setQuestions(data.questions);
      setSelectedChat(data.questions[0]);
    } catch (error) {
      console.log(error.response);
    }
  }

  const selectChat = (question) => {
    setSelectedChat(question);
  };

  const handleSendMessage = () => {
    if (selectedChat !== "No one") {
      const updatedQuestions = initialQuestions.map((question) => ({
        ...question,
        answer:
          question.from.id === selectedChat.from.id ? message : question.answer,
      }));
      setQuestions(updatedQuestions);
    }
  };

  return (
    <div className="w-full h-screen flex overflow-hidden chat-selector pt-20">
      {/*
      <div className="w-1/5 hidden bg-zinc-900 p-4  flex-col chat-display md:flex">
        {initialQuestions.map((question, index) => (
          <div
            key={`${question.userId}-${index}`}
            onClick={() => selectChat(question)}
            className="w-full border-b h-14 border-t border-slate-400 flex space-x-2 items-center cursor-pointer"
          >
            <img
              className="w-8 h-8 rounded-full"
              name={question.username}
              src="https://datepsychology.com/wp-content/uploads/2022/09/gigachad.jpg"
              alt={`${question.username}'s avatar`}
            />
            <div className="flex flex-col">
              <span className="text-sm">{question.from.id}</span>
              <span className="text-xs line-clamp-2">{question.text}</span>
            </div>
          </div>
        ))}
      </div>
      */}
      <div className="md:w-4/5 w-full flex flex-col">
        <div> </div>
        <div className="bg-stone-800 flex items-center w-full">
          <div className="p-2 overflow-x-auto flex flex-col w-full">
            <div class="border border-zinc-500 bg-transparent p-4 flex space-x-4 items-center w-full rounded-md overflow-auto">
              <div className="flex-shrink-0">
                <Image
                  className="object-contain w-12 h-12 rounded-xl"
                  loading="lazy"
                  isZoomed
                  alt="Producto"
                  src="https://http2.mlstatic.com/D_NQ_NP_948160-MLM71926994916_092023-O.webp"
                />
              </div>
              <div className="flex flex-col space-y-2">
                <span className="flex flex-grow whitespace-nowrap overflow-auto">
                  Item De Prueba - Por Favor, No Ofertar
                </span>
                <span className="whitespace-nowrap">$ 35.00 x 1 unidad</span>
              </div>
            </div>
            <Dropdown>
              <DropdownTrigger>
                <Button variant="bordered">
                  <span className="text-3xl font-bold p-3 text-ellipsis">
                    {selectedChat?.from?.id}
                  </span>
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Static Actions">
                {initialQuestions.map((question, index) => (
                  <DropdownItem
                    key={index}
                    onClick={() => selectChat(question)}
                  >
                    {question?.from?.id}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
        <div className="bg-zinc-600 w-full h-full p-4">
          <div className="flex flex-col text-3xl text-ellipsis w-full space-y-2">
            <div className="flex justify-start">
              <div className="p-2 bg-zinc-500 w-1/2 rounded-md flex">
                <span>{selectedChat.text}</span>
              </div>
            </div>
            <div className="flex justify-end">
              {selectedChat.answer ? (
                <div className="p-2 bg-slate-700 w-1/2 rounded-md flex">
                  <span className="">{selectedChat.answer.text}</span>
                </div>
              ) : (
                true
              )}
            </div>
          </div>
        </div>

        <div className="w-full bg-zinc-800 h-14 flex items-center px-6 space-x-4">
          <BiImageAdd
            size={40}
            className="cursor-pointer"
            onClick={handleSendMessage}
          />
          <Input
            type="text"
            variant="underlined"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            label="Mensaje"
            className=""
          />
          <BiPaperPlane
            size={40}
            className="cursor-pointer"
            onClick={handleSendMessage}
          />
        </div>
      </div>
    </div>
  );
}

export default Questions;
