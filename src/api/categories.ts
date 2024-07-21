import axios from "axios";
import { api } from "./auth";

export const getAllCategories = async (token: string) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  try {
    const response = await api.get(`/categories/getAll`, { headers });
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

export const registerCategory = async (token: string, name: string) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  try {
    const response = await api.post(
      `/categories/saveCategory`,
      { name },
      { headers }
    );
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
