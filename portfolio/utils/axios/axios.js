import axios from "axios";

const token = process.browser ? localStorage.getItem("auth-token") : null;
const baseURL = process.env.NEXT_PUBLIC_BACKEND_URL;

const http = axios.create({
  baseURL,
  headers: {
    "auth-token": token,
    "Content-Type": "application/json",
  },
});

export default http;
