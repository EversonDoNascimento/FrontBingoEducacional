"use client";
import { useForm } from "react-hook-form";
import AccessComponent from "../AccessComponent";
import { zodResolver } from "@hookform/resolvers/zod";
import IconPass from "./../../../public/icons/icon-password.png";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Loading from "../Loading/Loading";
import StatusWindow from "../StatusWindow/StatusWindow";
import SetPasswordSchema from "@/zod/SetPasswordSchema";
import { useSearchParams, useRouter } from "next/navigation";
import { setPassword } from "@/api/recoveyPass";
const SetPassword = () => {
  const params = useSearchParams();
  const router = useRouter();
  const code = params.get("code");
  const email = params.get("email");
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
  } = useForm({ resolver: zodResolver(SetPasswordSchema) });
  const handleSetPass = async (password: string) => {
    setLoading(true);
    if (code && email) {
      const { status, data } = await setPassword({ code, email, password });
      if (status === 200) {
        setSuccessMessage({
          show: true,
          message: data.message,
        });
        setTimeout(() => {
          setSuccessMessage({ show: false, message: "" });
        }, 3000);
        setTimeout(() => {
          router.push("/");
        }, 3000);
      }
    }

    setLoading(false);
  };

  const handleSubmitForm = (data: any) => {
    handleSetPass(data.password);
  };

  useEffect(() => {
    if (code === null && email === null) {
      setErrorMessage({
        show: true,
        message: "Código e/ou email não encontrados",
      });
      setTimeout(() => {
        setErrorMessage({
          show: false,
          message: "",
        });
      }, 3000);
      setTimeout(() => {
        router.push("recovery_password");
      }, 3000);
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
            <AccessComponent title="Recuperação de senha">
              <form
                className="flex flex-col gap-5 items-center"
                onSubmit={handleSubmit(handleSubmitForm)}
              >
                <div>
                  <label className="flex border-[1px] px-4 py-2 rounded-lg lg:w-96 w-80">
                    <Image src={IconPass} alt="Ícone de senha"></Image>
                    <input
                      placeholder="Digite sua nova senha"
                      {...register("password")}
                      className="bg-[#1A1B1F] ml-2 w-[100%] outline-none"
                    ></input>
                  </label>
                  {errors.password && (
                    <p className="text-red-600 text-sm">
                      {errors.password.message as string}
                    </p>
                  )}
                </div>
                <button className="mt-5 text-center  rounded-lg px-4 py-2 bg-[#3D4EFB] hover:scale-105 transition-all ease-linear duration-200">
                  Salvar senha{" "}
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

export default SetPassword;
