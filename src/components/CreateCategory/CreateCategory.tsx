import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import Loading from "../Loading/Loading";
import { registerCategory } from "@/api/categories";
import StatusWindow from "../StatusWindow/StatusWindow";
const SchemaCategory = z.object({
  name: z.string().min(3, "Digite alguma categoria!"),
});

type Props = {
  sendClose: () => void;
};
const CreateCategory = ({ sendClose }: Props) => {
  const [messageError, setMessageError] = useState({
    show: false,
    message: "",
  });
  const [messageSuccess, setMessageSuccess] = useState({
    show: false,
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(SchemaCategory),
  });

  const handleRegisterCategory = async (name: string) => {
    setLoading(true);
    const token = localStorage.getItem("token") as string;
    const { status, data } = await registerCategory(token, name);
    if (status === 201) {
      setMessageSuccess({
        show: true,
        message: "Categoria criada com sucesso!",
      });
      setTimeout(() => {
        setMessageSuccess({ show: false, message: "" });
      }, 3000);
      setTimeout(() => sendClose(), 3000);
    } else {
      setMessageError({ show: true, message: "Erro ao salvar categoria!" });
      setTimeout(() => setMessageError({ show: false, message: "" }), 3000);
    }
    setLoading(false);
  };
  const onSubmit = (data: any) => {
    handleRegisterCategory(data.name);
  };

  return (
    <div className="fixed z-50 top-0 right-0 w-full h-full bg-black/50 flex justify-center items-center">
      {loading ? (
        <Loading></Loading>
      ) : (
        <>
          {messageSuccess.show ? (
            <StatusWindow
              error={false}
              text={messageSuccess.message}
            ></StatusWindow>
          ) : null}
          {messageError.show ? (
            <StatusWindow
              error={true}
              text={messageError.message}
            ></StatusWindow>
          ) : null}

          <form
            autoComplete="off"
            onSubmit={handleSubmit(onSubmit)}
            className="bg-[#1A1B1F] p-4 rounded-xl flex flex-col justify-center items-center"
          >
            <h1 className="mb-8 text-md font-bold">Cadastre uma categoria</h1>
            <label className="flex border-[1px] px-2 py-1 rounded-lg lg:w-72 w-64">
              <input
                type="text"
                placeholder="Digite o nome da categoria"
                {...register("name")}
                className="bg-transparent ml-1 w-[100%] outline-none text-sm"
              ></input>
            </label>
            {errors.name && (
              <p className="text-red-600 text-sm w-full ml-2 mt-1">
                {errors.name.message as string}
              </p>
            )}
            <div className="flex gap-2">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  sendClose();
                }}
                className="text-sm mt-4 rounded-lg px-2 py-1 bg-red-700 hover:scale-105 transition-all ease-linear duration-200"
              >
                Voltar
              </button>
              <button className="text-sm mt-4 rounded-lg px-2 py-1 bg-[#3D4EFB] hover:scale-105 transition-all ease-linear duration-200">
                Cadastrar
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default CreateCategory;
