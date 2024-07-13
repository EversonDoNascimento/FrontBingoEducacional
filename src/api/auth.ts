import axios from "axios";

export const api = axios.create({
  baseURL: `${process.env.API_URL}/login`,
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

export const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  try {
    const response = await api.post(`/`, { email, password });
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
