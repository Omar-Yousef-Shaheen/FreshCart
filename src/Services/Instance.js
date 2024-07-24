import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://ecommerce.routemisr.com/api/v1",
});

// function befoor request => middle wear
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("TokenUser");
  console.log("BEFORE TOKEN SET", config.headers);
  config.headers.token = token;
  console.log("AFTER TOKEN SET", config.headers);
  return config;
});


export default axiosInstance;
