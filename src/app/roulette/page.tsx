"use client";
import Header from "@/components/Header/Header";
import PrivateRoutes from "@/components/PrivateRoutes/PrivateRoutes";
import Roulette from "@/components/Roulette";

const Page = () => {
  return (
    <>
      <PrivateRoutes>
        <Header></Header>
        <Roulette></Roulette>
      </PrivateRoutes>
    </>
  );
};

export default Page;
