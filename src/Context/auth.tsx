import { ReactNode, createContext, useState } from "react";
import { login } from "./../api/auth";
import Loading from "./../components/Loading/Loading";
import { useRouter } from "next/navigation";
import StatusWindow from "@/components/StatusWindow/StatusWindow";
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
  const [messageSuccess, setMessageSuccess] = useState<{
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
      localStorage.setItem("email", email);
      setMessageSuccess({
        show: true,
        message: "Login realizado com sucesso!",
      });
      setTimeout(() => {
        setMessageSuccess({ show: false, message: "" });
      }, 3000);
      setTimeout(() => {
        router.push("/home");
      }, 3000);
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
          {messageSuccess.show ? (
            <StatusWindow
              error={false}
              text={messageSuccess.message}
            ></StatusWindow>
          ) : null}
          {messageUnauthorized.show ? (
            <StatusWindow
              error={true}
              text={messageUnauthorized.message}
            ></StatusWindow>
          ) : null}

          {children}
        </>
      )}
    </AuthContext.Provider>
  );
};
