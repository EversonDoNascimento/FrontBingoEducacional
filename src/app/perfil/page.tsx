"use client";
import PrivateRoutes from "@/components/PrivateRoutes/PrivateRoutes";
import EditPassword from "./../../components/EditPassword";

const Page = () => {
  return (
    <>
      <PrivateRoutes>
        <EditPassword></EditPassword>
      </PrivateRoutes>
    </>
  );
};

export default Page;
