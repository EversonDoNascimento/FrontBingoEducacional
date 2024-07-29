import Link from "next/link";
import CardGame from "../CardGame";
import ContainerCodeGame from "../ContainerCodeGame";
import { getGames } from "@/api/game";
import { useEffect, useState } from "react";
import Loading from "../Loading/Loading";
import StatusWindow from "../StatusWindow/StatusWindow";
import { useRouter } from "next/navigation";

const Home = () => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState({
    show: false,
    message: "",
  });
  const [successMessage, setSuccessMessage] = useState({
    show: false,
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [games, setGames] = useState<{ name: string; id: number }[]>([]);

  const handlerNext = () => {
    if (window !== undefined) {
      const element = document.getElementById("slide");
      if (element) {
        const scroll = element?.scrollLeft + 50;

        element.scrollTo({ left: scroll, behavior: "smooth" });
      }
    }
  };
  const handlerPrev = () => {
    if (window !== undefined) {
      const element = document.getElementById("slide");
      if (element) {
        const scroll = element?.scrollLeft - 50;

        element.scrollTo({
          left: scroll,
          behavior: "smooth",
        });
      }
    }
  };
  const handleGetGames = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    const { status, data } = await getGames(token as string);
    if (status === 200) {
      setGames(data);
    } else {
      setErrorMessage({ show: true, message: "Erro ao carregar jogos!" });
      setTimeout(() => setErrorMessage({ show: false, message: "" }), 3000);
    }
    setLoading(false);
  };
  useEffect(() => {
    handleGetGames();
  }, []);

  return (
    <>
      {loading ? (
        <Loading></Loading>
      ) : (
        <>
          {errorMessage.show ? (
            <StatusWindow
              text={errorMessage.message}
              error={true}
            ></StatusWindow>
          ) : null}
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
              <p>TODOS OS JOGOS:</p>
              <div></div>
              {/* <p className="underline text-[#F2CE4E] cursor-pointer hover:scale-105 transition-all ease-linear duration-200 ">
                Ver mais
              </p> */}
            </span>
            <div className="flex justify-center items-center">
              <div
                onClick={() => handlerPrev()}
                className=" w-8 h-8 rounded-full bg-[#F2CE4E] flex justify-center items-center transition-all ease-linear duration-200 hover:scale-105 cursor-pointer"
              >
                <div className="rounded-md w-4 h-4 border-b-4 border-l-4 rotate-45 border-[#1E1E1E] shadow-sm"></div>
              </div>
              <div
                id="slide"
                className="px-1 flex  lg:w-[70rem] md:w-[30rem] sm:w-[25rem] w-[20rem]  overflow-x-hidden relative overflow-y-hidden"
              >
                <div className="flex px-2 gap-5 ">
                  {games.length > 0 ? (
                    games.map((game: { id: number; name: string }) => {
                      return (
                        <CardGame
                          key={game.id}
                          data={{ name: game.name, id: game.id }}
                          sendId={(id: number) =>
                            router.push(`/roulette?id_game=${game.id}`)
                          }
                        ></CardGame>
                      );
                    })
                  ) : (
                    <span>
                      {errorMessage.show
                        ? "Erro ao carregar jogos!"
                        : "Sem jogos para apresentar!"}
                    </span>
                  )}
                </div>
              </div>

              <div
                onClick={() => handlerNext()}
                className=" w-8 h-8 rounded-full bg-[#F2CE4E] flex justify-center items-center transition-all ease-linear duration-200 hover:scale-105 cursor-pointer"
              >
                <div className="rounded-md w-4 h-4 border-t-4 border-r-4 rotate-45 border-[#1E1E1E] shadow-sm"></div>
              </div>
            </div>
            <div className="px-1 flex  lg:w-[70rem] md:w-[30rem] sm:w-[25rem] w-[20rem]  overflow-x-hidden relative overflow-y-hidden">
              <div className="absolute   w-full h-40 flex justify-between items-center"></div>
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
        </>
      )}
    </>
  );
};
export default Home;
