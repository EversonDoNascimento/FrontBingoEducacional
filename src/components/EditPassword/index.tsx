"use client";
import { useState } from "react";
import Header from "../Header/Header";

const EditPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleModifyClick = () => {
    if (password !== confirmPassword) {
      setErrorMessage("As senhas não coincidem.");
      ("As senhas não coincidem.");
    } else {
      // Faça algo com as senhas válidas, como enviar para o servidor
      setErrorMessage("");
    }
  };

  return (
    <>
      <Header />
      <main className="flex flex-col items-center lg:p-24 p-0">
        <h1 className="text-4xl">Perfil</h1>
        <div className="pt-10 space-y-4">
          <label className="bg-[#1A1B1F] w-[100%] outline-none">
            Editar senha:
          </label>
          <input
            placeholder="Senha"
            className="
            bg-transparent 
            flex border-[1px] px-4 py-2 rounded-lg lg:w-96 w-80 placeholder-white"
            onChange={handlePasswordChange}
          ></input>
          <input
            placeholder="Confirmar a senha"
            className="
            bg-transparent flex border-[1px] px-4 py-2 rounded-lg lg:w-96 w-80 placeholder-white"
            onChange={handleConfirmPasswordChange}
          ></input>
          {errorMessage && (
            <p className="text-red-500">{errorMessage}</p>
          )}
        </div>

        <button
          className="mt-5 text-center rounded-lg px-6 py-1 bg-[#3D4EFB] hover:scale-105 transition-all ease-linear duration-200"
          onClick={handleModifyClick}
        >
          MODIFICAR
        </button>
      </main>
    </>
  );
};

export default EditPassword;
