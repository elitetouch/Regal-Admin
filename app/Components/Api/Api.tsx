import axios from "axios";
const BaseUrl = `https://api.regalinheirs.com/api/v1`;
export const Api_Instance = axios.create({
  baseURL: BaseUrl,
  // timeout: 1000,
  headers: {
    "Content-Type": "application/json",
  },
});
Api_Instance.interceptors.request.use(
  async (config) => {
    try {
      const accessToken = localStorage.getItem("token");

      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    } catch (e) {
      console.log("Error reading token:", e);
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
