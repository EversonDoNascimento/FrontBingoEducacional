import { ReactNode } from "react";
import Logo from "./../../public/icons/icon-logo.png";
import Image from "next/image";
type Props = {
  children: ReactNode;
  title: string;
};
const AccessComponent = ({ children, title }: Props) => {
  return (
    <section className="p-11 bg-[#1e1e1e] lg:bg-[#1A1B1F] flex flex-col justify-center items-center gap-5 rounded-lg">
      <Image src={Logo} alt="Logo"></Image>
      <span className="mt-5 font-bold text-lg">
        {title ? title : "Default"}
      </span>
      {children}
    </section>
  );
};

export default AccessComponent;
