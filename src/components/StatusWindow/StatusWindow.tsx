import IconError from "./../../../public/icons/icon-error.png";
import IconSuccess from "./../../../public/icons/icon-success.png";

import Image from "next/image";
type Props = {
  text: string;
  error?: boolean;
};
const StatusWindow = ({ text, error }: Props) => {
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          width: "100%",
        }}
        className="z-[99999] top-0 right-0 fixed bg-black/50"
      >
        {error ? (
          <div className="WindowError text-center">
            <Image width={75} src={IconError} alt="Ícone de erro"></Image>
            {text}
          </div>
        ) : (
          <div className="WindowSuccess text-center">
            <Image width={65} src={IconSuccess} alt="Ícone de sucesso"></Image>
            {text}
          </div>
        )}
      </div>
    </>
  );
};

export default StatusWindow;
