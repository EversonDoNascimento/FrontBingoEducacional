import { api } from "./auth";
import axios from "axios";

export const getQuestionsByIdCategory = async (token: string, id: string) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  try {
    const response = await api.get(`/question/getByCategory/${id}`, {
      headers,
    });
    return {
      data: response.data.data,
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
