import axiosClient from "./axiosClient";

export interface LoginParams {
  id: string;
  password: string;
}

export interface RegisterParams {
  id: string;
  password: string;
  name: string;
  email: string;
}

export const loginAPI = async (params: LoginParams) => {
  return axiosClient.post("/auth/login", params);
};

export const logoutAPI = async () => {
  return axiosClient.get("/auth/logout");
};

export const registerAPI = async (params: RegisterParams) => {
  return axiosClient.post("/auth/register", params);
};
