"use client";
import Header from "../Header/Header";
import Image from "next/image";
import CardGame from "./../../../public/icons/bg-cardGame.png";
import LevelSelector from "../quantSelector";
import QuantSelector from "../quantSelector";
import { useState } from "react";

const ConfigGame = () => {
  const [inputValue, setInputValue] = useState("1");
  const [savedValue, setSavedValue] = useState("1");

  const [cardDeckSize, setCardDeckSize] = useState("1");
  const [responseTime, setResponseTime] = useState("1");

  const BingoCardGenerator = (event) => {
    const value = event.target.value;
    setCardDeckSize(value < 1 ? 1 : value); // Garante que o valor nunca seja menor que 1
  };

  const measureResponseTime = (event) => {
    const value = event.target.value;
    setResponseTime(value < 1 ? 1 : value); // Garante que o valor nunca seja menor que 1\
  };

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value < 1 ? 1 : value); // Garante que o valor nunca seja menor que 1
  };

  const handleSave = () => {
    setSavedValue(inputValue);
    // Você pode fazer outras ações com savedValue aqui, como enviar para um servidor, etc.
    console.log("Valor salvo:", savedValue);
  };

  return (
    <>
      <Header />
      <main className="flex flex-col items-center lg:p-8 p-0 space-y-4">
        <h1 className="text-4xl">Jogo</h1>

        <div className="bg-[#1A1B1F] w-[400px] h-[370px] border rounded-lg border-transparent">
          <Image
            src={CardGame}
            alt="Ícone de jogo"
            className="rounded-lg h-50 w-full"
          ></Image>
          <div className="flex flex-col pl-3 pt-3 font-medium text-base gap-1">
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

        <div className="flex justify-between bg-[#1A1B1F] w-[400px] h-[40px] border rounded-lg border-transparent">
          <label className="pl-3 pt-2 font-medium text-base">
            Qtd. Perguntas selecionadas:
          </label>
          <input
            className="bg-[#1A1B1F] w-12 border rounded-lg border-transparent"
            type="number"
            id="quant-selector"
            name="quantity"
            value={inputValue}
            min="1"
            onChange={handleInputChange}
          />
          <button
            className="mt-2 text-center rounded-2xl px-[10px] bg-[#3D4EFB] hover:scale-105 transition-all ease-linear duration-200 w-[100px] h-[25px] font-medium text-xs"
            onClick={handleSave}
          >
            SELECIONAR
          </button>
        </div>

        <div className="flex flex-col w-[400px] h-[60px] justify-between">
          <div>
            <label className="pr-2">Tamanho das cartelas:</label>
            <input
              className="bg-[#1A1B1F] w-12 border rounded-lg border-transparent"
              type="number"
              id="quant-selector"
              name="quantity"
              value={cardDeckSize}
              min="1"
              onChange={BingoCardGenerator}
            />
          </div>
          <div>
            <label className="pr-2">Tempo para resposta (segundos):</label>
            <input
              className="bg-[#1A1B1F] w-12 border rounded-lg border-transparent"
              type="number"
              id="quant-selector"
              name="quantity"
              value={responseTime}
              min="1"
              onChange={measureResponseTime}
            />
          </div>
        </div>

        <div className="flex flex-col">
          <button className="mt-5 text-center rounded-lg px-[150px] py-3 bg-[#36A873] hover:scale-105 transition-all ease-linear duration-200">
            INICIAR JOGO
          </button>

          <button className="mt-5 text-center rounded-lg px-[145px] py-3 bg-[#D41C2E] hover:scale-105 transition-all ease-linear duration-200">
            CANCELAR
          </button>
        </div>
      </main>
    </>
  );
};

export default ConfigGame;
