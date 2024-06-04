import Link from "next/link";
import CardGame from "../CardGame";
import ContainerCodeGame from "../ContainerCodeGame";
const jogos = [
  { title: "Jogo da velha", categoria: "Matemática", id: 1 },
  { title: "Quebra-cabeças", categoria: "Lógica", id: 2 },
  { title: "Forca", categoria: "Linguagem", id: 3 },
  { title: "Sudoku", categoria: "Lógica", id: 4 },
  { title: "Palavras Cruzadas", categoria: "Linguagem", id: 5 },
  { title: "Desafio dos Números", categoria: "Matemática", id: 6 },
];
const Home = () => {
  return (
    <main className=" flex flex-col justify-center items-center gap-5 pt-24 pb-24">
      <h1 className="text-white text-lg md:text-xl font-semibold ">
        Bem-vindo(a) ao BingoLearner!
      </h1>
      <ContainerCodeGame
        sendData={(e) => {
          alert(e);
        }}
      ></ContainerCodeGame>
      <span className="lg:w-[70rem] md:w-[30rem] sm:w-[25rem] w-[20rem] flex justify-between mt-11">
        <p>JOGOS RECENTES:</p>
        <p className="underline text-[#F2CE4E] cursor-pointer hover:scale-105 transition-all ease-linear duration-200 ">
          Ver mais
        </p>
      </span>

      <div className="p-2 flex lg:w-[70rem] md:w-[30rem] sm:w-[25rem] w-[20rem] gap-5 overflow-x-hidden ">
        {jogos.map(
          (
            item: { title: string; categoria: string; id: number },
            index: number
          ) => {
            return (
              <CardGame
                key={index}
                data={{
                  title: item.title,
                  categoria: item.categoria,
                  id: item.id,
                }}
                sendId={(id: number) => {
                  alert(id);
                }}
              ></CardGame>
            );
          }
        )}
      </div>
      <span className="lg:w-[70rem] md:w-[30rem] sm:w-[25rem] w-[20rem] flex justify-between mt-11">
        <p>JOGOS CRIADOS POR VOCÊ:</p>
        <p className="underline text-[#F2CE4E] cursor-pointer hover:scale-105 transition-all ease-linear duration-200 ">
          Ver mais
        </p>
      </span>
      <div className="p-2 flex lg:w-[70rem] md:w-[30rem] sm:w-[25rem] w-[20rem] gap-5 overflow-x-hidden ">
        {jogos.map(
          (
            item: { title: string; categoria: string; id: number },
            index: number
          ) => {
            return (
              <CardGame
                key={index}
                data={{
                  title: item.title,
                  categoria: item.categoria,
                  id: item.id,
                }}
                sendId={(id: number) => {
                  alert(id);
                }}
              ></CardGame>
            );
          }
        )}
      </div>
      <div className="mt-11">
        <button className="bg-[#3D4EFB] flex gap-2 px-4 py-2 hover:scale-105 transition-all ease-linear duration-200 rounded-md">
          <Link className="flex gap-2" href={"/create_game"}>
            <div>
              <div className="border-2 border-white rounded-full w-6 h-6 flex justify-center items-center">
                <div className="absolute">
                  <div className="border-b-2 border-white w-3 relative"></div>
                  <div className="border-b-2 border-white w-3 relative rotate-90 bottom-[1.5px]"></div>
                </div>
              </div>
            </div>
            Criar um jogo
          </Link>
        </button>
      </div>
    </main>
  );
};
export default Home;
