"use client";

import { ChangeEvent, useState } from "react";
import Loading from "../Loading/Loading";
import StatusWindow from "../StatusWindow/StatusWindow";
import SelectQuestions from "../SelectQuestions/SelectQuestions";
import { createGame } from "@/api/game";
import { useRouter } from "next/navigation";

const CreateGame = () => {
  const route = useRouter();
  const [questions, setQuestions] = useState<
    { id: string; question: string; category: string; answer: string }[]
  >([]);
  const [showSelectQuestion, setShowSelectQuestions] = useState(false);
  const [messageError, setMessageError] = useState({
    show: false,
    message: "",
  });
  const [messageSuccess, setMessageSuccess] = useState({
    show: false,
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [nameGame, setNameGame] = useState("");
  const handleCreateGame = async () => {
    if (questions.length > 0) {
      const token = localStorage.getItem("token") as string;
      let idsQuestions: number[] = [];
      questions.forEach((question) => idsQuestions.push(+question.id));
      const { status, data } = await createGame(token, idsQuestions, nameGame);
      if (status === 201) {
        setMessageSuccess({ show: true, message: data.message });
        setTimeout(() => {
          setMessageSuccess({ show: false, message: "" });
        }, 3000);
        setTimeout(() => route.push(`/init_game?id_game=${data.id}`), 3000);
      } else {
        setMessageError({ show: true, message: "Erro ao criar jogo!" });
        setTimeout(() => {
          setMessageError({ show: false, message: "" });
        }, 3000);
      }
    } else {
      setMessageError({
        show: true,
        message: "Selecione alguma questão",
      });
      setTimeout(() => setMessageError({ show: false, message: "" }), 3000);
    }
  };
  return (
    <>
      {loading ? (
        <Loading></Loading>
      ) : (
        <>
          {showSelectQuestion ? (
            <SelectQuestions
              loadQuestions={questions}
              sendIdQuestions={(e) => {
                setQuestions(e);
                console.log(e);
              }}
              sendClose={() => {
                setShowSelectQuestions(false);
              }}
            ></SelectQuestions>
          ) : null}
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
          <main className="flex justify-center items-center h-screen w-screen">
            <div className="text-lg font-bold bg-[#1A1B1F] py-8 px-4 flex flex-col justify-center items-center gap-2">
              <h1 className="py-4">Criar o jogo</h1>
              <label className="flex border-[1px] px-4 py-2 rounded-lg lg:w-96 w-80">
                <input
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setNameGame(e.target.value)
                  }
                  placeholder="Nome do jogo"
                  className="text-sm bg-transparent w-[100%] outline-none"
                ></input>
              </label>
              <div className="w-full">
                <button
                  onClick={() => setShowSelectQuestions(true)}
                  className="text-sm bg-blue-700 px-2 py-1 rounded-lg hover:scale-105 transition-all ease-linear duration-200 hover:opacity-90"
                >
                  Selecionar Questões
                </button>
              </div>
              <p className="w-full text-sm font-light">
                Qtd. Questões Selecionadas: {questions.length}
              </p>

              {questions.length > 0 && nameGame.length > 3 ? (
                <button
                  onClick={() => {
                    handleCreateGame();
                  }}
                  className="mt-8 text-sm bg-blue-700 px-2 py-1 rounded-lg hover:scale-105 transition-all ease-linear duration-200 hover:opacity-90"
                >
                  Criar Jogo
                </button>
              ) : (
                <button
                  onClick={() => {
                    let message = "Selecione alguma questão!";
                    if (nameGame.length <= 3)
                      message = "O nome deve conter mais de 3 caracteres!";
                    setMessageError({
                      show: true,
                      message: message,
                    });
                    setTimeout(
                      () => setMessageError({ show: false, message: "" }),
                      3000
                    );
                  }}
                  className="cursor-not-allowed mt-11 text-sm bg-slate-200 px-2 py-1 rounded-lg hover:scale-105 transition-all ease-linear duration-200 hover:opacity-90"
                >
                  Criar Jogo
                </button>
              )}
            </div>
          </main>
        </>
      )}
    </>
  );
};

export default CreateGame;
