"use client";
import { useForm } from "react-hook-form";
import AccessComponent from "../AccessComponent";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Image from "next/image";
import EmailIcon from "./../../../public/icons/icon-email.png";
import Link from "next/link";
import { useState } from "react";
import Loading from "../Loading/Loading";
import { recoveryPass } from "@/api/recoveyPass";
import StatusWindow from "../StatusWindow/StatusWindow";
import { recoveryPassBody } from "./../../api/bodyEmail";
import { useRouter } from "next/navigation";
const recoveryType = z.object({
  email: z
    .string()
    .email("Email inválido!")
    .regex(
      /@(discente\.ifpe.edu.br|docente\.ifpe.edu\.br)$/,
      "Você deve logar com o email institucional!"
    ),
});
const RecoveryPassword = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState({
    show: false,
    message: "",
  });
  const [successMessage, setSuccessMessage] = useState({
    show: false,
    message: "",
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(recoveryType) });
  const handleRecoveyPass = async (email: string) => {
    setLoading(true);
    const code = generateCode();
    const { status, data } = await recoveryPass({ code: code, email: email });
    if (status === 200) {
      const body = recoveryPassBody({ code: code, email: email });
      const response = await fetch("/api/sendEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: email,
          subject: "Recupere sua senha Bingo Educacional",
          text: body,
        }),
      });
      if (response.ok) {
        setSuccessMessage({ show: true, message: "Verifique seu email!" });
        setTimeout(() => setSuccessMessage({ show: false, message: "" }), 3000);
      } else {
        setErrorMessage({ show: true, message: "Erro ao enviar email!" });
        setTimeout(() => setErrorMessage({ show: false, message: "" }), 3000);
      }
    } else {
      setErrorMessage({ show: true, message: data.message });
      setTimeout(() => setErrorMessage({ show: false, message: "" }), 3000);
    }
    setLoading(false);
  };
  const generateCode = () => {
    const date = new Date();
    const randon = Math.floor(Math.random() * 1000);
    return date.getTime() + "" + randon;
  };
  const handleSubmitForm = (data: any) => {
    handleRecoveyPass(data.email);
  };
  return (
    <>
      {loading ? (
        <Loading></Loading>
      ) : (
        <>
          {successMessage.show ? (
            <StatusWindow
              error={false}
              text={successMessage.message}
            ></StatusWindow>
          ) : null}
          {errorMessage.show ? (
            <StatusWindow
              error={true}
              text={errorMessage.message}
            ></StatusWindow>
          ) : null}
          <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <AccessComponent title="Recuperação de senha">
              <form
                autoComplete="off"
                className="flex flex-col gap-5 items-center"
                onSubmit={handleSubmit(handleSubmitForm)}
              >
                <p className="mb-3 w-96 text-center">
                  Enviaremos um email com instruções para recuperar sua senha
                </p>
                <div>
                  <label className="flex border-[1px] px-4 py-2 rounded-lg lg:w-96 w-80">
                    <Image src={EmailIcon} alt="Ícone de email"></Image>
                    <input
                      placeholder="Digite o seu email de acesso"
                      {...register("email")}
                      className="bg-[#1A1B1F] ml-2 w-[100%] outline-none"
                    ></input>
                  </label>
                  {errors.email && (
                    <p className="text-red-600 text-sm">
                      {errors.email.message as string}
                    </p>
                  )}
                </div>
                <button className="mt-5 text-center  rounded-lg px-4 py-2 bg-[#3D4EFB] hover:scale-105 transition-all ease-linear duration-200">
                  Enviar email
                </button>
                <span className="mt-5 text-sm">
                  Você já tem um cadastro?{" "}
                  <Link
                    href={"/"}
                    className="text-[#F2CE4E] underline hover:opacity-80"
                  >
                    Entre aqui!
                  </Link>
                </span>
              </form>
            </AccessComponent>
          </main>
        </>
      )}
    </>
  );
};

export default RecoveryPassword;
