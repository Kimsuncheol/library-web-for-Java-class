import axios from "axios";

const axiosClient = axios.create({
  baseURL: "/", // Using relative path to allow proxying in development
  withCredentials: true, // Important for session cookies
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosClient;
