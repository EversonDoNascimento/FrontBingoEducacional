"use client";
import Header from "./../../components/Header/Header";
import CreateGame from "./../../components/CreateGame";
import PrivateRoutes from "@/components/PrivateRoutes/PrivateRoutes";

const Page = () => {
  return (
    <PrivateRoutes>
      <Header></Header>
      <CreateGame></CreateGame>
    </PrivateRoutes>
  );
};

export default Page;
