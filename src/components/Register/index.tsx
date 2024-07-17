"use client";
import { useForm } from "react-hook-form";
import AccessComponent from "../AccessComponent";
import { zodResolver } from "@hookform/resolvers/zod";
import RegisterSchema from "./../../zod/RegisterSchema";
import Image from "next/image";
import EmailIcon from "./../../../public/icons/icon-email.png";
import NameIcon from "./../../../public/icons/name-icon.png";
import PasswordIcon from "./../../../public/icons/icon-password.png";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { registerCode, registerUser, UserType } from "./../../api/register";
import { useState } from "react";
import Loading from "../Loading/Loading";
import { bodyEmail } from "./../../api/bodyEmail";
import StatusWindow from "../StatusWindow/StatusWindow";
const Register = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ resolver: zodResolver(RegisterSchema) });
  const [loading, setLoading] = useState(false);
  const confirmEmail = watch("confirm_email") as string;
  const email = watch("email") as string;
  const confirmPass = watch("confirm_password") as string;
  const password = watch("password") as string;
  const isTeacher = watch("is_teacher");
  const [errorMessage, setErrorMessage] = useState({
    show: false,
    message: "",
  });
  const [successMessage, setSuccessMessage] = useState({
    show: false,
    message: "",
  });
  const handleRegisterUser = async (user: UserType) => {
    setLoading(true);
    const { status, data } = await registerUser(user);
    const code = generateCode();
    if (status === 201) {
      const codeRegister = await registerCode(code, user.email);
      if (codeRegister.status === 200) {
        const body = bodyEmail({ code: code, email: user.email });
        const response = await fetch("/api/sendEmail", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            to: user.email,
            subject: "Código de ativação",
            text: body,
          }),
        });
        if (response.ok) {
          setSuccessMessage({
            show: true,
            message: "Verifique seu email, e confirme o código!",
          });
          setTimeout(
            () => setSuccessMessage({ show: false, message: "" }),
            3000
          );
          setTimeout(() => router.push("/code_register"), 3000);
        } else {
          setErrorMessage({ show: true, message: "Erro ao enviar email!" });
          setTimeout(() => {
            setErrorMessage({ show: false, message: "" });
          }, 3000);
        }
      } else {
        setErrorMessage({ show: true, message: codeRegister.data.message });
        setTimeout(() => {
          setErrorMessage({ show: false, message: "" });
        }, 3000);
      }
    } else {
      setErrorMessage({ show: true, message: data.message });
      setTimeout(() => {
        setErrorMessage({ show: false, message: "" });
      }, 3000);
    }
    setLoading(false);
  };
  const handleFormSubmit = (data: any) => {
    if (email === confirmEmail && password === confirmPass) {
      handleRegisterUser({
        email: data.email,
        name: data.name,
        password: data.password,
      });
    }
  };

  const generateCode = () => {
    const date = new Date();
    const randon = Math.floor(Math.random() * 1000);
    return date.getTime() + "" + randon;
  };

  return (
    <>
      {loading ? (
        <Loading></Loading>
      ) : (
        <>
          {successMessage.show ? (
            <>
              <StatusWindow
                error={false}
                text={successMessage.message}
              ></StatusWindow>
            </>
          ) : null}
          {errorMessage.show ? (
            <>
              <StatusWindow
                error={false}
                text={errorMessage.message}
              ></StatusWindow>
            </>
          ) : null}
          <main className="flex min-h-screen flex-col items-center justify-between lg:p-24 p-0">
            <AccessComponent title="Cadastre-se">
              <form
                className="flex flex-col gap-5 items-center"
                onSubmit={handleSubmit(handleFormSubmit)}
              >
                {/* <div>
      <label>
        Você é professor ou aluno?
        <div className="flex px-4 py-2 rounded-lg lg:w-96 w-80 gap-5">
          <span className="flex gap-1">
            <input
              value="1"
              className="bg-[#F3F4F6] p-2 cursor-pointer"
              {...register("is_teacher")}
              type="radio"
            ></input>
            Professor
          </span>
          <span className="flex gap-1">
            <input
              value="0"
              className="bg-[#F3F4F6] p-2 cursor-pointer"
              {...register("is_teacher")}
              type="radio"
            ></input>
            Aluno
          </span>
        </div>
        {isTeacher == null && (
          <p className="text-red-600 text-sm">Selecione uma opção!</p>
        )}
      </label>
    </div> */}
                <div>
                  <label className="flex border-[1px] px-4 py-2 rounded-lg lg:w-96 w-80">
                    <Image src={NameIcon} alt="Ícone do usuário"></Image>
                    <input
                      placeholder="Nome"
                      {...register("name")}
                      className="bg-[#1A1B1F] ml-2 w-[100%] outline-none"
                    ></input>
                  </label>
                  {errors.name && (
                    <p className="text-red-600 text-sm">
                      {errors.name?.message as string}
                    </p>
                  )}
                </div>
                <div>
                  <label className="flex border-[1px] px-4 py-2 rounded-lg lg:w-96 w-80">
                    <Image src={EmailIcon} alt="Ícone de email"></Image>
                    <input
                      placeholder="Email"
                      {...register("email")}
                      className="bg-[#1A1B1F] ml-2 w-[100%] outline-none"
                    ></input>
                  </label>
                  {errors.email && (
                    <p className="text-red-600 text-sm">
                      {errors.email?.message as string}
                    </p>
                  )}
                </div>
                <div>
                  <label className="flex border-[1px] px-4 py-2 rounded-lg lg:w-96 w-80">
                    <Image src={EmailIcon} alt="Ícone de email"></Image>
                    <input
                      placeholder="Confirme o email"
                      {...register("confirm_email")}
                      className="bg-[#1A1B1F] ml-2 w-[100%] outline-none"
                    ></input>
                  </label>
                  {errors.confirm_email && (
                    <p className="text-red-600 text-sm">
                      {errors.confirm_email?.message as string}
                    </p>
                  )}
                  {email !== confirmEmail && (
                    <p className="text-red-600 text-sm">
                      Emails não correspondem!
                    </p>
                  )}
                </div>
                <div>
                  <label className="flex border-[1px] px-4 py-2 rounded-lg lg:w-96 w-80">
                    <Image src={PasswordIcon} alt="Ícone de senha"></Image>
                    <input
                      placeholder="Senha"
                      {...register("password")}
                      className="bg-[#1A1B1F] ml-2 w-[100%] outline-none"
                    ></input>
                  </label>
                  {errors.password && (
                    <p className="text-red-600 text-sm">
                      {errors.password?.message as string}
                    </p>
                  )}
                </div>
                <div>
                  <label className="flex border-[1px] px-4 py-2 rounded-lg lg:w-96 w-80">
                    <Image src={PasswordIcon} alt="Ícone de senha"></Image>
                    <input
                      placeholder="Confirme sua senha"
                      {...register("confirm_password")}
                      className="bg-[#1A1B1F] ml-2 w-[100%] outline-none"
                    ></input>
                  </label>
                  {errors.confirm_password && (
                    <p className="text-red-600 text-sm">
                      {errors.confirm_password?.message as string}
                    </p>
                  )}
                  {password !== confirmPass && (
                    <p className="text-red-600 text-sm">
                      Senhas não correspondem!
                    </p>
                  )}
                </div>
                <button className="mt-5 text-center  rounded-lg px-4 py-2 bg-[#3D4EFB] hover:scale-105 transition-all ease-linear duration-200">
                  Cadastrar
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

export default Register;
