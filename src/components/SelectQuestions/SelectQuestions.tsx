import { getAllCategories } from "@/api/categories";
import { ChangeEvent, useEffect, useState } from "react";
import Loading from "../Loading/Loading";
import StatusWindow from "../StatusWindow/StatusWindow";
import { getQuestionsByIdCategory } from "@/api/questions";
import CardRegisteredQuestion from "../CardRegistedQuestion";

type Props = {
  sendClose: () => void;
  sendIdQuestions: (array: { id: string }[]) => void;
};

const SelectQuestions = ({ sendClose, sendIdQuestions }: Props) => {
  const [loading, setLoading] = useState(false);
  const [messageSuccess, setMessageSuccess] = useState({
    show: false,
    message: "",
  });

  const [categories, setCategories] = useState<{ id: number; name: string }[]>(
    []
  );
  const [messageError, setMessageError] = useState({
    show: false,
    message: "",
  });
  const [selectedCategory, setSelectedCategory] = useState("default");
  const [questions, setQuestions] = useState<
    { id: string; question: string; answer: string }[]
  >([]);
  const [questionsSelected, setQuestionsSelected] = useState<{ id: string }[]>(
    []
  );
  const handleGetQuestionsByCategory = async () => {
    setLoading(true);
    if (selectedCategory === "default" || selectedCategory === "") return null;
    const token = localStorage.getItem("token") as string;
    const { status, data } = await getQuestionsByIdCategory(
      token,
      selectedCategory
    );
    if (status === 200) {
      setQuestions(data);
    } else {
      setMessageError({ show: true, message: "Erro ao buscar questões" });
      setTimeout(() => setMessageError({ show: false, message: "" }), 3000);
    }
    setLoading(false);
  };

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
    handleGetCategories();
  }, []);
  useEffect(() => {
    if (selectedCategory !== "default") handleGetQuestionsByCategory();
  }, [selectedCategory]);
  const ativateQuestion = (id: string): boolean => {
    const find = questionsSelected.find((question) => question.id === id);
    if (find) return true;
    return false;
  };
  return (
    <div className="fixed z-50 bg-black/50 top-0 right-0 w-full h-full flex justify-center items-center">
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
          <div className="flex flex-col bg-[#1A1B1F] rounded-xl gap-4 px-4 py-6 justify-start items-center">
            <h1 className="text-md font-bold py-2">Selecione as questões</h1>

            <label className="flex flex-col w-64 sm:w-80">
              <select
                value={selectedCategory}
                onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                  setSelectedCategory(e.target.value)
                }
                className="bg-transparent border-[1px] border-white rounded-lg bg-[#1A1B1F] p-2"
              >
                <option
                  className="bg-[#1A1B1F]"
                  value={"default"}
                  selected
                  disabled
                >
                  Selecione uma categoria
                </option>
                {categories.map((category: { id: number; name: string }) => {
                  return (
                    <option
                      value={category.id}
                      className="bg-[#1A1B1F]"
                      key={category.id}
                    >
                      {category.name}
                    </option>
                  );
                })}
              </select>
            </label>
            <div className="flex gap-2 justify-center items-center">
              <span className="flex items-center justify-center gap-1 text-sm">
                <div
                  style={{ backgroundColor: "#babab8" }}
                  className="w-2 h-2 roudend-md rounded-full"
                ></div>
                Não selecionada
              </span>
              <span className="flex items-center justify-center gap-1 text-sm">
                <div
                  style={{ backgroundColor: "#00fc5c" }}
                  className="w-2 h-2 roudend-md rounded-full"
                ></div>
                Selecionada
              </span>
            </div>
            {questions.length > 0 ? (
              <div className="flex flex-col gap-2 mt-4 overflow-y-scroll h-[20rem] px-2">
                {questions.map((question) => {
                  return (
                    <CardRegisteredQuestion
                      key={question.id}
                      sendClick={() => {
                        const find = questionsSelected.find(
                          (find) => find.id === question.id
                        );
                        if (find) {
                          const newList = questionsSelected.filter(
                            (filter) => filter.id !== question.id
                          );
                          setQuestionsSelected(newList);
                          return null;
                        }
                        setQuestionsSelected((prev) => [
                          ...prev,
                          { id: question.id },
                        ]);
                      }}
                      data={{
                        question_selected: ativateQuestion(question.id),
                        question: question.question,
                        answer: question.answer,
                        category: selectedCategory,
                      }}
                    ></CardRegisteredQuestion>
                  );
                })}
              </div>
            ) : (
              <span>Sem questões</span>
            )}
            <div className="flex gap-2">
              <button
                onClick={() => sendClose()}
                className="bg-red-700 py-1 px-2 text-sm rounded-md"
              >
                Voltar
              </button>
              <button
                onClick={() => {
                  sendIdQuestions(questionsSelected);
                  sendClose();
                }}
                className="bg-green-700 py-1 px-2 text-sm rounded-md"
              >
                Selecionar Questões
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SelectQuestions;
