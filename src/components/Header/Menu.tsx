"use client";
import { StaticImageData } from "next/image";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
type Props = {
  data?: {
    icon: { deactivated: StaticImageData; activated: StaticImageData };
    name: string;
    link: string;
  }[];
};
const Menu = ({ data }: Props) => {
  const [renderMobile, setRenderMobile] = useState(false);
  const [iconActivated, setIconDeactivated] = useState<number | null>(null);
  return (
    <nav>
      <section
        onClick={() => {
          setRenderMobile(!renderMobile);
        }}
        className="transition-all ease-linear duration-200 cursor-pointer hover:scale-105 w-9 h-9 bg-[#F2CE4E] rounded-full flex flex-col justify-center items-center gap-1"
      >
        <div className="border-b-[3px] w-6 border-black"></div>
        <div className="border-b-[3px] w-6 border-black"></div>
        <div className="border-b-[3px] w-6 border-black"></div>
      </section>
      <motion.ul
        initial={{ opacity: 0, x: 100 }}
        animate={{
          opacity: renderMobile ? 1 : 0,
          x: renderMobile ? 0 : 100,
        }}
        transition={{ duration: 0.2 }}
        className="fixed bg-[#1A1B1F] w-32 top-16 right-0"
      >
        {data?.map(
          (
            item: {
              link: string;
              name: string;
              icon: {
                deactivated: StaticImageData;
                activated: StaticImageData;
              };
            },
            index: number
          ) => {
            return (
              <li
                onMouseEnter={() => {
                  setIconDeactivated(index);
                }}
                onMouseLeave={() => {
                  setIconDeactivated(null);
                }}
                className="hover:bg-[#F2CE4E] hover:text-black w-[100%] text-lg "
                key={index}
              >
                <Link
                  href={item.link}
                  className="text-center w-[100%] flex justify-center items-center gap-2 mb-2"
                >
                  <Image
                    src={
                      iconActivated === index
                        ? item.icon.activated
                        : item.icon.deactivated
                    }
                    alt="Ícone"
                    width={20}
                  ></Image>
                  {item.name}
                </Link>
              </li>
            );
          }
        )}
      </motion.ul>
    </nav>
  );
};

export default Menu;
