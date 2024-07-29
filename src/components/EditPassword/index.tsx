"use client";
import { useState } from "react";
import Header from "../Header/Header";
import Loading from "../Loading/Loading";
import StatusWindow from "../StatusWindow/StatusWindow";
import { useRouter } from "next/navigation";
import { UpdatePassword } from "@/api/updatePass";
const EditPassword = () => {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [windowRequestError, setWindowRequestError] = useState({
    show: false,
    message: "",
  });
  const [windowRequestSuccess, setWindowRequestSuccess] = useState({
    show: false,
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleUpdatePass = async (password: string) => {
    setLoading(true);
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("email");
    if (email && token) {
      const { status, data } = await UpdatePassword(token, password, email);
      if (status === 200) {
        setWindowRequestSuccess({ show: true, message: data.message });
        setTimeout(
          () => setWindowRequestSuccess({ show: false, message: "" }),
          3000
        );
      } else {
        if (data.error) {
          setWindowRequestError({ show: true, message: data.error });
          setTimeout(
            () => setWindowRequestError({ show: false, message: "" }),
            3000
          );
        } else {
          setWindowRequestError({ show: true, message: data.message });
          setTimeout(
            () => setWindowRequestError({ show: false, message: "" }),
            3000
          );
        }
      }
    } else {
      setWindowRequestError({
        show: true,
        message: "Email e/ou token não encontrados!",
      });
      setTimeout(
        () => setWindowRequestError({ show: false, message: "" }),
        3000
      );
      setTimeout(() => router.back(), 3000);
    }
    setLoading(false);
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(e.target.value);
  };

  const handleModifyClick = () => {
    if (password !== confirmPassword) {
      setWindowRequestError({
        show: true,
        message: "As senhas não coincidem.",
      });
      setTimeout(
        () => setWindowRequestError({ show: false, message: "" }),
        3000
      );
      ("As senhas não coincidem.");
    } else if (password.length < 6) {
      setWindowRequestError({
        show: true,
        message: "Digite uma senha com pelo menos 6 caracteres.",
      });
      setTimeout(
        () => setWindowRequestError({ show: false, message: "" }),
        3000
      );
      ("As senhas não coincidem.");
    } else {
      // Faça algo com as senhas válidas, como enviar para o servidor
      handleUpdatePass(password);
      setPassword("");
      setConfirmPassword("");
    }
  };

  return (
    <>
      {loading ? (
        <Loading></Loading>
      ) : (
        <>
          <Header />
          {windowRequestSuccess.show ? (
            <StatusWindow
              text={windowRequestSuccess.message}
              error={false}
            ></StatusWindow>
          ) : null}
          {windowRequestError.show ? (
            <StatusWindow
              text={windowRequestError.message}
              error={true}
            ></StatusWindow>
          ) : null}
          <main className="flex flex-col items-center lg:p-24 p-0 mt-20 lg:mt-0">
            <h1 className="text-xl ">Perfil</h1>
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
            </div>

            <button
              className="mt-5 text-center rounded-lg px-6 py-1 bg-[#3D4EFB] hover:scale-105 transition-all ease-linear duration-200"
              onClick={handleModifyClick}
            >
              MODIFICAR
            </button>
          </main>
        </>
      )}
    </>
  );
};

export default EditPassword;
