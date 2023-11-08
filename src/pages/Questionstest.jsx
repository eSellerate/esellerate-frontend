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
import extractCookie from "../components/Utilities/Cookies/GetCookieByName";
import LoadingPage from "../components/Utilities/Loading/LoadingPage";

function Questionstest() {
  const [isLoading, setLoading] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [responseTexts, setResponseTexts] = useState({});

  useEffect(() => {
    const session = extractCookie("session");
    axios
      .get(
        `${import.meta.env.VITE_BACKEND_END_POINT}mercado-libre/questions_all`, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${session}`,
          },
        }
      )
      .then((response) => {
        const { data } = response.data;
        setQuestions(data.questions);
        setLoading(false);
      });
  }, []);

  // Function to format the date
  const formatDateTime = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };

    const date = new Date(dateString);
    const formatter = new Intl.DateTimeFormat("es", options);
    return formatter.format(date);
  };

  const handleResponderClick = (questionId, inputValue) => {
    console.log("Question ID:", questionId);
    console.log("Input Value:", inputValue);
    const requestData = {
      question_id: questionId,
      text: inputValue,
    };
    axios.post(
      `${import.meta.env.VITE_BACKEND_END_POINT}mercado-libre/question_answer`,
      requestData
    );
  };

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <div className="md:px-12 px-4 pb-1 align-middle">
      <section className="py-9">
        <h1 className="text-2xl font-bold mb-2 md:text-left text-center">
          Preguntas
        </h1>
      </section>
      {Object.values(
        questions.reduce((acc, question, index) => {
          if (question.item_id) {
            if (!acc[question.item_id]) {
              acc[question.item_id] = [question];
            } else {
              acc[question.item_id].push(question);
            }
          }
          return acc;
        }, {})
      ).map((groupedQuestions, item_id) => (
        <div key={item_id} className="mb-10">
          <Card className="align-middle w-13/14 mx-auto">
            <CardHeader className="flex space-x-6">
              <Image
                alt="nextui logo"
                className="w-14 h-12 rounded-full"
                src="https://datepsychology.com/wp-content/uploads/2022/09/gigachad.jpg"
              />
              <div className="flex flex-col">
                <p className="text-md">{groupedQuestions[0].item_id}</p>
                <p className="text-small text-default-500">$ 0.0</p>
              </div>
            </CardHeader>
            <Divider />
            <CardBody>
              <Accordion>
                {groupedQuestions.map((question, index) => (
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
                ))}
              </Accordion>
            </CardBody>
          </Card>
        </div>
      ))}
    </div>
  );
}

export default Questionstest;
