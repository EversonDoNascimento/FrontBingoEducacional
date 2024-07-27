"use client";
import Header from "@/components/Header/Header";
import InitGame from "@/components/InitGame";
import PrivateRoutes from "@/components/PrivateRoutes/PrivateRoutes";

const Page = () => {
  return (
    <PrivateRoutes>
      <>
        <Header></Header>
        <InitGame></InitGame>
      </>
    </PrivateRoutes>
  );
};

export default Page;
