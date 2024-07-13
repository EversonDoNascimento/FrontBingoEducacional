"use client";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import EmailIcon from "./../../../public/icons/icon-email.png";
import PasswordIcon from "./../../../public/icons/icon-password.png";
import Link from "next/link";
import IconShowEye from "./../../../public/icons/eye-show.png";
import IconHiddenEye from "./../../../public/icons/eye-hide.png";
import AccessComponent from "../AccessComponent";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/Context/auth";
const SchemaLogin = z.object({
  email: z.string().email("Email inválido!"),
  // .regex(
  //   /@(discente\.ifpe.edu.br|docente\.ifpe.edu\.br)$/,
  //   "Você deve logar com o email institucional!"
  // ),
  password: z.string().min(4, "Senha deve conter no mínimo 4 caracteres"),
});
const Login = () => {
  const contextLogin = useContext(AuthContext);

  const router = useRouter();
  const [showPass, setShowPass] = useState({
    inputType: "password",
    show: false,
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(SchemaLogin) });

  const handleSubmitForm = (data: any) => {
    contextLogin?.sendLogin({ email: data.email, password: data.password });
  };
  return (
    <AccessComponent title="Acessar plataforma">
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
        <div>
          <label className="flex border-[1px] px-4 py-2 rounded-lg lg:w-96 w-80">
            <Image src={PasswordIcon} alt="Ícone de email"></Image>
            <input
              style={{ outline: "none" }}
              type={showPass.inputType}
              placeholder="Senha"
              {...register("password")}
              className="bg-[#1A1B1F] ml-2 w-[100%] outline-none "
            ></input>
            {showPass.show ? (
              <Image
                onClick={() => {
                  setShowPass((prev) => ({
                    ...prev,
                    show: !prev.show,
                    inputType: "text",
                  }));
                }}
                src={IconShowEye}
                alt="Ícone de email"
                width={20}
                className="cursor-pointer hover:scale-105 hover:opacity-80"
              ></Image>
            ) : (
              <Image
                onClick={() => {
                  setShowPass((prev) => ({
                    ...prev,
                    show: !prev.show,
                    inputType: "password",
                  }));
                }}
                src={IconHiddenEye}
                alt="Ícone de email"
                width={20}
                className="cursor-pointer hover:scale-105 hover:opacity-80"
              ></Image>
            )}
          </label>
          <span className="flex justify-end text-sm text-[#F2CE4E] underline cursor-pointer hover:opacity-80">
            <Link href={"/recovery_password"}> Esqueceu a senha?</Link>
          </span>
          {errors.password && (
            <p className="text-red-600 text-sm">
              {errors.password.message as string}
            </p>
          )}
        </div>
        <button className="w-24 rounded-lg px-4 py-2 bg-[#3D4EFB] hover:scale-105 transition-all ease-linear duration-200">
          Entrar
        </button>
        <span className="mt-5 text-sm">
          Você não tem um cadastro?{" "}
          <Link
            href={"/register"}
            className="text-[#F2CE4E] underline hover:opacity-80"
          >
            Cadastre-se aqui
          </Link>
        </span>
      </form>
    </AccessComponent>
  );
};

export default Login;
