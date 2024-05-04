"use client";
import { useForm } from "react-hook-form";
import AccessComponent from "../AccessComponent";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Image from "next/image";
import IconCode from "./../../../public/icons/icon-code.png";
import Link from "next/link";
const codeRegisterType = z.object({
  code: z.string().min(4, "Digite o código!"),
});
const CodeRegister = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(codeRegisterType) });
  const handleSubmitForm = (data: any) => {};
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <AccessComponent title="Código de confirmação">
        <form
          className="flex flex-col gap-5 items-center"
          onSubmit={handleSubmit(handleSubmitForm)}
        >
          <div className="lg:w-96 w-80">
            <p className="mb-3">
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
  );
};

export default CodeRegister;
