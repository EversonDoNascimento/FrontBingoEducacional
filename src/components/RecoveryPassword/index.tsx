"use client";
import { useForm } from "react-hook-form";
import AccessComponent from "../AccessComponent";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Image from "next/image";
import EmailIcon from "./../../../public/icons/icon-email.png";
import Link from "next/link";
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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(recoveryType) });
  const handleSubmitForm = (data: any) => {};
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <AccessComponent title="Recuperação de senha">
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
                {errors.email.message as string}
              </p>
            )}
          </div>
          <button className="mt-5 text-center  rounded-lg px-4 py-2 bg-[#3D4EFB] hover:scale-105 transition-all ease-linear duration-200">
            Recuperar senha{" "}
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

export default RecoveryPassword;
