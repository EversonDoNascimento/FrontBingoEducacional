"use client";
import { useState } from "react";
import BgCodeGame from "./../../../public/icons/bg-codegame.png";
import Image from "next/image";
type Props = {
  sendData: (data: string) => void;
};
const ContainerCodeGame = ({ sendData }: Props) => {
  const [code, setCode] = useState("");
  const [verifySend, setVerifySend] = useState(false);
  return (
    <section className="bg-[#1A1B1F] flex lg:flex-row flex-col-reverse justify-between rounded-xl mt-4">
      <section className="flex justify-center items-center flex-col gap-2 h-64 lg:h-[20rem] lg:w-[35rem] md:w-[30rem] sm:w-[25rem] w-[20rem]">
        <div className="flex flex-col gap-2">
          <span className="text-sm md:text-md ">
            Digite o código do jogo para acessá-lo:
          </span>
          <label className="flex border-[1px]  py-2 rounded-lg lg:w-96 md:w-80 sm:w-72 w-64">
            <input
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setCode(e.target.value);
              }}
              value={code}
              type="text"
              placeholder="Digite o código para entrar no jogo!"
              className="bg-transparent ml-1 w-[100%] outline-none text-sm md:text-md"
            ></input>
          </label>
        </div>
        <div className="mt-5">
          {code.trim().length < 4 ? (
            <button
              disabled
              className="bg-[#B6B6B6] text-black px-4 py-1 rounded-lg cursor-default"
            >
              Entrar no jogo
            </button>
          ) : (
            <button
              onClick={() => {
                if (code.trim() !== "") {
                  sendData(code);
                }
              }}
              className="bg-[#3D4EFB] px-4 py-1 rounded-lg hover:scale-105 transition-all ease-linear duration-200"
            >
              Entrar no jogo
            </button>
          )}
        </div>
      </section>
      <div>
        <Image
          className="rounded-t-xl lg:rounded-r-xl lg:rounded-tl-none lg:w-[35rem] md:w-[30rem] sm:w-[25rem] w-[20rem] "
          src={BgCodeGame}
          alt="Background game"
        ></Image>
      </div>
    </section>
  );
};

export default ContainerCodeGame;
