import React, { useState, useEffect } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Input,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Divider,
  Accordion,
  AccordionItem,
  Textarea,
} from "@nextui-org/react";
import { BiPaperPlane } from "react-icons/bi";
import axios from "axios";
import LoadingPage from '../components/Utilities/Loading/LoadingPage'

function Questionstest() {
  const [isLoading, setLoading] = useState(true);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BACKEND_END_POINT}mercado-libre/questions_all`).then(response => {
      const { data } = response.data
      setQuestions(data.questions)
      setLoading(false);
    });
  }, []);

  if (isLoading) {
    return (<LoadingPage />)
  }
  var previousItemID

  return (
    <div className="h-fit md:px-12 px-4 align-middle">
      <section className='py-9'>
        <h1 className='text-2xl font-bold mb-7 md:text-left text-center'>
          Preguntas
        </h1>
      </section>
      {questions.map((question, index) => (
        <div>

          {question.item_id ? (
            <div className="p-2 bg-slate-700 w-1/2 rounded-md flex">
              <span className=""></span>
            </div>
          ) : (
            true
          )}
          <Card className="align-middle w-13/14 mx-auto">
            <CardHeader className="flex gap-3">
              <Image
                alt="nextui logo"
                height={40}
                radius="sm"
                src="https://datepsychology.com/wp-content/uploads/2022/09/gigachad.jpg"
                width={40}
              />
              <div className="flex flex-col">
                <p className="text-md">{question.item_id}</p>
                <p className="text-small text-default-500">$ 0.0</p>
              </div>
            </CardHeader>
            <Divider />
            <CardBody>
              <Accordion>
                <AccordionItem key="1" aria-label="Accordion 1" title={question.text}>
                  <div className="flex flex-row items-center gap-2">
                    <p className="text-small text-default-500">Nombre_Usuario ({question.from.id})</p>
                    <p className="text-small text-default-500"> {question.date_created}</p>
                  </div>
                  <div className="flex flex-row items-center gap-4">
                    <Textarea
                      placeholder="Escribe tu respuesta"
                      className="max-w-lg"
                    />
                    <Button>
                      Responder
                    </Button>
                  </div>
                </AccordionItem>
              </Accordion>
            </CardBody>
          </Card></div>
      ))}
    </div>
  );
}

export default Questionstest;
