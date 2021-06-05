import axios from "axios";

const token = process.browser ? localStorage.getItem("auth-token") : null;
const baseURL = "https://amanieric.herokuapp.com/";
console.log("BASE URL IS " + baseURL);

const http = axios.create({
  baseURL,
  headers: {
    "auth-token": token,
    "Content-Type": "application/json",
  },
});

export default http;
