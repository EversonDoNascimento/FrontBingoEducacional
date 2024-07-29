import axios from "axios";
import { api } from "./auth";

export const UpdatePassword = async (
  token: string,
  password: string,
  email: string
) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  try {
    const response = await api.patch(
      `/users/${email}/updatePassword`,
      { password },
      {
        headers,
      }
    );
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
