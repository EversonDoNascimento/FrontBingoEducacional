"use client";
import Image from "next/image";
import CardGame from "./../../../public/icons/bg-cardGame.png";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import GameSchema from "./../../zod/GameSchema";
import Loading from "../Loading/Loading";
import { getGameById } from "../../api/game";
import StatusWindow from "../StatusWindow/StatusWindow";
const InitGame = () => {
  const router = useRouter();
  const params = useSearchParams();
  const id_game = params.get("id_game");
  const [game, setGame] = useState<GameSchema>();
  const [loading, setLoading] = useState(false);
  const [messageError, setMessageError] = useState({
    show: false,
    message: "",
  });
  const [messageSuccess, setMessageSuccess] = useState({
    show: false,
    message: "",
  });
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
          <main className="flex flex-col h-full items-center lg:p-8 px-2  space-y-4  my-20">
            <h1 className="text-2xl">Jogo</h1>

            <div className="bg-[#1A1B1F] w-[300px] h-[300px] md:w-[400px] md:h-[370px] border rounded-lg border-transparent">
              <Image
                src={CardGame}
                alt="Ícone de jogo"
                className="rounded-lg h-50 w-full"
              ></Image>
              <div className="flex flex-col pl-3 pt-3 text-sm">
                <label>
                  Titulo: <span>{game?.name}</span>
                </label>
                <label>
                  Qtd. Perguntas: <span>{game?.questions.length}</span>
                </label>
                <label>
                  Qtd. Respostas: <span>{game?.questions.length}</span>
                </label>
              </div>
            </div>

            <div
              onClick={() => {
                router.push(`/roulette?id_game=${id_game}`);
              }}
              className="flex flex-col"
            >
              <button className="mt-5 text-nowrap text-sm text-center rounded-lg px-[100px] md:px-[150px] py-3 bg-[#36A873] hover:scale-105 transition-all ease-linear duration-200 ">
                INICIAR JOGO
              </button>

              <button
                onClick={() => {
                  router.back();
                }}
                className="mt-5 text-nowrap text-sm  text-center rounded-lg px-[100px] md:px-[150px] py-3 bg-[#D41C2E] hover:scale-105 transition-all ease-linear duration-200"
              >
                VOLTAR
              </button>
            </div>
          </main>
        </>
      )}
    </>
  );
};

export default InitGame;
