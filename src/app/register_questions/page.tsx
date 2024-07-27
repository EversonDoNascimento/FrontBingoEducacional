"use client";
import Header from "../../components/Header/Header";
import RegisterQuestions from "../../components/RegisterQuestions";
import PrivateRoutes from "@/components/PrivateRoutes/PrivateRoutes";

const Page = () => {
  return (
    <PrivateRoutes>
      <Header></Header>
      <RegisterQuestions></RegisterQuestions>
    </PrivateRoutes>
  );
};

export default Page;
