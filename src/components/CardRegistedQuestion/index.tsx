"use client";
type Props = {
  sendOption: (option: "Remove" | "Edit") => void;
  data: {
    question: string;
    answer: string;
    category: string;
  };
};

const CardRegisteredQuestion = ({ data, sendOption }: Props) => {
  return (
    <div className="py-4 flex flex-col gap-1 w-64 lg:w-80 rounded-lg border-[1px] px-2 ">
      <div className="flex justify-end gap-2 ">
        <button
          onClick={() => {
            sendOption("Remove");
          }}
          className="bg-red-700 hover:scale-105 transition-all duration-200 ease-linear rounded-md px-[0.25rem] py-[0.15rem] text-[12px] "
        >
          Remover
        </button>
        <button
          onClick={() => {
            sendOption("Edit");
          }}
          className="bg-blue-700 hover:scale-105 transition-all duration-200 ease-linear rounded-md px-[0.25rem] py-[0.15rem] text-[12px] "
        >
          Editar
        </button>
      </div>
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
