import { useEffect, useState } from "react";
import { ReactNode } from "react";
import { verifyToken } from "./../../api/auth";
import { useRouter } from "next/navigation";
import Loading from "./../Loading/Loading";
import Image from "next/image";
import IconError from "./../../../public/icons/icon-error.png";
type Props = {
  children: ReactNode;
};

export default function PrivateRoutes({ children }: Props) {
  const router = useRouter();
  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  const [messageError, setMessageError] = useState({
    show: false,
    message: "",
  });
  useEffect(() => {
    setLoading(true);
    const checkToken = async () => {
      if (typeof window !== "undefined") {
        const localstorage = localStorage.getItem("token");
        if (localstorage) {
          const { status, data } = await verifyToken(localstorage);
          if (status === 200) {
            setAuth(true);
          } else {
            if (data.error == "Expired or invalid token") {
              setMessageError({ show: true, message: "Sessão expirada" }),
                setTimeout(
                  () => setMessageError({ show: false, message: "" }),

                  3000
                );
              setTimeout(
                () => router.push("/"),

                3000
              );
            } else {
              setMessageError({ show: true, message: data.error }),
                setTimeout(
                  () => setMessageError({ show: false, message: "" }),

                  3000
                );
              setTimeout(
                () => router.push("/"),

                3000
              );
            }
          }
        } else {
          setMessageError({ show: true, message: "Token não encontrado" }),
            setTimeout(
              () => setMessageError({ show: false, message: "" }),

              3000
            );
          setTimeout(
            () => router.push("/"),

            3000
          );
        }
        setLoading(false);
      }
    };

    checkToken();
  }, []);

  const renderMessage = () => {
    return (
      <>
        {messageError.show ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              width: "100%",
            }}
            className="absolute bg-black/50"
          >
            <div className="WindowError">
              <Image width={75} src={IconError} alt="Ícone de erro"></Image>
              {messageError.message}
            </div>
          </div>
        ) : null}
      </>
    );
  };

  if (loading) return <Loading></Loading>;
  if (!auth) return <>{renderMessage()}</>;
  return <>{children}</>;
}
