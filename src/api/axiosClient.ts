import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:8080/api/v1", // Using relative path to allow proxying in development
  withCredentials: true, // Important for session cookies
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosClient;
