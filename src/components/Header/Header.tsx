import Image from "next/image";
import Logo from "./../../../public/icons/icon-logo.png";
import Menu from "./Menu";
import IconProfileDeactivated from "./../../../public/icons/icon-profile-deactivated.png";
import IconProfileActivated from "./../../../public/icons/icon-profile-activated.png";
import IconLogoutActivated from "./../../../public/icons/logout-icon-activated.png";
import IconLogoutDeactivated from "./../../../public/icons//icon-logout-deactivated.png";
import IconHomeActivated from "./../../../public/icons/icon-home.png";
import IconHomeDeactivated from "./../../../public/icons/icon-home-deactivated.png";
import Link from "next/link";
const Header = () => {
  return (
    <>
      <header className="z-[9999] fixed w-screen py-2 lg:px-8 px-4 bg-[#1A1B1F] flex justify-between items-center top-0">
        <Image src={Logo} alt="Logo bingo" width={50}></Image>
        <ul className="flex gap-5">
          <Link href={"/register_questions"}>
            <li className="text-[#F2CE4E] flex gap-2 items-center underline hover:scale-105 transition-all ease-linear duration-200 cursor-pointer">
              <div>
                <div className="border-2 border-[#F2CE4E] rounded-full w-6 h-6 flex justify-center items-center">
                  <div className="absolute">
                    <div className="border-b-2 border-[#F2CE4E] w-3 relative"></div>
                    <div className="border-b-2 border-[#F2CE4E] w-3 relative rotate-90 bottom-[1.5px]"></div>
                  </div>
                </div>
              </div>
              Registrar Questões
            </li>
          </Link>

          <li className="flex justify-center items-center">
            <Menu
              data={[
                {
                  icon: {
                    deactivated: IconHomeDeactivated,
                    activated: IconHomeActivated,
                  },
                  name: "Tela inicial",
                  link: "/home",
                },
                {
                  icon: {
                    deactivated: IconProfileDeactivated,
                    activated: IconProfileActivated,
                  },
                  name: "Perfil",
                  link: "/perfil",
                },
                {
                  icon: {
                    deactivated: IconLogoutDeactivated,
                    activated: IconLogoutActivated,
                  },

                  name: "Sair",
                  link: "/",
                },
              ]}
            ></Menu>
          </li>
        </ul>
      </header>
    </>
  );
};

export default Header;
