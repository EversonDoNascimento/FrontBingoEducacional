import { api } from "./auth";
import axios from "axios";
export type UserType = {
  email: string;
  name: string;
  password: string;
};

export const registerUser = async (data: UserType) => {
  try {
    const response = await api.post(`/users/saveUser`, {
      ...data,
      role: "ADMIN",
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

export const registerCode = async (code: string, email: string) => {
  try {
    const response = await api.post(`/users/${email}/saveActivationCode`, {
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

export const activateAccount = async (code: string, email: string) => {
  try {
    const response = await api.patch(`/users/${email}/activeAccount`, {
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
