import axios from "axios";
import { api } from "./auth";

export const recoveryPass = async ({
  code,
  email,
}: {
  code: string;
  email: string;
}) => {
  try {
    const response = await api.post(`/users/${email}/saveRecoverPasswordCode`, {
      code,
    });
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        data: error.response?.data,
        status: error.response?.status,
      };
    }
    throw error;
  }
};

export const setPassword = async ({
  password,
  code,
  email,
}: {
  password: string;
  email: string;
  code: string;
}) => {
  try {
    const response = await api.patch(`/users/${email}/recoverpassword`, {
      password,
      code,
    });
    return {
      data: response.data,
      status: response.status,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        data: error.response?.data,
        status: error.response?.status,
      };
    }
    throw error;
  }
};
