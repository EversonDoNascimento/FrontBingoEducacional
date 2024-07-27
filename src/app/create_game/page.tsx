"use client";
import Header from "./../../components/Header/Header";
import PrivateRoutes from "./../../components/PrivateRoutes/PrivateRoutes";
import CreateGame from "./../../components/CreateGame";

const Page = () => {
  return (
    <PrivateRoutes>
      <>
        <Header></Header>
        <CreateGame></CreateGame>
      </>
    </PrivateRoutes>
  );
};

export default Page;
