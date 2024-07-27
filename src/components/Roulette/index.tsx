"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import GameSchema from "./../../zod/GameSchema";
import Loading from "../Loading/Loading";
import { getGameById } from "../../api/game";
import StatusWindow from "../StatusWindow/StatusWindow";
import { Wheel } from "react-custom-roulette";
import Image from "next/image";
import IconQuestion from "./../../../public/icons/icon-question.png";
const Roulette = () => {
  //roulette start
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [selectedItem, setSelectedItem] = useState("");
  const [availableData, setAvailableData] = useState<
    {
      option: string;
      style: { backgroundColor: string; textColor: string };
    }[]
  >([]);

  const handleSpinClick = () => {
    if (!mustSpin && availableData.length > 0) {
      const newPrizeNumber = Math.floor(Math.random() * availableData.length);
      setPrizeNumber(newPrizeNumber);
      setMustSpin(true);
    }
  };

  const removeSelectedItem = () => {
    const newData = availableData.filter(
      (item, index) => index !== prizeNumber
    );
    setAvailableData(newData);
  };
  //roulette end
  const router = useRouter();
  const params = useSearchParams();
  const id_game = params.get("id_game");
  const [loading, setLoading] = useState(false);
  const [game, setGame] = useState<GameSchema>();
  const [showAnswer, setShowAnswer] = useState(false);
  const [messageError, setMessageError] = useState({
    show: false,
    message: "",
  });
  const [messageSuccess, setMessageSuccess] = useState({
    show: false,
    message: "",
  });
  const [questionAndAnswer, setQuestionAndAnswer] = useState<
    { id: string; question: string; answer: string }[]
  >([]);
  const handleGame = async () => {
    setLoading(true);
    const token = localStorage.getItem("token") as string;
    if (id_game) {
      const { data, status } = await getGameById(token, +id_game);
      if (status === 200) {
        setGame(data);
      } else {
        setMessageError({ show: true, message: "Erro ao buscar questão" });
        setTimeout(() => {
          setMessageError({ show: false, message: "" });
        }, 3000);
        setTimeout(() => {
          router.push("/home");
        }, 3000);
      }
    }

    setLoading(false);
  };

  useEffect(() => {
    if (id_game) {
      handleGame();
    } else {
      setMessageError({ show: true, message: "Erro ao buscar questão" });
      setTimeout(() => {
        setMessageError({ show: false, message: "" });
      }, 3000);
      setTimeout(() => {
        router.push("/home");
      }, 3000);
    }
  }, []);
  useEffect(() => {
    const temp: {
      option: string;
      style: { backgroundColor: string; textColor: string };
    }[] = [];
    const colors = [
      "orange",
      "pink",
      "red",
      "yellow",
      "blue",
      "black",
      "silver",
      "green",
      "gray",
    ];
    game?.questions.forEach((item, index) => {
      setQuestionAndAnswer((prev) => [
        ...prev,
        {
          id: `Questão ${index + 1}`,
          answer: item.answer,
          question: item.question,
        },
      ]);
      temp.push({
        option: `Questão ${index + 1}`,
        style: {
          backgroundColor: colors[Math.floor(Math.random() * 8)],
          textColor: "white",
        },
      });
    });
    setAvailableData(temp);
  }, [game]);

  const renderQuestion = (id: string) => {
    const find = questionAndAnswer.find((item) => item.id === id);
    if (find) return find.question;
    return "Sem perguntas";
  };
  const renderAnswer = (id: string) => {
    const find = questionAndAnswer.find((item) => item.id === id);
    if (find) return find.answer;
    return "Sem resposta";
  };
  return (
    <>
      {loading ? (
        <Loading></Loading>
      ) : (
        <>
          {messageSuccess.show ? (
            <StatusWindow
              text={messageSuccess.message}
              error={false}
            ></StatusWindow>
          ) : null}
          {messageError.show ? (
            <StatusWindow
              text={messageError.message}
              error={true}
            ></StatusWindow>
          ) : null}
          <main className="flex flex-col justify-center items-center w-full h-full mb-20">
            {availableData.length > 0 ? (
              <>
                <div className="flex flex-col justify-start w-[80%] h-40  mt-32 ">
                  <div className="bg-[#F2CE4E] text-black text-sm  w-56 h-9 flex justify-center items-center gap-2 rounded-t-md">
                    {showAnswer ? null : (
                      <Image
                        src={IconQuestion}
                        alt="Ícone da questão"
                        width={25}
                        height={25}
                      ></Image>
                    )}

                    <span className="font-bold">
                      {showAnswer ? "Resposta:" : "Pergunta Selecionada:"}
                    </span>
                  </div>
                  {showAnswer ? (
                    <div className="w-full py-4 text-sm bg-green-600 rounded-b-md showAnswer text-wrap max-h-20 overflow-y-auto">
                      {renderAnswer(selectedItem)}
                    </div>
                  ) : (
                    <div className="w-full py-4 bg-[#1A1B1F] rounded-b-md">
                      {selectedItem !== "" ? (
                        <div className="transition-all ease-linear duration-200 relative opacity-0 hover:opacity-100">
                          <button
                            onClick={() => {
                              setTimeout(() => setShowAnswer(true), 100);
                              setTimeout(() => setShowAnswer(false), 5000);
                            }}
                            className="absolute text-sm rounded-md right-4 top-0 p-1 bg-blue-700"
                          >
                            Ver resposta
                          </button>
                        </div>
                      ) : null}

                      <p className="text-wrap max-h-20 overflow-y-auto px-4 text-sm">
                        {selectedItem === ""
                          ? "Gire a roleta!"
                          : renderQuestion(selectedItem)}
                      </p>
                    </div>
                  )}
                </div>
                <div
                  style={{
                    padding: "20px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  {/* {selectedItem !== "" ? (
                    <h2>Questão selecionada: {selectedItem}</h2>
                  ) : null} */}
                  <Wheel
                    mustStartSpinning={mustSpin}
                    prizeNumber={prizeNumber}
                    data={availableData}
                    outerBorderColor={"#222"}
                    outerBorderWidth={10}
                    innerBorderColor={"#111111"}
                    innerBorderWidth={0}
                    radiusLineColor={"#222"}
                    radiusLineWidth={2}
                    perpendicularText={false}
                    textDistance={50}
                    fontSize={15}
                    onStopSpinning={() => {
                      setMustSpin(false);
                      setSelectedItem(availableData[prizeNumber].option); // Atualiza o estado com o item selecionado
                      setTimeout(removeSelectedItem, 500); // Delay adicionado para remover o item selecionado após mostrá-lo
                    }}
                  />
                  <button
                    onClick={handleSpinClick}
                    disabled={availableData.length === 0}
                    className="mt-8 text-md bg-blue-700 px-4 py-2 rounded-lg hover:scale-105 transition-all ease-linear duration-200 hover:opacity-90"
                  >
                    Girar!
                  </button>
                </div>
              </>
            ) : null}
          </main>
        </>
      )}
    </>
  );
};

export default Roulette;
