"use client";
import { SchemaAddQuestions } from "./../../zod/AddQuestionSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import CardRegisteredQuestion from "../CardRegistedQuestion";
import { getAllCategories } from "@/api/categories";
import Loading from "../Loading/Loading";
import StatusWindow from "../StatusWindow/StatusWindow";
import CreateCategory from "../CreateCategory/CreateCategory";
import SelectQuestions from "../SelectQuestions/SelectQuestions";
import IconRecoveryQuestion from "./../../../public/icons/icon-recovery-question.png";
import Image from "next/image";
const CreateGame = () => {
  const [loading, setLoading] = useState(false);
  const [recoverQuestion, setRecoverQuestion] = useState(false);
  const [showCreateCaregory, setShowCreateCategory] = useState(false);
  const [messageError, setMessageError] = useState({
    show: false,
    message: "",
  });
  const [messageSuccess, setMessageSuccess] = useState({
    show: false,
    message: "",
  });
  const [questionsRegisted, setQuestionsRegistered] = useState<
    z.infer<typeof SchemaAddQuestions>[]
  >([]);
  const [categories, setCategories] = useState<{ id: number; name: string }[]>(
    []
  );
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(SchemaAddQuestions),
  });
  const onSubmit = (data: any) => {
    setQuestionsRegistered((prev) => [
      ...prev,
      { question: data.question, answer: data.answer, category: data.category },
    ]);

    setValue("question", "");
    setValue("answer", "");
    setValue("category", "");
  };
  useEffect(() => {
    if (questionsRegisted?.length !== 0) {
      // Convertendo o array de objetos para uma string JSON
      const arrayEmString = JSON.stringify(questionsRegisted);

      // Salvando a string no localStorage
      localStorage.setItem("questionStorage", arrayEmString);
    }
  }, [questionsRegisted]);

  const handleGetCategories = async () => {
    setLoading(true);
    const token = localStorage.getItem("token") as string;
    const { data, status } = await getAllCategories(token);
    if (status == 200) {
      setCategories(data);
    } else {
      setMessageError({ show: true, message: "Erro ao buscar categorias" });
      setTimeout(() => setMessageError({ show: false, message: "" }), 3000);
    }
    setLoading(false);
  };

  useEffect(() => {
    const local = localStorage.getItem("questionStorage");
    if (local) {
      if (local.length > 0) {
        setQuestionsRegistered(JSON.parse(local as string));
      }
    }
    handleGetCategories();
  }, []);
  return (
    <>
      {loading ? (
        <Loading></Loading>
      ) : (
        <>
          {recoverQuestion ? (
            <SelectQuestions
              sendIdQuestions={(questionsSelected) => {
                console.log(questionsSelected);
              }}
              sendClose={() => {
                setRecoverQuestion(false);
              }}
            ></SelectQuestions>
          ) : null}

          {showCreateCaregory ? (
            <CreateCategory
              sendClose={() => {
                setShowCreateCategory(false);
                handleGetCategories();
              }}
            ></CreateCategory>
          ) : null}

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
          <main className="flex flex-col justify-center items-center mt-24 mb-20">
            <h1 className="font-bold text-xl">Criar Jogo</h1>
            <section className="lg:w-[60rem] md:w-[30rem] sm:w-[25rem] w-[20rem] mt-16 bg-[#1A1B1F] py-4">
              <section className="flex flex-col lg:flex-row justify-center items-center lg:items-start lg:justify-between py-5">
                <div className="w-[50%] flex justify-center ">
                  <form
                    className="flex flex-col  gap-5"
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    <h2 className="text-center font-bold">Cadastrar questão</h2>
                    <label className="flex flex-col w-64 sm:w-80">
                      <textarea
                        className="bg-transparent border-[1px] border-white rounded-lg p-2 h-32  "
                        {...register("question")}
                        placeholder="Digite o texto da pergunta"
                      ></textarea>
                      {errors.question && (
                        <span className="text-sm text-red-700">
                          {errors.question.message as string}
                        </span>
                      )}
                    </label>

                    <label className="flex flex-col w-64 sm:w-80">
                      <textarea
                        className="bg-transparent border-[1px] border-white rounded-lg p-2 h-32"
                        {...register("answer")}
                        placeholder="Digite o texto da resposta"
                      ></textarea>{" "}
                      {errors.answer && (
                        <span className="text-sm text-red-700">
                          {errors.answer.message as string}
                        </span>
                      )}
                    </label>
                    <label className="flex flex-col w-64 sm:w-80">
                      <select
                        className="bg-transparent border-[1px] border-white rounded-lg bg-[#1A1B1F] p-2"
                        {...register("category")}
                      >
                        <option
                          className="bg-[#1A1B1F]"
                          value={""}
                          selected
                          disabled
                        >
                          Selecione uma categoria
                        </option>
                        {categories.map(
                          (category: { id: number; name: string }) => {
                            return (
                              <option
                                className="bg-[#1A1B1F]"
                                key={category.id}
                              >
                                {category.name}
                              </option>
                            );
                          }
                        )}
                      </select>
                      {errors.category && (
                        <span className="text-sm text-red-700">
                          {errors.category.message as string}
                        </span>
                      )}
                    </label>
                    <label className="flex flex-col justify-center items-center gap-1">
                      <span className="text-sm text-red-700 text-center">
                        Não encontrou uma categoria para sua questão?
                      </span>
                      <button
                        className="text-sm bg-blue-700 px-2 py-1 rounded-lg hover:scale-105 transition-all ease-linear duration-200 hover:opacity-90"
                        onClick={(e) => {
                          e.preventDefault();
                          setShowCreateCategory(true);
                        }}
                      >
                        Cadastrar nova categoria
                      </button>
                    </label>

                    <div className="flex justify-center mt-5">
                      <button className="flex bg-green-700 px-2 py-1 rounded-lg gap-2 hover:scale-105 transition-all ease-linear duration-200">
                        <div>
                          <div className="border-2 border-white rounded-full w-6 h-6 flex justify-center items-center">
                            <div className="absolute">
                              <div className="border-b-2 border-white w-3 relative"></div>
                              <div className="border-b-2 border-white w-3 relative rotate-90 bottom-[1.5px]"></div>
                            </div>
                          </div>
                        </div>
                        Cadastrar questão
                      </button>
                    </div>
                  </form>
                </div>
                <div className="opacity-50 h-[35rem] border-l-[1px] border-slate-300 lg:block hidden"></div>
                <div className="w-[50%]  flex flex-col justify-center items-center">
                  <h2 className="text-center font-bold mt-8 lg:mt-0">
                    Questões cadastradas
                  </h2>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setRecoverQuestion(true);
                    }}
                    className="mt-4 transitioon-all ease-linear duration-200 hover:scale-105 bg-[#36A873] rounded-md text-sm flex gap-1 text-white px-2 py-1 justify-center items-center"
                  >
                    <Image
                      src={IconRecoveryQuestion}
                      width={16}
                      alt="Ícone recuperar questão do banco"
                      className="hidden md:block"
                    ></Image>
                    Recuperar questão do banco
                  </button>
                  {questionsRegisted?.length > 0 ? (
                    <div className="flex flex-col gap-2 mt-4 overflow-y-scroll h-[28rem] px-2">
                      {questionsRegisted.map(
                        (
                          question: z.infer<typeof SchemaAddQuestions>,
                          index: number
                        ) => {
                          return (
                            <CardRegisteredQuestion
                              sendOption={(option: "Remove" | "Edit") => {
                                switch (option) {
                                  case "Remove":
                                    const newArray = questionsRegisted.filter(
                                      (_, remove) => remove !== index
                                    );
                                    setQuestionsRegistered(newArray);
                                    const arrayEmString =
                                      JSON.stringify(newArray);
                                    localStorage.setItem(
                                      "questionStorage",
                                      arrayEmString
                                    );
                                    break;
                                  case "Edit":
                                    setValue("question", question.question);
                                    setValue("answer", question.answer);
                                    setValue("category", question.category);
                                    const newArrayEdit =
                                      questionsRegisted.filter(
                                        (_, remove) => remove !== index
                                      );
                                    setQuestionsRegistered(newArrayEdit);
                                    break;
                                  default:
                                    break;
                                }
                              }}
                              key={index}
                              data={{
                                question: question.question,
                                answer: question.answer,
                                category: question.category,
                              }}
                            ></CardRegisteredQuestion>
                          );
                        }
                      )}
                    </div>
                  ) : (
                    <span className="mt-4 text-sm text-red-700">
                      Não há questões cadastradas!
                    </span>
                  )}
                </div>
              </section>
            </section>
          </main>
        </>
      )}
    </>
  );
};

export default CreateGame;
