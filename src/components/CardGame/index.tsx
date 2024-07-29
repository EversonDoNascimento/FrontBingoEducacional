import Image from "next/image";
import BgCardGame from "./../../../public/icons/bg-cardGame.png";
type Props = {
  data: { name: string; id: number };
  sendId: (id: number) => void;
};
const CardGame = ({ data, sendId }: Props) => {
  return (
    <div
      onClick={() => {
        sendId(data.id);
      }}
      className=" cursor-pointer flex flex-col bg-[#1A1B1F] pb-2 rounded-xl hover:scale-105 transition-all ease-linear duration-200 "
    >
      <Image
        className="rounded-t-xl"
        src={BgCardGame}
        alt="Background card"
        width={180}
      ></Image>
      <div className="flex flex-col my-4 mx-2">
        <p className="text-sm w-40 text-nowrap overflow-hidden">
          Nome: {data.name}
        </p>
      </div>
    </div>
  );
};

export default CardGame;
