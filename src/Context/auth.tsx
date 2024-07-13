import { ReactNode, createContext, useState } from "react";
import { login } from "./../api/auth";
import IconError from "./../../public/icons/icon-error.png";
import Image from "next/image";
import Loading from "./../components/Loading/Loading";
import { useRouter } from "next/navigation";
type contextType = {
  sendLogin: ({ email, password }: { email: string; password: string }) => void;
};
export const AuthContext = createContext<null | contextType>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [messageUnauthorized, setMessageUnauthorized] = useState<{
    show: boolean;
    message: string;
  }>({
    show: false,
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const sendLogin = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    setLoading(true);
    const { data, status } = await login({ email, password });
    if (status === 200) {
      localStorage.setItem("token", data.access_token);
      setLoading(false);
      router.push("/home");
    } else {
      setMessageUnauthorized({
        show: true,
        message: data.error,
      });
      setTimeout(() => {
        setMessageUnauthorized({ show: false, message: "" });
      }, 3000);
    }
    setLoading(false);
  };
  return (
    <AuthContext.Provider value={{ sendLogin }}>
      {loading ? (
        <Loading></Loading>
      ) : (
        <>
          {messageUnauthorized.show ? (
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
                {messageUnauthorized.message}
              </div>
            </div>
          ) : null}

          {children}
        </>
      )}
    </AuthContext.Provider>
  );
};
