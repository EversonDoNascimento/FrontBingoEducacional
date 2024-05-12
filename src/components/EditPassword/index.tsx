"use client";
import { useForm } from "react-hook-form";
import AccessComponent from "../AccessComponent";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Image from "next/image";
import EmailIcon from "./../../../public/icons/icon-email.png";
import Link from "next/link";
import Header from "../Header/Header";

const EditPassword = () => {
  
  return (
    <>
    <Header></Header>
    </>
  );
};

export default EditPassword;
