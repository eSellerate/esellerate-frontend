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
  Skeleton,
} from "@nextui-org/react";
import { BiPaperPlane } from "react-icons/bi";
import axios from "axios";
import extractCookie from "../components/Utilities/Cookies/GetCookieByName";
import LoadingPage from "../components/Utilities/Loading/LoadingPage";
import Swal from "sweetalert2";
function Questionstest() {
  const [isLoading, setLoading] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [responseTexts, setResponseTexts] = useState({});

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = () => {
    const session = extractCookie("session");
    axios
      .get(
        `${import.meta.env.VITE_BACKEND_END_POINT}mercado-libre/questions_all`,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${session}`,
          },
        }
      )
      .then(async (response) => {
        const { data } = response.data;
        let sortedQuestions = data.questions.slice().sort((a, b) => b.id - a.id)

        // Agregar imagen tremenda basura de metodo pero por el cagadero del componente no se me ocurrio más
        let items = sortedQuestions.map(question => (question.item_id))
        items = [...new Set(items)];
        const maping = await getImageMapping(items)
        sortedQuestions.forEach(question => {
          const item = question.item_id
          question.image = maping[item].picture
          question.price = maping[item].price
          question.title = maping[item].title
        })
        setQuestions(sortedQuestions)
      })
      .catch((error) => {
        console.error("Error fetching questions:", error);
        Swal.fire({
          title: `Error con las preguntas`,
          text: `Error encontrado: ${error}`,
          icon: "error",
        });
      })
      .finally(() => {
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      });
  };

  const getImageMapping = async (items) => {
    const mapObj = {}
    for (let item of items) {
      const image = await getProductImage(item)
      mapObj[item] = image
    }
    return mapObj
  }

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

  const handleEliminarClick = (questionId) => {
    const session = extractCookie("session");
    const requestData = {
      question_id: questionId,
    };
    try {
      const response = axios.post(
        `${
          import.meta.env.VITE_BACKEND_END_POINT
        }mercado-libre/question_delete`,
        requestData,
        {
          headers: {
            Authorization: `Bearer ${session}`,
            "Content-Type": "application/json",
          },
        }
      );
      response.then((response) => {
        const status = response.status;
        if (status === 200) {
          setLoading(true);
          Swal.fire({
            title: `Pregunta eliminada`,
            icon: "warning",
            timer: 1500,
          });
          setTimeout(() => {
            fetchQuestions();
          }, 3500);
        } else {
          console.log(`Error eliminando pregunta: ${status}`);
          Swal.fire({
            title: `Error eliminando la pregunta ${questionId}`,
            text: `Error encontrado: ${status}`,
            icon: "error",
          });
        }
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: `Error eliminando la pregunta ${questionId}`,
        text: `Error encontrado: ${error}`,
        icon: "error",
      });
    }
  };

  const handleResponderClick = (questionId, inputValue) => {
    const session = extractCookie("session");
    const requestData = {
      question_id: questionId,
      text: inputValue,
    };
    try {
      const response = axios.post(
        `${
          import.meta.env.VITE_BACKEND_END_POINT
        }mercado-libre/question_answer`,
        requestData,
        {
          headers: {
            Authorization: `Bearer ${session}`,
            "Content-Type": "application/json",
          },
        }
      );
      response.then((response) => {
        const status = response.status;
        if (status === 200) {
          Swal.fire({
            title: `Pregunta resuelta`,
            icon: "success",
            timer: 1500,
          });
          setLoading(true);
          setTimeout(() => {
            fetchQuestions();
          }, 2000);
        } else {
          console.log(`Error contestando pregunta: ${status}`);
          Swal.fire({
            title: `Error contestando la pregunta ${questionId}`,
            text: `Error encontrado: ${status}`,
            icon: "error",
          });
        }
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: `Error eliminando la pregunta ${questionId}`,
        text: `Error encontrado: ${error}`,
        icon: "error",
      });
    }
  };

  // if (isLoading) {
  //   return <LoadingPage />;
  // }

  const getProductImage = async (productId) => {
    try {
      const response = await axios.get(`https://api.mercadolibre.com/items/${productId}`)
      const picture = response.data.pictures[0].secure_url
      const price = response.data.price
      const title = response.data.title
      return {picture, price, title}
    } catch(error) {
      console.log(error)
      return null
    }
  }

  return (
    <div className="min-h-screen md:px-12 px-4 pb-1 align-middle md:pt-8 pt-0">
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
              <Skeleton isLoaded={!isLoading} className="rounded-lg">
                <Image
                  alt="nextui logo"
                  className="w-14 h-12 rounded-full"
                  src={groupedQuestions[0].image}
                />
              </Skeleton>
              <div className="flex flex-col">
                <Skeleton isLoaded={!isLoading} className="rounded-lg">
                  <p className="text-md">{groupedQuestions[0].title} ({groupedQuestions[0].item_id})</p>
                  <p className="text-small text-default-500">$ {groupedQuestions[0].price} MXN</p>
                </Skeleton>
              </div>
            </CardHeader>
            <Divider />
            <Skeleton isLoaded={!isLoading} className="rounded-lg">
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
                            className="text-2xl"
                            isReadOnly={question.answer !== null ? true : false}
                            placeholder="Escribe tu respuesta"
                            value={
                              question.answer === null
                                ? responseTexts[question.id]
                                : question.answer.text
                            }
                            onChange={(e) => {
                              setResponseTexts({
                                ...responseTexts,
                                [question.id]: e.target.value,
                              });
                            }}
                          />
                        </div>
                      </div>
                      {question.answer === null ? (
                        <div
                          className={`flex flex-col w-fit ${
                            question.answer === null ? "md:justify-between" : ""
                          } space-y-3 justify-end p-1`}
                        >
                          <Button
                            color="danger"
                            variant="ghost"
                            onClick={() => handleEliminarClick(question.id)}
                          >
                            Eliminar
                          </Button>
                          <Button
                            color="secondary"
                            variant="shadow"
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
                      ) : (
                        false
                      )}
                    </div>
                  </AccordionItem>
                ))}
              </Accordion>
            </Skeleton>
          </Card>
        </div>
      ))}
      {isLoading ? <LoadingPage /> : true}
    </div>
  );
}

export default Questionstest;
