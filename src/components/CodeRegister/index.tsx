"use client";
import { useForm } from "react-hook-form";
import AccessComponent from "../AccessComponent";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Image from "next/image";
import IconCode from "./../../../public/icons/icon-code.png";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { activateAccount } from "./../../api/register";
import EmailIcon from "./../../../public/icons/icon-email.png";
import Loading from "../Loading/Loading";
import StatusWindow from "../StatusWindow/StatusWindow";

const codeRegisterType = z.object({
  email: z.string().email("Digite um email válido!"),
  code: z.string().min(4, "Digite o código!"),
});
const CodeRegister = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ resolver: zodResolver(codeRegisterType) });
  const params = useSearchParams();
  const code = params.get("code");
  const email = params.get("email");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState({
    show: false,
    message: "",
  });
  const [successMessage, setsuccessMessage] = useState({
    show: false,
    message: "",
  });
  const handleActiveAccount = async () => {
    setLoading(true);
    const { data, status } = await activateAccount(
      code as string,
      email as string
    );
    if (status === 200) {
      setsuccessMessage({ show: true, message: data.message });
      setTimeout(() => {
        setsuccessMessage({ show: false, message: "" });
      }, 3000);
      setTimeout(() => {
        router.push("/");
      }, 3000);
    } else {
      setErrorMessage({ show: true, message: data.message });
      setTimeout(() => {
        setErrorMessage({ show: false, message: "" });
      }, 3000);
    }
    setLoading(false);
  };
  const handleSubmitForm = (data: any) => {
    handleActiveAccount();
  };
  useEffect(() => {
    if (code !== null && email !== null) {
      setValue("email", email);
      setValue("code", code);
    }
  }, []);
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
            <AccessComponent title="Código de confirmação">
              <form
                className="flex flex-col gap-5 items-center"
                onSubmit={handleSubmit(handleSubmitForm)}
              >
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
                <div className="lg:w-96 w-80">
                  <p className="mb-3 text-center">
                    Enviamos um código para o seu email. Digite-o logo abaixo, e
                    confirme seu cadastro:
                  </p>
                  <label className="flex border-[1px] px-4 py-2 rounded-lg lg:w-96 w-80">
                    <Image
                      src={IconCode}
                      alt="Ícone do código de confirmação"
                    ></Image>

                    <input
                      placeholder="Código de confirmação"
                      {...register("code")}
                      className="bg-[#1A1B1F] ml-2 w-[100%] outline-none"
                    ></input>
                  </label>
                  {errors.code && (
                    <p className="text-red-600 text-sm">
                      {errors.code.message as string}
                    </p>
                  )}
                </div>
                <button className="mt-5 text-center  rounded-lg px-4 py-2 bg-[#3D4EFB] hover:scale-105 transition-all ease-linear duration-200">
                  Confirmar cadastro
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

export default CodeRegister;
