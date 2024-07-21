"use client";
type Props = {
  sendOption?: (option: "Remove" | "Edit") => void;
  data: {
    question_selected?: boolean;
    id?: string;
    question: string;
    answer: string;
    category: string;
  };
  sendClick?: () => void;
};

const CardRegisteredQuestion = ({ data, sendOption, sendClick }: Props) => {
  return (
    <div
      onClick={() => {
        if (sendClick) sendClick();
      }}
      style={{ cursor: sendOption ? "default" : "pointer" }}
      className="py-4 flex flex-col gap-1 w-64 lg:w-80 rounded-lg border-[1px] px-2 "
    >
      {sendOption ? (
        <>
          <div className="flex justify-end gap-2 ">
            <button
              onClick={() => {
                if (sendOption) sendOption("Remove");
              }}
              className="bg-red-700 hover:scale-105 transition-all duration-200 ease-linear rounded-md px-[0.25rem] py-[0.15rem] text-[12px] "
            >
              Remover
            </button>
            <button
              onClick={() => {
                if (sendOption) sendOption("Edit");
              }}
              className="bg-blue-700 hover:scale-105 transition-all duration-200 ease-linear rounded-md px-[0.25rem] py-[0.15rem] text-[12px] "
            >
              Editar
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="mb-1 cursor-pointer flex justify-end text-sm w-full items-center gap-1">
            {data.question_selected ? "Questão Selecionada" : "Não Selecionada"}
            <div
              style={{
                backgroundColor: data.question_selected ? "#00fc5c" : "#babab8",
              }}
              className="rounded-full w-[0.8rem] h-[0.8rem]"
            ></div>
          </div>
        </>
      )}

      <p className="text-sm w-60 lg:w-[19rem] overflow-x-hidden text-nowrap">
        Pergunta: {data.question}
      </p>
      <p className="text-sm w-60 lg:w-[19rem] overflow-x-hidden text-nowrap">
        Resposta: {data.answer}
      </p>
      <p className="text-sm w-60 lg:w-[19rem] overflow-x-hidden text-nowrap">
        Categoria: {data.category}
      </p>
    </div>
  );
};

export default CardRegisteredQuestion;
