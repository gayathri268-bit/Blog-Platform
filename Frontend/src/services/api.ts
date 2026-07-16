import axios from "axios";

const api = axios.create({
  baseURL: "https://blog-platform-backend-1npv.onrender.com/api",
});

export default api;