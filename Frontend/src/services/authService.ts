import api from "./api";

export const registerUser = async (userData: {
  name: string;
  email: string;
  password: string;
}) => {
  const response = await api.post("/users/register", userData);
  return response.data;
};

export const loginUser = async (userData: {
  email: string;
  password: string;
}) => {
  const response = await api.post("/users/login", userData);
  return response.data;
};