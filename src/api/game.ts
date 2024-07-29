import axios from "axios";
import { api } from "./auth";

export const createGame = async (
  token: string,
  question: number[],
  name: string
) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  try {
    const response = await api.post(
      `/game/createGame`,
      { questions: question, name: name },
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

export const getGameById = async (token: string, id: number) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  try {
    const response = await api.get(`/game/${id}`, {
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

export const getGames = async (token: string) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  try {
    const response = await api.get(`/game/myGames`, {
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
