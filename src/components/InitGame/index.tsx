"use client";
import Header from "../Header/Header";
import Image from "next/image";
import CardGame from "./../../../public/icons/bg-cardGame.png";

const InitGame = () => {
  return (
    <>
      <Header />
      <main className="flex flex-col items-center lg:p-8 p-0  space-y-4">
        <h1 className="text-4xl">Jogo</h1>

        <div className="bg-[#1A1B1F] w-[400px] h-[370px] border rounded-lg border-transparent">
          <Image
            src={CardGame}
            alt="Ícone de jogo"
            className="rounded-lg h-50 w-full"
          ></Image>
          <div className="flex flex-col pl-3 pt-3 font-medium text-base">
            <label>
              Titulo: <span>{}</span>
            </label>
            <label>
              Qtd. Perguntas: <span>{}</span>
            </label>
            <label>
              Qtd. Respostas: <span>{}</span>
            </label>
          </div>
        </div>

        <div className="flex flex-col">
          <button className="mt-5 text-center rounded-lg px-[150px] py-3 bg-[#36A873] hover:scale-105 transition-all ease-linear duration-200">
            INICIAR JOGO
          </button>

          <button className="mt-5 text-center rounded-lg px-[145px] py-3 bg-[#D41C2E] hover:scale-105 transition-all ease-linear duration-200">
            EXCLUIR JOGO
          </button>
        </div>
      </main>
    </>
  );
};

export default InitGame;
