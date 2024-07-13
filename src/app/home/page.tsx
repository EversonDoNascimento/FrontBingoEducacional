"use client";
import PrivateRoutes from "@/components/PrivateRoutes/PrivateRoutes";
import Header from "../../components/Header/Header";
import Home from "./../../components/Home";

const Page = () => {
  return (
    <PrivateRoutes>
      <>
        <Header></Header>
        <Home></Home>
      </>
    </PrivateRoutes>
  );
};

export default Page;
